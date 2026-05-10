import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { generateTokens, verifyRefreshToken } from '../utils/jwt';
import { sendOTP } from '../services/emailService';

const prisma = new PrismaClient();

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    
    let user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      if (user.isEmailVerified) return res.status(400).json({ error: 'User already exists.' });
    } else {
      const passwordHash = await bcrypt.hash(password, 10);
      user = await prisma.user.create({
        data: { email, name, passwordHash, avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}` },
      });
    }

    const otp = generateOTP();
    await prisma.oTPVerification.create({
      data: {
        userId: user.id,
        code: otp,
        purpose: 'EMAIL_VERIFICATION',
        expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 mins
      }
    });

    await sendOTP(email, otp, 'EMAIL_VERIFICATION');
    res.status(200).json({ message: 'OTP sent to email. Please verify.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, code, purpose } = req.body;
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const otpRecord = await prisma.oTPVerification.findFirst({
      where: { userId: user.id, code, purpose, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: 'desc' }
    });

    if (!otpRecord) return res.status(400).json({ error: 'Invalid or expired OTP.' });

    // Mark verified
    await prisma.user.update({
      where: { id: user.id },
      data: { isEmailVerified: true }
    });
    
    // Clear used OTP
    await prisma.oTPVerification.deleteMany({ where: { userId: user.id, purpose } });

    // Generate Tokens
    const tokens = generateTokens({ userId: user.id, role: user.role });
    await prisma.session.create({
      data: { userId: user.id, refreshToken: tokens.refreshToken, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
    });

    res.status(200).json({ message: 'Verified successfully.', tokens, user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar } });
  } catch (error) {
    res.status(500).json({ error: 'Verification failed.' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user || !user.passwordHash) return res.status(401).json({ error: 'Invalid credentials.' });
    if (!user.isEmailVerified) return res.status(403).json({ error: 'Email not verified.' });

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials.' });

    const tokens = generateTokens({ userId: user.id, role: user.role });
    await prisma.session.create({
      data: { userId: user.id, refreshToken: tokens.refreshToken, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
    });

    res.status(200).json({ tokens, user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar } });
  } catch (error) {
    res.status(500).json({ error: 'Login failed.' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    await prisma.session.deleteMany({ where: { refreshToken } });
    res.status(200).json({ message: 'Logged out successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Logout failed.' });
  }
};

// ... Remaining logic for Reset Password and Google OAuth would go here 

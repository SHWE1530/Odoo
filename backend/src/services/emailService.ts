import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
  port: Number(process.env.SMTP_PORT) || 2525,
  auth: {
    user: process.env.SMTP_USER || 'demo_user',
    pass: process.env.SMTP_PASS || 'demo_pass',
  },
});

export const sendOTP = async (to: string, code: string, purpose: string) => {
  const subject = purpose === 'PASSWORD_RESET' 
    ? 'Traveloop - Reset Your Password' 
    : 'Welcome to Traveloop - Verify Your Email';
  
  const text = purpose === 'PASSWORD_RESET'
    ? `Your password reset code is: ${code}. It expires in 15 minutes.`
    : `Your email verification code is: ${code}. It expires in 15 minutes.`;

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
      <h2>Traveloop</h2>
      <p>${subject}</p>
      <div style="font-size: 24px; font-weight: bold; padding: 10px; border-radius: 8px; background-color: #f3f4f6; display: inline-block;">
        ${code}
      </div>
      <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">This code will expire in 15 minutes.</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: '"Traveloop Security" <security@traveloop.app>',
      to,
      subject,
      text,
      html,
    });
    console.log(`[Email Service] Sent OTP to ${to}`);
  } catch (error) {
    console.error(`[Email Service] Failed to send email:`, error);
  }
};

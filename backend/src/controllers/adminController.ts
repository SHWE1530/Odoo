import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get top-level dashboard metrics
export const getPlatformStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalTrips = await prisma.trip.count();
    const activeTrips = await prisma.trip.count({
      where: { status: 'ONGOING' }
    });
    
    // Group destinations by popularity
    const destinations = await prisma.tripStop.groupBy({
      by: ['city', 'country'],
      _count: { city: true },
      orderBy: { _count: { city: 'desc' } },
      take: 5
    });

    const totalRevenue = await prisma.expense.aggregate({
      _sum: { amount: true }
    });

    res.status(200).json({
      metrics: {
        totalUsers,
        totalTrips,
        activeTrips,
        totalPlatformTrackedSpend: totalRevenue._sum.amount || 0
      },
      popularDestinations: destinations.map(d => ({
        location: `${d.city}, ${d.country}`,
        visits: d._count.city
      }))
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to aggregate platform statistics.' });
  }
};

// Advanced User Management
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isEmailVerified: true,
        createdAt: true,
        _count: {
          select: { trips: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId as string;
    await prisma.user.delete({
      where: { id: userId }
    });
    res.status(200).json({ message: 'User permanently deleted and all cascaded data removed.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user.' });
  }
};

// Analytics Time Series
export const getUserSignupsAnalytics = async (req: Request, res: Response) => {
  try {
    // Note: A robust implementation would use raw SQL for time-series grouping depending on DB.
    // For this prototype, we'll fetch users and aggregate by month in memory. 
    // In production PG, we'd use DATE_TRUNC.
    const users = await prisma.user.findMany({
      select: { createdAt: true }
    });
    
    const aggregated: Record<string, number> = {};
    users.forEach(u => {
      const month = u.createdAt.toLocaleString('default', { month: 'short', year: 'numeric' });
      aggregated[month] = (aggregated[month] || 0) + 1;
    });

    res.status(200).json({
      chartData: Object.entries(aggregated).map(([m, v]) => ({ month: m, signups: v }))
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to build analytics data.' });
  }
};

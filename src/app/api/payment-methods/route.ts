import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET all payment methods
export async function GET() {
  try {
    const paymentMethods = await db.paymentMethod.findMany({
      where: { active: true },
      orderBy: { order: 'asc' }
    });

    return NextResponse.json({ paymentMethods });
  } catch (error) {
    console.error('Payment Methods GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch payment methods' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET stats for homepage
export async function GET() {
  try {
    const products = await db.product.count({ where: { available: true } });
    const categories = await db.category.count({ where: { active: true } });
    const orders = await db.order.count();

    return NextResponse.json({
      products,
      categories,
      orders
    });
  } catch (error) {
    console.error('Stats GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}

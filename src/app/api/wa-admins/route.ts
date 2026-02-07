import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET all WA admins
export async function GET() {
  try {
    const waAdmins = await db.waAdmin.findMany({
      where: { active: true },
      orderBy: { order: 'asc' }
    });

    return NextResponse.json({ waAdmins });
  } catch (error) {
    console.error('WA Admins GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch WA admins' }, { status: 500 });
  }
}

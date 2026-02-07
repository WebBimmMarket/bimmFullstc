import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET all contact links
export async function GET() {
  try {
    const contactLinks = await db.contactLink.findMany({
      orderBy: { order: 'asc' }
    });

    return NextResponse.json({ contactLinks });
  } catch (error) {
    console.error('Contact Links GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch contact links' }, { status: 500 });
  }
}

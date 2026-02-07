import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET all announcements
export async function GET() {
  try {
    const announcements = await db.announcement.findMany({
      where: { active: true },
      orderBy: { order: 'asc' }
    });

    return NextResponse.json({ announcements });
  } catch (error) {
    console.error('Announcements GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch announcements' }, { status: 500 });
  }
}

// POST create announcement
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const announcement = await db.announcement.create({
      data: {
        title: body.title,
        body: body.body,
        image: body.image,
        imageUrl: body.imageUrl,
        order: body.order ? Number(body.order) : 0,
        active: body.active !== false
      }
    });

    return NextResponse.json({ announcement });
  } catch (error) {
    console.error('Announcements POST error:', error);
    return NextResponse.json({ error: 'Failed to create announcement' }, { status: 500 });
  }
}

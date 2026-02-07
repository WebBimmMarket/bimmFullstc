import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET all categories
export async function GET() {
  try {
    const categories = await db.category.findMany({
      where: { active: true },
      orderBy: [{ isMain: 'desc' }, { order: 'asc' }, { name: 'asc' }],
      include: {
        children: {
          where: { active: true },
          orderBy: { order: 'asc' }
        }
      }
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Categories GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

// POST create category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const category = await db.category.create({
      data: {
        key: body.key,
        name: body.name,
        isMain: body.isMain || false,
        iconUrl: body.iconUrl,
        order: body.order ? Number(body.order) : 0,
        matchKeywords: body.matchKeywords,
        active: body.active !== false
      }
    });

    return NextResponse.json({ category });
  } catch (error) {
    console.error('Categories POST error:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET all products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const subCategory = searchParams.get('subCategory');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'popular';

    let where: any = { available: true };

    if (category) {
      where.categoryKey = category;
    }

    if (subCategory) {
      where.subCategoryKey = subCategory;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    let orderBy: any = { soldCount: 'desc' };

    if (sort === 'price_asc') {
      orderBy = { price: 'asc' };
    } else if (sort === 'price_desc') {
      orderBy = { price: 'desc' };
    } else if (sort === 'name_asc') {
      orderBy = { name: 'asc' };
    } else if (sort === 'name_desc') {
      orderBy = { name: 'desc' };
    }

    const products = await db.product.findMany({
      where,
      orderBy,
      include: {
        category: true
      }
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Products GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST create product (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const product = await db.product.create({
      data: {
        name: body.name,
        price: Number(body.price),
        stock: body.stock ? Number(body.stock) : null,
        categoryKey: body.categoryKey,
        subCategoryKey: body.subCategoryKey,
        image: body.image,
        imageUrl: body.imageUrl,
        status: body.status || 'available',
        available: body.available !== false,
        description: body.description,
        discountActive: body.discountActive || false,
        discountPercent: body.discountPercent ? Number(body.discountPercent) : null,
        discountStart: body.discountStart ? new Date(body.discountStart) : null,
        discountEnd: body.discountEnd ? new Date(body.discountEnd) : null,
        soldCount: 0,
        order: body.order ? Number(body.order) : 0
      }
    });

    return NextResponse.json({ product });
  } catch (error) {
    console.error('Products POST error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

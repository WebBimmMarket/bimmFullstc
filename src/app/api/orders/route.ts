import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET all orders
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');

    let where: any = {};

    if (userId) {
      where.userId = userId;
    }

    if (status && status !== 'all') {
      where.status = status;
    }

    const orders = await db.order.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        items: true
      }
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Orders GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

// POST create order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Generate order number
    const orderCount = await db.order.count();
    const orderNumber = `ORD${String(orderCount + 1).padStart(6, '0')}`;

    const order = await db.order.create({
      data: {
        orderNumber,
        userId: body.userId,
        name: body.name,
        email: body.email,
        whatsapp: body.whatsapp,
        notes: body.notes,
        paymentMethod: body.paymentMethod,
        total: Number(body.total),
        status: 'pending',
        paymentProofUrl: body.paymentProofUrl,
        items: {
          create: body.items.map((item: any) => ({
            productId: item.productId,
            name: item.name,
            price: Number(item.price),
            qty: Number(item.qty),
            image: item.image
          }))
        }
      },
      include: {
        items: true
      }
    });

    // Update product sold count
    for (const item of body.items) {
      if (item.productId) {
        await db.product.update({
          where: { id: item.productId },
          data: { soldCount: { increment: item.qty } }
        });
      }
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Orders POST error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

// PUT update order status
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();

    const order = await db.order.update({
      where: { id: id || '' },
      data: {
        status: body.status,
        deliveryData: body.deliveryData,
        statusUpdatedAt: new Date()
      }
    });

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Orders PUT error:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}

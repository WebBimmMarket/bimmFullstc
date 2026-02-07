import { NextRequest, NextResponse } from 'next/server';
import { runMigration } from '@/lib/migrate';

export const dynamic = 'force-dynamic';

// GET status migrasi
export async function GET() {
  try {
    const prisma = (await import('@/lib/db')).default?.prisma;
    
    if (!prisma) {
      return NextResponse.json({ 
        error: 'Prisma client not initialized',
        databases: {
          sqlite: 'available',
          postgres: process.env.SUPABASE_DATABASE_URL ? 'available' : 'not configured'
        }
      }, { status: 500 });
    }

    // Ambil migrasi terakhir
    const lastMigration = await prisma.migration.findFirst({
      orderBy: { createdAt: 'desc' }
    });

    // Ambil status semua migrasi
    const allMigrations = await prisma.migration.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    return NextResponse.json({
      status: 'ready',
      lastMigration,
      recentMigrations: allMigrations,
      canMigrate: process.env.SUPABASE_DATABASE_URL ? true : false
    });
  } catch (error) {
    console.error('Migration status error:', error);
    return NextResponse.json({ 
      error: 'Failed to get migration status',
      message: error.message 
    }, { status: 500 });
  }
}

// POST trigger migrasi
export async function POST(request: NextRequest) {
  try {
    // Cek apakah database PostgreSQL tersedia
    if (!process.env.SUPABASE_DATABASE_URL) {
      return NextResponse.json({ 
        error: 'PostgreSQL database not configured',
        message: 'SUPABASE_DATABASE_URL must be set in .env file'
      }, { status: 400 });
    }

    // Cek apakah ada migrasi yang sedang berjalan
    const prisma = (await import('@/lib/db')).default?.prisma;
    const runningMigration = await prisma.migration.findFirst({
      where: { status: 'running' }
    });

    if (runningMigration) {
      return NextResponse.json({ 
        error: 'Migration already in progress',
        message: 'Please wait for current migration to complete'
      }, { status: 409 });
    }

    // Mulai migrasi di background (non-blocking)
    runMigration().catch(error => {
      console.error('Background migration error:', error);
    });

    return NextResponse.json({
      success: true,
      message: 'Migration started in background',
      status: 'started'
    });

  } catch (error) {
    console.error('Migration trigger error:', error);
    return NextResponse.json({ 
      error: 'Failed to start migration',
      message: error.message 
    }, { status: 500 });
  }
}

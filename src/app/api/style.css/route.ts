import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export const dynamic = 'force-static';

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'public/style.css');
    const fileContent = readFileSync(filePath, 'utf-8');

    return new NextResponse(fileContent, {
      headers: {
        'Content-Type': 'text/css; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error serving style.css:', error);
    return new NextResponse('style.css not found', { status: 404 });
  }
}

import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export const dynamic = 'force-static';

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'public/app.js');
    const fileContent = readFileSync(filePath, 'utf-8');

    return new NextResponse(fileContent, {
      headers: {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error serving app.js:', error);
    return new NextResponse('app.js not found', { status: 404 });
  }
}

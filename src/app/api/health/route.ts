import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const start = Date.now();
    await dbConnect();
    const latencyMs = Date.now() - start;

    return NextResponse.json({
      ok: true,
      env: process.env.NODE_ENV,
      mongodbUriSet: Boolean(process.env.MONGODB_URI),
      latencyMs,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}



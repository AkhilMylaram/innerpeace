import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate some work
  await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
  
  return NextResponse.json({
    message: 'Trace test endpoint',
    timestamp: new Date().toISOString(),
    traceId: Math.random().toString(36).substring(7)
  });
}

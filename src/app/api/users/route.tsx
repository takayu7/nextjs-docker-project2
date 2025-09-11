// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUserForLogin } from '@/app/lib/db';

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email') || '';
    const password = req.nextUrl.searchParams.get('password') || '';
    const user = await getUserForLogin(email, password);
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { 
        success: false, 
        error: 'データベースエラーが発生しました',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}

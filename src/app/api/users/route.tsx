// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUsers, User } from '@/app/lib/db';

export async function GET(req: NextRequest) {
  try {
    const users: User[] = await getUsers();
    return NextResponse.json({ success: true, data: users });
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

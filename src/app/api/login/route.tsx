// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUserForLogin} from '@/app/lib/db';
import { User } from '@/app/types/type';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ email: string, password: string }> }
) {
  const { email, password } = await params;
  const data = await getUserForLogin(email, password);
  return NextResponse.json(data);
}

// export async function GET(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const email = await body.email;
//     const password = await body.password;
//     const user: User | undefined = await getUserForLogin(email, password);
//     const users: User[] = user ? [user] : [];
//     return NextResponse.json({ success: true, data: users });
//   } catch (error) {
//     console.error('API Error:', error);
//     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//     return NextResponse.json(
//       { 
//         success: false, 
//         error: 'データベースエラーが発生しました',
//         details: errorMessage 
//       },
//       { status: 500 }
//     );
//   }
// }

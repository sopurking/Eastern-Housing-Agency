import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { credential } = await request.json();
    const decoded = jwt.decode(credential) as any;
    
    if (!decoded || !decoded.email) {
      return NextResponse.json({ error: 'Invalid credential' }, { status: 400 });
    }

    let user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: decoded.email,
          name: decoded.name || decoded.email,
        },
      });
    }

    const sessionToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    const response = NextResponse.json({ success: true, user });
    response.cookies.set('session-token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Google One Tap error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}

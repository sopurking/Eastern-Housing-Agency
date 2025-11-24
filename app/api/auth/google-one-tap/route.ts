import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import { randomBytes } from 'crypto';

export async function POST(request: NextRequest) {
  console.log('[API] Google One Tap request received');
  
  try {
    const { credential } = await request.json();
    console.log('[API] Credential received, decoding...');
    
    if (!credential) {
      console.error('[API] No credential provided');
      return NextResponse.json({ error: 'No credential provided' }, { status: 400 });
    }

    const decoded = jwt.decode(credential) as any;
    console.log('[API] Decoded token:', { email: decoded?.email, name: decoded?.name });
    
    if (!decoded || !decoded.email) {
      console.error('[API] Invalid credential - no email found');
      return NextResponse.json({ error: 'Invalid credential' }, { status: 400 });
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });
    console.log('[API] User lookup result:', user ? 'Found' : 'Not found');

    // Create user if doesn't exist
    if (!user) {
      console.log('[API] Creating new user...');
      user = await prisma.user.create({
        data: {
          email: decoded.email,
          name: decoded.name || decoded.given_name || 'User',
          image: decoded.picture,
          emailVerified: new Date(),
        },
      });
      console.log('[API] New user created:', user.id);
    }

    // Check if account exists
    let account = await prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: 'google',
          providerAccountId: decoded.sub,
        },
      },
    });
    console.log('[API] Account lookup result:', account ? 'Found' : 'Not found');

    // Create account if doesn't exist
    if (!account) {
      console.log('[API] Creating Google account link...');
      account = await prisma.account.create({
        data: {
          userId: user.id,
          type: 'oauth',
          provider: 'google',
          providerAccountId: decoded.sub,
          access_token: credential,
          token_type: 'Bearer',
          scope: 'openid profile email',
        },
      });
      console.log('[API] Account created:', account.id);
    }

    // Create NextAuth session
    const sessionToken = randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    console.log('[API] Creating session...');
    await prisma.session.create({
      data: {
        sessionToken,
        userId: user.id,
        expires,
      },
    });
    console.log('[API] Session created successfully');

    // Set session cookie
    const response = NextResponse.json({ 
      success: true, 
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name 
      } 
    });
    
    response.cookies.set('next-auth.session-token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires,
      path: '/',
    });

    console.log('[API] Response sent with session cookie');
    return response;

  } catch (error) {
    console.error('[API] Google One Tap error:', error);
    return NextResponse.json({ 
      error: 'Authentication failed', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

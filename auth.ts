import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "@/lib/prisma";  
import { PrismaAdapter } from "@auth/prisma-adapter";

export const {auth, handlers, signIn, signOut} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    authorization: {
      params: {
        prompt: "select_account",
        access_type: "offline",
        response_type: "code"
      },
    }
  })],
  
  callbacks: {
    async session({ session, user }) {
      console.log('[Auth] Session callback - user:', user?.email);
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role || 'user';
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      console.log('[Auth] SignIn callback - provider:', account?.provider, 'email:', user.email);
      
      if (account?.provider === "google" && user.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email }
        });
        
        console.log('[Auth] User lookup:', existingUser ? 'Found' : 'Not found', 'role:', existingUser?.role);
        
        if (existingUser && !existingUser.role) {
          console.log('[Auth] Updating user role to "user"');
          await prisma.user.update({
            where: { id: existingUser.id },
            data: { role: 'user' }
          });
        }
      }
      
      console.log('[Auth] SignIn callback returning true');
      return true;
    },
  },
  
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  
  trustHost: true,
});
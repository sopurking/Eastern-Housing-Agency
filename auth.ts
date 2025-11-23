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
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role || 'user';
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && !user.role) {
        await prisma.user.update({
          where: { id: user.id },
          data: { role: 'user' }
        });
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Always redirect to callback page for popup authentication
      return `${baseUrl}/auth/callback`;
    },
  },
  
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  
  trustHost: true,
});
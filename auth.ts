import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "@/lib/prisma";  
import { PrismaAdapter } from "@auth/prisma-adapter";

export const {auth, handlers, signIn, signOut} = NextAuth({
    providers: [Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        authorization: {
            params: {
                prompt: "select_account", 
            },
        }
    })],

     callbacks: {
    // This runs ONCE when user logs in
    async signIn({ user }) {
      if (!user.email) return false;

      const existing = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existing) {
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
          },
        });
      }

      return true;
    },
  },
});
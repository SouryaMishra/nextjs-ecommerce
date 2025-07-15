import { mergeAnonymousCartWithUserCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as PrismaClient),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      // Set the user id on session after fetching it from db
      session.user.id = user.id;
      return session;
    },
  },
  events: {
    // Merge carts just after sign in and before redirecting to home page
    async signIn({ user }) {
      await mergeAnonymousCartWithUserCart(user.id);
    },
  },
};

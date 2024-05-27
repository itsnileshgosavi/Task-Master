import { User } from "../../../../models/user";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { connectDb } from "../../../../helper/db";

type CustomProfile = {
  name: string;
  email: string;
  image?: string; 
  avatar_url?: string; 
  picture?: string;
};

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" }
      },
      async authorize(credentials, req) {
        await connectDb();
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found with this email address");
        }
        const matched = await bcrypt.compare(credentials.password, user.password);
        if (matched) {
          return user;
        } else {
          throw new Error("Invalid password");
        }
      },
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }:{ user: any; account: any; profile: CustomProfile }) {
      if (account.provider === "github" || account.provider === "google" || account.provider === "discord") {
        await connectDb();
        const existingUser = await User.findOne({ email: profile.email });
        
        if (!existingUser) {
          
          await User.create({
            name: profile.name,
            email: profile.email,
            profile_picture: profile.image || profile.picture || profile.avatar_url,
          });
        }
      }
      return true; // Return true to proceed with sign-in
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
   
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin"
  }
};

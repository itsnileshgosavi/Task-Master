import { options } from "./auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(options);

export { handler as GET, handler as POST };

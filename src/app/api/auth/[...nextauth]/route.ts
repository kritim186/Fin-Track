import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Demo Account",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "alex@fintrack.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.email === "alex@fintrack.com" && credentials?.password === "password") {
          return { id: "1", name: "Alex F.", email: "alex@fintrack.com" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "fintrack-secret-key-for-local-dev-only",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

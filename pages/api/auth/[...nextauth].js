import NextAuth from "next-auth";
import connectDB from "../../../db/connect";
const { User } = require("../../../models/User");
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./lib/mongdb";

// For more information on each option (and a full list of options) go to
// https://authjs.dev/reference/providers/oauth
export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, req) {
        connectDB().catch((error) => {
          error: "Connection Failed..!";
        });
        const { email, password } = credentials;

        const user = await User.findOne({ email }).select("+password");
        console.log("user:", user);

        if (!user) {
          return res.status(401).send("Invalid email or password.");
        }
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
          return res.status(401).send("Invalid email or password.");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      console.log("token:", token);
      // Send properties to the client, like an access_token and user id from a provider.
      // session.accessToken = token.accessToken
      session.user.id = token.sub;

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});

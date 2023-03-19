import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./lib/mongdb";

// For more information on each option (and a full list of options) go to
// https://authjs.dev/reference/providers/oauth
export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [],
});

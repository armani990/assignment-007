import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const mongoUrl = process.env.MONGODB_URL;
const secret = process.env.BETTER_AUTH_SECRET;

if (!mongoUrl) throw new Error("❌ MONGODB_URL .env.local-এ নেই");
if (!secret || secret.length < 32)
  throw new Error("❌ BETTER_AUTH_SECRET কমপক্ষে ৩২ অক্ষরের হতে হবে");

let globalWithMongo = global as typeof globalThis & {
  _mongoClient?: MongoClient;
};

const client =
  globalWithMongo._mongoClient ?? new MongoClient(mongoUrl);

if (process.env.NODE_ENV === "development") {
  globalWithMongo._mongoClient = client;
}

const db = client.db("bazar-dhor-app");

export const auth = betterAuth({
  appName: "বাজার দর",
  secret,
  baseURL: "http://localhost:3000",

  database: mongodbAdapter(db, {
    client,
    usePlural: true,
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  // ✅ নতুন user তৈরি হলে email auto-verified হিসেবে সেভ করো
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
              emailVerified: true,
            },
          };
        },
      },
    },
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      prompt: "select_account",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
});
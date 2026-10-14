import { MongoClient, type Db } from "mongodb";

const mongoUrl = process.env.MONGODB_URL;

if (!mongoUrl) {
  throw new Error("❌ MONGODB_URL .env.local-এ সেট করা নেই");
}

// Next.js hot reload-এ নতুন client তৈরি হওয়া রোধ করার জন্য global cache
let globalWithMongo = global as typeof globalThis & {
  _mongoClient?: MongoClient;
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Development-এ global variable ব্যবহার করি যাতে hot reload-এ নতুন client না বানায়
  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(mongoUrl);
  }
  client = globalWithMongo._mongoClient;
  clientPromise = Promise.resolve(client);
} else {
  // Production-এ প্রতি process-এ একটাই client
  client = new MongoClient(mongoUrl);
  clientPromise = Promise.resolve(client);
}

export async function getDb(): Promise<Db> {
  const c = await clientPromise;
  return c.db("bazar-dhor-app");
}

export { client, clientPromise };
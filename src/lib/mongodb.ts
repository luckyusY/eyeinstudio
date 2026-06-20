import { Db, MongoClient } from "mongodb";

let client: MongoClient | null = null;
let database: Db | null = null;

export async function getDb() {
  if (database) return database;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not configured");
  client = client ?? new MongoClient(uri);
  await client.connect();
  database = client.db(process.env.MONGODB_DB ?? "eyeinstudio");
  return database;
}

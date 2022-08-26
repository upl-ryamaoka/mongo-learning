import { MongoClient, Db } from 'mongodb';

const { MONGODB_URI: uri, MONGODB_DB: dbName } = process.env;

let cachedClient: MongoClient;
let cachedDb: Db;

if (!uri || !dbName) {
  throw new Error('mongoの環境変数を設定してください!');
}

export default async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri || '');

  const db = await client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

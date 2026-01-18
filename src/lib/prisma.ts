import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const pool = new Pool({ 
  connectionString,
  ssl: process.env.NODE_ENV === 'development' ? { rejectUnauthorized: false } : true
});
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

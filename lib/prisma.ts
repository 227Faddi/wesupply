import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const isProduction = process.env.NODE_ENV === 'production';
console.log(`[DB] Initializing Pool. Environment: ${process.env.NODE_ENV}, SSL: ${!isProduction ? 'Accepting self-signed' : 'Strict'}`);

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Adjust connection string for local dev if needed, or rely on Pool config.
// Note: connectionString params can override Pool config in some pg versions.
const pool = new Pool({ 
  connectionString,
  ssl: isProduction ? true : { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (!isProduction) globalForPrisma.prisma = prisma;

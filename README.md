PRISMAKIKÉSZÍT:
npm install @prisma/client @prisma/adapter-pg pg
npm install -D prisma @types/pg
npx prisma init

schema prisma:
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}
datasource db {
  provider = "postgresql"
}

npx prisma generate
npx prisma migrate dev --name init

prisma.ts:
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
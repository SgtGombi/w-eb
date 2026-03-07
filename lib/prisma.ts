// lib/prisma.ts
import { PrismaClient } from '../app/generated/prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// Singleton: csak 1 DB kapcsolat jön létre
const prisma = global.prisma || new PrismaClient({} as any);

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
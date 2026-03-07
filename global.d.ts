declare global {
  // kiegészítjük a global objektumot a prisma property-vel
  var prisma: import('./app/generated/prisma/client').PrismaClient | undefined;
}

export {};
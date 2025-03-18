import {PrismaClient} from '@prisma/client';
import {ENVIRONMENT, DATABASE_URL} from '../config';

let prisma: PrismaClient | undefined;

if (ENVIRONMENT === 'production') {
  prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
  });
} else {
  const globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };

  if (!globalWithPrisma.prisma) {
    const prisma = new PrismaClient({
      datasourceUrl: DATABASE_URL,
    });

    globalWithPrisma.prisma = prisma;
  }
  prisma = globalWithPrisma.prisma;
}

export async function connectDB() {
  await prisma!.$connect();
  console.log('DB connected!');
}

export async function disconnectDB() {
  await prisma!.$disconnect();
}

export default prisma!;

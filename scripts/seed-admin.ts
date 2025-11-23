import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedAdmin() {
  try {
    const admin = await prisma.user.upsert({
      where: { email: 'admin@easternhousing.com' },
      update: { role: 'admin' },
      create: {
        email: 'admin@easternhousing.com',
        name: 'Admin User',
        role: 'admin'
      }
    });
    
    console.log('Admin user created/updated:', admin);
  } catch (error) {
    console.error('Error seeding admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
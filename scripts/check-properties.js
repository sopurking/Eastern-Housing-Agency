const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkProperties() {
  try {
    console.log('🔍 Checking properties in database...');
    
    const properties = await prisma.property.findMany({
      take: 5,
      include: {
        creator: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    console.log(`📊 Found ${properties.length} properties`);
    
    properties.forEach((property, index) => {
      console.log(`\n--- Property ${index + 1} ---`);
      console.log('ID:', property.id);
      console.log('Title:', property.title);
      console.log('Images:', property.images);
      console.log('Videos:', property.videos);
      console.log('Images type:', typeof property.images);
      console.log('Videos type:', typeof property.videos);
      console.log('Images length:', property.images?.length || 0);
      console.log('Videos length:', property.videos?.length || 0);
    });

    const totalCount = await prisma.property.count();
    console.log(`\n📈 Total properties in database: ${totalCount}`);
    
  } catch (error) {
    console.error('❌ Error checking properties:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkProperties();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function removeSampleProperties() {
  try {
    console.log('🗑️ Removing hardcoded sample properties...');
    
    // Remove properties with sample titles
    const result = await prisma.property.deleteMany({
      where: {
        title: {
          in: [
            'Luxury 4-Bedroom Duplex in Aba',
            'Modern 3-Bedroom Apartment in Enugu', 
            'Executive Villa in Awka'
          ]
        }
      }
    });
    
    console.log(`✅ Removed ${result.count} sample properties`);
    console.log('🎉 Your uploaded properties are now the only ones showing!');
    
  } catch (error) {
    console.error('❌ Error removing sample properties:', error);
  } finally {
    await prisma.$disconnect();
  }
}

removeSampleProperties();
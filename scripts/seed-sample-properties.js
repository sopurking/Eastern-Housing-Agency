const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedProperties() {
  try {
    console.log('🌱 Seeding sample properties...');
    
    // First, get or create an admin user
    let adminUser = await prisma.user.findFirst({
      where: { role: 'admin' }
    });

    if (!adminUser) {
      adminUser = await prisma.user.create({
        data: {
          email: 'admin@easternhousing.com',
          name: 'Admin User',
          role: 'admin',
        }
      });
      console.log('✅ Created admin user');
    }

    const sampleProperties = [
      {
        title: 'Luxury 4-Bedroom Duplex in Aba',
        description: 'Beautiful modern duplex with spacious rooms and premium finishes',
        state: 'Abia',
        city: 'Aba',
        location: 'GRA Phase 2, Aba, Abia State',
        type: 'duplex',
        price: 85000000,
        beds: 4,
        baths: 3,
        sqft: '2500',
        images: [
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
          'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800'
        ],
        videos: [
          'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
        ],
        featured: true,
        status: 'active',
        createdBy: adminUser.id,
      },
      {
        title: 'Modern 3-Bedroom Apartment in Enugu',
        description: 'Contemporary apartment with city views and modern amenities',
        state: 'Enugu',
        city: 'Enugu',
        location: 'Independence Layout, Enugu, Enugu State',
        type: 'apartment',
        price: 45000000,
        beds: 3,
        baths: 2,
        sqft: '1800',
        images: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
          'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800'
        ],
        videos: [],
        featured: true,
        status: 'active',
        createdBy: adminUser.id,
      },
      {
        title: 'Executive Villa in Awka',
        description: 'Spacious villa with garden and swimming pool',
        state: 'Anambra',
        city: 'Awka',
        location: 'Ngozika Estate, Awka, Anambra State',
        type: 'villa',
        price: 120000000,
        beds: 5,
        baths: 4,
        sqft: '3200',
        images: [
          'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
          'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
          'https://images.unsplash.com/photo-1600563438938-a42b5a1a2d56?w=800'
        ],
        videos: [
          'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4'
        ],
        featured: true,
        status: 'active',
        createdBy: adminUser.id,
      }
    ];

    // Delete existing sample properties only (keep user-created ones)
    await prisma.property.deleteMany({
      where: {
        title: {
          in: sampleProperties.map(p => p.title)
        }
      }
    });
    console.log('🗑️ Cleared existing sample properties');

    // Create new properties
    for (const propertyData of sampleProperties) {
      const property = await prisma.property.create({
        data: propertyData
      });
      console.log(`✅ Created property: ${property.title}`);
      console.log(`   Images: ${property.images.length} items`);
      console.log(`   Videos: ${property.videos.length} items`);
    }

    console.log('🎉 Sample properties seeded successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding properties:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedProperties();
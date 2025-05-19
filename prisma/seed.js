const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Hash password with bcryptjs
  const hashedPassword = await bcrypt.hash('Admin123!', 10);
  
  try {
    // Update the admin user if exists, otherwise create
    const admin = await prisma.user.upsert({
      where: {
        email: 'admin@skylimittravels.co.uk',
      },
      update: {
        // Update password with new hash
        password: hashedPassword,
      },
      create: {
        name: 'Admin User',
        email: 'admin@skylimittravels.co.uk',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    
    console.log('Admin user created/updated successfully:', admin.email);
  } catch (error) {
    console.error('Error updating admin user:', error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }); 
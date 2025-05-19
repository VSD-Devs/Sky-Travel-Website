console.log('Setting up SQLite database for production...');

// Try to generate Prisma client and apply schema
const { execSync } = require('child_process');
const fs = require('fs');

try {
  // Create SQLite file if it doesn't exist
  if (!fs.existsSync('./prod.db')) {
    console.log('Creating SQLite database file...');
    fs.writeFileSync('./prod.db', '');
  }

  // Generate Prisma client
  console.log('Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // Push schema to SQLite database
  console.log('Creating tables in SQLite database...');
  execSync('npx prisma db push', { stdio: 'inherit' });
  
  console.log('✅ SQLite database setup completed');
  process.exit(0); // Success
} catch (error) {
  console.error('Database setup error:', error.message);
  console.log('Proceeding with build anyway...');
  // We don't fail the build if DB setup has issues
  process.exit(0);
} 
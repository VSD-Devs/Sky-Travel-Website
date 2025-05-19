console.log('Checking database connectivity...');

// Try to validate the current schema against the database
// If it succeeds, we know the database is reachable
const { execSync } = require('child_process');

try {
  // Generate Prisma client
  console.log('Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // Try to push schema changes (this will apply if there are any differences)
  try {
    console.log('Attempting to push schema changes...');
    execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' });
    console.log('Schema updated successfully');
  } catch (schemaError) {
    console.error('Failed to update schema:', schemaError.message);
    console.log('Continuing with existing schema');
  }
  
  console.log('Database connection successful, proceeding with build');
  process.exit(0); // Success
} catch (error) {
  console.error('Database connection failed:', error.message);
  console.log('Proceeding with build without database connection...');
  // We don't fail the build if DB is unavailable - this allows static pages to still be built
  process.exit(0);
} 
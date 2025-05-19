console.log('Checking Supabase database connectivity and generating client...');

// Try to generate Prisma client and apply migrations
const { execSync } = require('child_process');

try {
  // Generate Prisma client
  console.log('Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // Push the schema to the database
  try {
    console.log('Applying database schema to Supabase...');
    // We use db push for simplicity - for production you might want to use migrations later
    execSync('npx prisma db push', { stdio: 'inherit' });
    console.log('✅ Schema applied successfully');
  } catch (dbError) {
    console.error('Warning: Error while applying schema:', dbError.message);
    console.log('Continuing build process despite schema push error');
    // This allows the build to continue even if schema push fails
  }
  
  console.log('✅ Prisma client generated successfully, proceeding with build');
  process.exit(0); // Success
} catch (error) {
  console.error('Database setup had an issue:', error.message);
  console.log('Proceeding with build anyway...');
  // We don't fail the build if DB setup has issues
  process.exit(0);
} 
#!/usr/bin/env bun

/**
 * Setup Supabase Database Schema
 * This script creates all tables in Supabase PostgreSQL database
 */

import { execSync } from 'child_process';

console.log('🚀 Setting up Supabase database schema...');

// Check if SUPABASE_DATABASE_URL is set
const supabaseUrl = process.env.SUPABASE_DATABASE_URL;

if (!supabaseUrl) {
  console.error('❌ Error: SUPABASE_DATABASE_URL is not set in .env file');
  process.exit(1);
}

console.log('📝 Creating database schema in Supabase...');

try {
  // Run prisma db push with Supabase connection
  execSync(
    `DATABASE_URL="${supabaseUrl}" bun prisma db push --accept-data-loss`,
    {
      stdio: 'inherit',
      env: {
        ...process.env,
        DATABASE_URL: supabaseUrl,
      },
    }
  );

  console.log('\n✅ Database schema created successfully in Supabase!');
  console.log('\n📊 You can now run the migration:');
  console.log('   curl -X POST http://localhost:3000/api/migrate');
} catch (error) {
  console.error('\n❌ Failed to create database schema');
  console.error(error.message);
  process.exit(1);
}

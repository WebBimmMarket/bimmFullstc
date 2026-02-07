#!/bin/bash

# Setup Supabase Database Schema
# This script creates all tables in Supabase PostgreSQL database

echo "🚀 Setting up Supabase database schema..."

# Check if SUPABASE_DATABASE_URL is set
if [ -z "$SUPABASE_DATABASE_URL" ]; then
    echo "❌ Error: SUPABASE_DATABASE_URL is not set in .env file"
    exit 1
fi

# Temporarily override DATABASE_URL for this command
echo "📝 Creating database schema in Supabase..."

DATABASE_URL="$SUPABASE_DATABASE_URL" bun prisma db push --accept-data-loss

if [ $? -eq 0 ]; then
    echo "✅ Database schema created successfully in Supabase!"
    echo ""
    echo "📊 You can now run the migration:"
    echo "   curl -X POST http://localhost:3000/api/migrate"
else
    echo "❌ Failed to create database schema"
    exit 1
fi

import { PrismaClient } from '@prisma/client';
import Database from 'better-sqlite3';
import { Pool } from 'pg';

// Prisma client untuk SQLite (source & migration tracking)
const prisma = new PrismaClient();

// Prisma client khusus untuk Supabase PostgreSQL (target)
const prismaSupabase = new PrismaClient({
  datasources: {
    db: {
      url: process.env.SUPABASE_DATABASE_URL,
    },
  },
});

// Konfigurasi SQLite (source)
const db = new Database('./db/custom.db');

// Konfigurasi PostgreSQL (target - dari environment Supabase)
const pgPool = new Pool({
  connectionString: process.env.SUPABASE_DATABASE_URL,
});

interface MigrationTable {
  tableName: string;
  primaryKey: string;
  columns: string[];
}

// Mapping tabel SQLite ke PostgreSQL
const TABLE_MAPPINGS: MigrationTable[] = [
  {
    tableName: 'User',
    primaryKey: 'id',
    columns: ['id', 'firebaseUid', 'email', 'displayName', 'photoURL', 'level', 'paidCount', 'createdAt', 'updatedAt']
  },
  {
    tableName: 'Category',
    primaryKey: 'key',
    columns: ['id', 'key', 'name', 'isMain', 'iconUrl', 'order', 'matchKeywords', 'active', 'parentId', 'createdAt', 'updatedAt']
  },
  {
    tableName: 'Product',
    primaryKey: 'id',
    columns: ['id', 'name', 'price', 'stock', 'categoryKey', 'subCategoryKey', 'image', 'imageUrl', 'status', 'available', 'description', 'discountActive', 'discountPercent', 'discountStart', 'discountEnd', 'soldCount', 'order', 'createdAt', 'updatedAt']
  },
  {
    tableName: 'Order',
    primaryKey: 'orderNumber',
    columns: ['id', 'orderNumber', 'userId', 'name', 'email', 'whatsapp', 'notes', 'paymentMethod', 'total', 'status', 'paymentProofUrl', 'deliveryData', 'createdAt', 'statusUpdatedAt', 'updatedAt']
  },
  {
    tableName: 'OrderItem',
    primaryKey: 'id',
    columns: ['id', 'orderId', 'productId', 'name', 'price', 'qty', 'image', 'createdAt']
  },
  {
    tableName: 'PaymentMethod',
    primaryKey: 'id',
    columns: ['id', 'label', 'type', 'account', 'holder', 'qrisUrl', 'qrisImageUrl', 'order', 'active', 'createdAt', 'updatedAt']
  },
  {
    tableName: 'Announcement',
    primaryKey: 'id',
    columns: ['id', 'title', 'body', 'image', 'imageUrl', 'order', 'active', 'createdAt', 'updatedAt']
  },
  {
    tableName: 'AboutItem',
    primaryKey: 'id',
    columns: ['id', 'title', 'subtitle', 'icon', 'iconUrl', 'url', 'order', 'createdAt', 'updatedAt']
  },
  {
    tableName: 'ContactLink',
    primaryKey: 'id',
    columns: ['id', 'type', 'label', 'url', 'order', 'createdAt', 'updatedAt']
  },
  {
    tableName: 'WaAdmin',
    primaryKey: 'id',
    columns: ['id', 'number', 'label', 'order', 'active', 'createdAt', 'updatedAt']
  },
  {
    tableName: 'Manager',
    primaryKey: 'uid',
    columns: ['id', 'uid', 'label', 'createdAt', 'updatedAt']
  },
  {
    tableName: 'Ranking',
    primaryKey: 'id',
    columns: ['id', 'userId', 'userName', 'userEmail', 'totalSpent', 'position', 'createdAt', 'updatedAt']
  },
  {
    tableName: 'Welcome',
    primaryKey: 'key',
    columns: ['id', 'key', 'title', 'subtitle', 'imageUrl', 'active', 'updatedAt']
  },
];

// Ambil data dari SQLite
function getDataFromSQLite(tableName: string): any[] {
  try {
    const query = `SELECT * FROM ${tableName}`;
    const stmt = db.prepare(query);
    return stmt.all();
  } catch (error) {
    console.error(`Error reading ${tableName} from SQLite:`, error);
    return [];
  }
}

// Transform data untuk PostgreSQL
function transformData(tableName: string, data: any[]): any[] {
  const mapping = TABLE_MAPPINGS.find(m => m.tableName === tableName);
  if (!mapping) return [];

  return data.map((row: any) => {
    const transformed: any = {};

    mapping.columns.forEach(col => {
      let value = row[col];

      // Transform tanggal SQLite ke PostgreSQL
      if (col.includes('Date') || col.includes('At')) {
        if (value && typeof value === 'number') {
          // Timestamp SQLite (ms)
          value = new Date(value);
        } else if (value && typeof value === 'string') {
          // ISO string
          value = new Date(value);
        }
      }

      // Transform string kosong ke null
      if (value === '' || value === undefined) {
        value = null;
      }

      // Transform boolean dari number
      if (col === 'isMain' || col === 'active' || col === 'available') {
        if (value === 0 || value === 1) {
          value = Boolean(value);
        }
      }

      transformed[col] = value;
    });

    return transformed;
  });
}

// Migrasi satu tabel
async function migrateTable(tableName: string, migrationId: string): Promise<{ success: boolean; count: number; error?: string }> {
  console.log(`Migrating ${tableName}...`);

  try {
    // 1. Ambil data dari SQLite
    const sourceData = getDataFromSQLite(tableName);
    const recordCount = sourceData.length;

    if (recordCount === 0) {
      console.log(`  → No data in ${tableName}, skipping`);
      return { success: true, count: 0 };
    }

    // 2. Transform data
    const targetData = transformData(tableName, sourceData);

    // 3. Update status ke "running" (di SQLite untuk tracking)
    await prisma.migration.update({
      where: { id: migrationId },
      data: {
        status: 'running',
        recordCount,
      }
    });

    // 4. Insert ke Supabase PostgreSQL menggunakan prismaSupabase
    if (tableName === 'User') {
      await prismaSupabase.user.createMany({ data: targetData, skipDuplicates: true });
    } else if (tableName === 'Category') {
      await prismaSupabase.category.createMany({ data: targetData, skipDuplicates: true });
    } else if (tableName === 'Product') {
      await prismaSupabase.product.createMany({ data: targetData, skipDuplicates: true });
    } else if (tableName === 'Order') {
      await prismaSupabase.order.createMany({ data: targetData });
    } else if (tableName === 'OrderItem') {
      await prismaSupabase.orderItem.createMany({ data: targetData });
    } else if (tableName === 'PaymentMethod') {
      await prismaSupabase.paymentMethod.createMany({ data: targetData, skipDuplicates: true });
    } else if (tableName === 'Announcement') {
      await prismaSupabase.announcement.createMany({ data: targetData, skipDuplicates: true });
    } else if (tableName === 'AboutItem') {
      await prismaSupabase.aboutItem.createMany({ data: targetData, skipDuplicates: true });
    } else if (tableName === 'ContactLink') {
      await prismaSupabase.contactLink.createMany({ data: targetData, skipDuplicates: true });
    } else if (tableName === 'WaAdmin') {
      await prismaSupabase.waAdmin.createMany({ data: targetData, skipDuplicates: true });
    } else if (tableName === 'Manager') {
      await prismaSupabase.manager.createMany({ data: targetData, skipDuplicates: true });
    } else if (tableName === 'Ranking') {
      await prismaSupabase.ranking.createMany({ data: targetData, skipDuplicates: true });
    } else if (tableName === 'Welcome') {
      await prismaSupabase.welcome.createMany({ data: targetData, skipDuplicates: true });
    }

    // 5. Update status ke "completed" (di SQLite untuk tracking)
    await prisma.migration.update({
      where: { id: migrationId },
      data: {
        status: 'completed',
        completedAt: new Date(),
      }
    });

    console.log(`  → Migrated ${recordCount} records from ${tableName}`);

    return { success: true, count: recordCount };
  } catch (error: any) {
    console.error(`Error migrating ${tableName}:`, error);
    
    // Update status ke "failed" (di SQLite untuk tracking)
    await prisma.migration.update({
      where: { id: migrationId },
      data: {
        status: 'failed',
        error: error.message,
        completedAt: new Date(),
      }
    });

    return { success: false, count: 0, error: error.message };
  }
}

// Main migration function
export async function runMigration(): Promise<{
  success: boolean;
  totalRecords: number;
  tables: Array<{ table: string; count: number; error?: string }>;
  error?: string;
}> {
  console.log('🚀 Starting migration from SQLite to PostgreSQL...');

  try {
    // 1. Buat record migration baru
    const migration = await prisma.migration.create({
      data: {
        sourceType: 'sqlite',
        targetType: 'postgres',
        status: 'running',
        tableName: 'all',
        recordCount: 0,
      }
    });

    // 2. Migrasi semua tabel berurutan
    const results: Array<{ table: string; count: number; error?: string }> = [];
    let totalRecords = 0;

    for (const mapping of TABLE_MAPPINGS) {
      const result = await migrateTable(mapping.tableName, migration.id);
      results.push(result);
      totalRecords += result.count;
    }

    // 3. Update migration summary
    await prisma.migration.update({
      where: { id: migration.id },
      data: {
        tableName: JSON.stringify(results),
        status: 'completed',
        recordCount: totalRecords,
        completedAt: new Date(),
      }
    });

    console.log('✅ Migration completed successfully!');
    console.log(`   Total records migrated: ${totalRecords}`);

    return {
      success: true,
      totalRecords,
      tables: results,
    };
  } catch (error) {
    console.error('❌ Migration failed:', error);
    return {
      success: false,
      totalRecords: 0,
      tables: [],
      error: error.message,
    };
  } finally {
    // Tutup connections
    db.close();
    await prisma.$disconnect();
    await prismaSupabase.$disconnect();
    await pgPool.end();
  }
}

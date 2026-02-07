# 🔄 MIGRASI DATABASE KE SUPABASE

## 📋 PERSIAPAN SEBELUM MIGRASI

### 1. Install Dependencies Diperlukan

```bash
# Install better-sqlite3 untuk baca database SQLite
bun add better-sqlite3

# Install pg untuk koneksi PostgreSQL (opsional tapi rekomendasi untuk testing)
bun add pg
```

### 2. Konfigurasi Supabase

#### A. Buat Project Supabase
1. Buka: https://supabase.com
2. Login atau sign up
3. Klik **"New Project"**
4. Isi:
   - Name: `bimm-market`
   - Database Password: [buat password yang kuat!]
   - Region: Southeast Asia (Singapore) - paling dekat Indonesia
5. Klik **"Create new project"**

#### B. Ambil Connection String
1. Setelah project jadi, buka tab **"SQL Editor"**
2. Klik **"New query"**
3. Klik icon **Database connection string** (🔗)
4. Copy string yang muncul, format:
   ```
   postgresql://postgres:[PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres
   ```

### 3. Update Environment Variables

#### Di Vercel:
1. Buka project Vercel: `bimm-market-fullstack`
2. Settings → Environment Variables
3. Update variable berikut:

| Variable Name | Value (Ganti dengan connection string Anda) |
|--------------|---------------------------------------------------|
| `DATABASE_URL` | `postgresql://postgres:[PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres` |

4. Klik **Save**
5. Vercel akan otomatis redeploy dengan environment baru

---

## 🚀 PROSES MIGRASI

### Opsi A: Migrasi via API (REKOMENDASI)

Setelah environment variables di-update, API migrasi akan otomatis berjalan:

#### 1. Cek Status Migrasi
Buka URL: `https://bimm-market-fullstack.vercel.app/api/migrate`

Anda akan melihat:
```json
{
  "status": "ready",
  "canMigrate": true,
  "lastMigration": null,
  "recentMigrations": []
}
```

#### 2. Trigger Migrasi
```bash
# Via curl:
curl -X POST https://bimm-market-fullstack.vercel.app/api/migrate

# Atau via browser:
# Buka URL di browser dan reload halaman, lalu gunakan Developer Console:
fetch('/api/migrate', { method: 'POST' })
  .then(r => r.json())
  .then(d => console.log(d))
```

#### 3. Monitor Progress

Kembali ke status API (`/api/migrate`) beberapa saat kemudian. Anda akan melihat:

```json
{
  "status": "running",
  "recordCount": 150,
  "tableName": "all"
}
```

Proses ini bisa memakan 1-5 menit tergantung jumlah data.

#### 4. Selesai

Setelah selesai:
```json
{
  "status": "completed",
  "completedAt": "2024-02-07T10:30:00.000Z",
  "totalRecords": 150,
  "tables": [
    { "table": "User", "count": 5 },
    { "table": "Category", "count": 12 },
    { "table": "Product", "count": 50 },
    { "table": "Order", "count": 20 },
    { "table": "PaymentMethod", "count": 5 },
    { "table": "Announcement", "count": 3 },
    { "table": "ContactLink", "count": 4 },
    { "table": "WaAdmin", "count": 3 },
    { "table": "Manager", "count": 2 }
  ]
}
```

### Opsi B: Migrasi Otomatis di Setiap Deploy

Untuk memastikan migrasi berjalan otomatis setiap kali ada perubahan:

#### Update `next.config.ts`:
```typescript
import { NextConfig } from 'next';

const nextConfig: {
  // ... existing config

  env: {
    // Trigger migration setelah build
    NEXT_PUBLIC_MIGRATION_ENABLED: 'true',
  },
};

export default nextConfig;
```

#### Tambah script di `package.json`:
```json
{
  "scripts": {
    // ... existing scripts
    "migrate: "bun run build && bun run migration:trigger",
    "migration:trigger": "node scripts/trigger-migration.js"
  }
}
```

#### Buat file `scripts/trigger-migration.js`:
```javascript
if (process.env.NEXT_PUBLIC_MIGRATION_ENABLED === 'true') {
  console.log('Triggering migration...');
  fetch('/api/migrate', {
    method: 'POST'
  })
  .then(r => r.json())
  .then(data => {
    console.log('Migration result:', data);
  })
  .catch(error => {
    console.error('Migration error:', error);
  });
}
```

---

## 📊 YANG DIPINDAHKAN

### Data yang Dimigrasi:
✅ **Users** - Akun pengguna (Firebase auth)
✅ **Categories** - Kategori & sub-kategori produk
✅ **Products** - Data produk lengkap (nama, harga, stok, diskon, dll)
✅ **Orders** - Riwayat pesanan
✅ **Order Items** - Item dalam setiap pesanan
✅ **Payment Methods** - Metode pembayaran (QRIS, bank, e-wallet)
✅ **Announcements** - Pengumuman
✅ **Contact Links** - Kontak & social media
✅ **WA Admins** - Data admin WhatsApp
✅ **Managers** - Data manager (admin access)
✅ **Rankings** - Data ranking customer
✅ **Welcome** - Data welcome banner

### Transformasi Data:
✅ **Dates** - Semua tanggal dikonversi dari timestamp SQLite ke DateTime PostgreSQL
✅ **Booleans** - Transformasi tipe data (0/1 ke true/false)
✅ **Nulls** - String kosong diubah ke null
✅ **Strings** - Tetap sebagai string

---

## 🛠️ ERROR HANDLING

### Error 1: Database Not Configured
```
{
  "error": "PostgreSQL database not configured",
  "message": "DATABASE_URL must point to PostgreSQL"
}
```
**Solusi**: Periksa environment variables di Vercel dan pastikan `DATABASE_URL` sudah benar

### Error 2: Migration Already Running
```
{
  "error": "Migration already in progress",
  "message": "Please wait for current migration to complete"
}
```
**Solusi**: Tunggu migrasi saat ini selesai (cek `/api/migrate`)

### Error 3: No Data to Migrate
Jika SQLite database kosong, migrasi akan skip semua tabel dan selesai dengan 0 records.

### Error 4: Connection Failed
Jika koneksi ke Supabase gagal:
1. Check connection string di environment variables
2. Pastikan password database Supabase benar
3. Cek apakah Supabase project sudah aktif
4. Buka Supabase Dashboard → Settings → Database untuk troubleshooting

---

## 🧪 VERIFIKASI SETELAH MIGRASI

### 1. Cek di Supabase Dashboard

Buka: https://supabase.com/dashboard/project/[PROJECT-ID]/editor
Anda seharusnya melihat:
- ✅ Table `User` dengan data dari SQLite
- ✅ Table `Category` dengan data dari SQLite
- ✅ Table `Product` dengan data dari SQLite
- ✅ Table `Order` dengan data dari SQLite
- ✅ Dan seterusnya...

### 2. Test Aplikasi Production

Buka: `https://bimm-market-fullstack.vercel.app`
Test semua fitur:
- [ ] Homepage loads tanpa error
- [ ] Products muncul dari database PostgreSQL
- [ ] Orders berhasil dibuat dan disimpan ke PostgreSQL
- [ ] Categories berfungsi
- [ ] Cart berfungsi
- [ ] Checkout dan order submission berhasil
- [ ] Login dengan Firebase berfungsi
- [ ] Tidak ada error di console browser

### 3. Check API Response

Test API endpoints:
```bash
# Cek status migrasi
curl https://bimm-market-fullstack.vercel.app/api/migrate

# Test API produk (sudah ambil dari PostgreSQL)
curl https://bimm-market-fullstack.vercel.app/api/products

# Test kategori
curl https://bimm-market-fullstack.vercel.app/api/categories
```

---

## 📝 CHECKLIST FINAL

### Sebelum Production:
- [ ] Dependencies terinstall (`better-sqlite3`, `pg`)
- [ ] Supabase project dibuat
- [ ] Connection string di-copy
- [ ] `prisma/schema.prisma` di-update ke PostgreSQL
- [ ] Environment variables di-update di Vercel
- [ ] Code push ke GitHub
- [ ] Deploy berhasil ke Vercel
- [ ] Status migrasi API: `ready`

### Setelah Deploy:
- [ ] `DATABASE_URL` sudah di-update di Vercel
- [ ] Vercel redeploy selesai
- [ ] Status migrasi: `canMigrate: true`
- [ ] Migrasi di-trigger via POST `/api/migrate`
- [ ] Status berubah: `running` → `completed`
- [ ] Semua tabel berhasil dimigrasi
- [ ] Data di Supabase sudah sesuai
- [ ] Aplikasi production berfungsi dengan PostgreSQL
- [ ] Semua fitur teruji
- [ ] Tidak ada error di console
- [ ] Performance acceptable

### Setelah Sukses:
- [ ] SQLite database local bisa dihapus (backup dulu!)
- [ ] Monitoring aktif di Vercel Dashboard
- [ ] Backup strategy ditetap
- [ ] Scaling plan dievaluasi jika traffic tinggi

---

## 🎯 KEUNGGAN

### Kelebihan Menggunakan Supabase + Migrasi Otomatis:

✅ **Production Ready** - Database PostgreSQL lebih robust untuk production
✅ **Auto-Sync** - Data otomatis dimigrasi dari SQLite ke Supabase
✅ **Data Integrity** - Transformasi data yang hati-hati dengan validasi
✅ **Monitoring** - Status migrasi bisa dimonitor via API
✅ **Rollback Ready** - Data SQLite tetap tersedia sebagai backup
✅ **Non-Blocking** - Migrasi berjalan di background, tidak block aplikasi
✅ **Retry Safe** - Sistem cek migrasi yang sedang berjalan
✅ **Scalable** - Supabase bisa di-scale jika traffic meningkat

---

## 📞 BUTUH BANTUAN?

### Q: Apakah data SQLite akan hilang setelah migrasi?
A: Tidak, data SQLite tetap ada di local sebagai backup. Anda bisa:
- Menghapus setelah yakin migration sukses
- Menyimpan sebagai backup untuk rollback jika perlu

### Q: Berapa lama proses migrasi?
A: Tergantung jumlah data:
- 0-10 records: < 10 detik
- 10-100 records: < 1 menit
- 100-1000 records: < 5 menit
- 1000+ records: 5-10 menit

### Q: Apakah aplikasi akan down selama migrasi?
A: Tidak! Migrasi berjalan di background:
- Aplikasi tetap bisa diakses
- Data baru akan langsung disimpan ke PostgreSQL
- Data lama dari SQLite akan dimigrasi secara terpisah

### Q: Bisa migrasi ulang jika gagal?
A: Ya! Script akan handle error dengan baik:
- Status migrasi akan berubah: `running` → `failed`
- Error akan dicatat di database
- Anda bisa trigger migrasi ulang kapan saja

### Q: Bagaimana jika ada duplicate data?
A: Query menggunakan `skipDuplicates: true` di beberapa tabel, sehingga:
- Data duplicate tidak akan dimasukkan ganda
- Data baru akan meng-overwrite data lama jika primary key sama
- Safe dan tidak akan menyebabkan error

---

## 🚀 READY TO DEPLOY!

Setelah semua langkah diikuti, sistem migrasi otomatis sudah siap!

**Langkah terakhir:**
1. Push code ke GitHub (termasuk file migrasi baru)
2. Deploy ke Vercel (otomatis)
3. Update `DATABASE_URL` environment variables
4. Trigger migrasi via `/api/migrate`
5. Verifikasi di Supabase Dashboard
6. Test semua fitur production
7. Done! 🎉

---

## 💡 TIPS PRODUKSI

1. **Monitor Regular** - Cek migration status API secara berkala
2. **Backup Strategy** - Schedule backup database Supabase (7 daily via Supabase Dashboard)
3. **Error Alerts** - Setup alerts di Vercel untuk deployment failures
4. **Performance** - Gunakan Supabase Realtime untuk features yang butuh real-time
5. **Security** - Review security rules di Supabase Dashboard

**SELAMAT BERHASIL!** 🎉

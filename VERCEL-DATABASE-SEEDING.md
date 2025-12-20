# Database Migration & Seeding di Vercel

Panduan lengkap untuk run migration dan seed database production di Vercel.

---

## 📋 Apa yang akan di-seed?

Seed file akan membuat data awal berikut:

✅ **2 Admin Accounts:**
- Username: `admin` / Password: `admin123`
- Username: `kepsek` / Password: `kepsek123`

✅ **6 Teacher Accounts:**
- Username: `budi`, `siti`, `andi`, `dewi`, `rudi`, `maya`
- Password semua: `guru123`

✅ **6 Teacher Profiles** untuk homepage  
✅ **3 News/Berita**  
✅ **3 Products** (karya siswa)  
✅ **6 Gallery Items**  
✅ **Principal Info** (info kepala sekolah)  
✅ **Site Statistics**

---

## 🚀 Metode 1: Via Vercel CLI (RECOMMENDED)

### Prerequisites:
- Vercel CLI sudah terinstall
- Sudah deploy aplikasi ke Vercel
- Environment variables sudah di-set di Vercel

### Step-by-Step:

#### **1. Install Vercel CLI (jika belum)**
```bash
npm install -g vercel
```

#### **2. Login ke Vercel**
```bash
vercel login
```

#### **3. Link Project ke Vercel**
```bash
cd /path/to/project
vercel link
```

Follow prompt:
- Pilih scope (your account)
- Link to existing project? **Yes**
- Project name: `this_idonknow`

#### **4. Pull Environment Variables dari Vercel**
```bash
vercel env pull .env.vercel
```

Ini akan download semua env vars dari Vercel ke file `.env.vercel`

#### **5. Run Migration ke Database Production**
```bash
# Install dotenv-cli jika belum
npm install -g dotenv-cli

# Run migration
npx dotenv -e .env.vercel -- npx prisma migrate deploy
```

Output yang diharapkan:
```
✓ Prisma Migrate applied the following migration(s):
  migrations/
    └─ 20241214173458_init/
       └─ migration.sql
```

#### **6. Run Seeder**
```bash
npx dotenv -e .env.vercel -- npx prisma db seed
```

Output yang diharapkan:
```
✓ Created 2 admins and 6 teachers
✓ Created 6 teacher profiles
✓ Created 3 news items
✓ Created 3 products
✓ Created 6 gallery items
✓ Created principal info
✓ Created site stats

🎉 Database seeded successfully!
================================
Summary:
- Admin: username 'admin' / password 'admin123'
- Kepsek: username 'kepsek' / password 'kepsek123'
- 6 Teacher accounts (budi, siti, andi, dewi, rudi, maya / password: guru123)
- 6 Teacher profiles for homepage
- 3 News items
- 3 Products
- 6 Gallery items
- Principal info
- Site statistics
```

✅ **Done!** Database production Anda sudah terisi data awal.

---

## 🔄 Metode 2: Manual (Tanpa Vercel CLI)

Jika tidak bisa install Vercel CLI, gunakan cara manual:

### **1. Dapatkan DATABASE_URL dari Vercel**

1. Buka Vercel Dashboard
2. Project Settings → Environment Variables
3. Copy nilai `DATABASE_URL`

### **2. Set DATABASE_URL di Local**

**Opsi A: Via .env file**
```bash
# Buat file .env.vercel
echo 'DATABASE_URL="postgresql://user:pass@host:5432/db"' > .env.vercel
```

**Opsi B: Via environment variable temporary**
```bash
# Linux/Mac
export DATABASE_URL="postgresql://user:pass@host:5432/db"

# Windows PowerShell
$env:DATABASE_URL="postgresql://user:pass@host:5432/db"
```

### **3. Run Migration**

**Jika pakai .env file:**
```bash
npx dotenv -e .env.vercel -- npx prisma migrate deploy
```

**Jika pakai export:**
```bash
npx prisma migrate deploy
```

### **4. Run Seeder**

**Jika pakai .env file:**
```bash
npx dotenv -e .env.vercel -- npx prisma db seed
```

**Jika pakai export:**
```bash
npx prisma db seed
```

---

## 🗄️ Metode 3: Via Database GUI (Supabase/Railway)

Jika menggunakan Supabase atau Railway yang punya SQL editor:

### **1. Run Migration Manual**

1. Copy isi file `prisma/migrations/20241214173458_init/migration.sql`
2. Buka SQL editor di Supabase/Railway dashboard
3. Paste dan execute SQL tersebut

### **2. Run Seeder via Local dengan Connection String**

```bash
DATABASE_URL="your-production-db-url" npx prisma db seed
```

---

## 🔍 Verification - Cek Data Berhasil Masuk

### **Metode 1: Via Prisma Studio**

```bash
# Buka Prisma Studio yang connect ke production database
npx dotenv -e .env.vercel -- npx prisma studio
```

Buka browser di `http://localhost:5555` dan cek:
- Table `User` → Should have 8 users (2 admin, 6 teachers)
- Table `News` → Should have 3 news items
- Table `Product` → Should have 3 products
- Table `Gallery` → Should have 6 gallery items

### **Metode 2: Via Aplikasi Web**

1. Buka aplikasi Vercel Anda di browser
2. Coba login dengan:
   - Username: `admin`
   - Password: `admin123`
3. Cek homepage apakah data muncul:
   - Berita
   - Galeri
   - Teacher profiles
   - Stats

### **Metode 3: Via Database Dashboard**

**Vercel Postgres:**
1. Vercel Dashboard → Storage → Your Database
2. Tab "Data" → Browse tables

**Supabase:**
1. Supabase Dashboard → Table Editor
2. Browse tables: User, News, Product, Gallery, etc.

**Railway:**
1. Railway Dashboard → Database → Data
2. Browse tables

---

## ⚠️ Troubleshooting

### Error: "Environment variable not found: DATABASE_URL"

**Solusi:**
1. Pastikan sudah run `vercel env pull .env.vercel`
2. Atau pastikan DATABASE_URL di-set manual
3. Check file `.env.vercel` ada dan berisi DATABASE_URL

### Error: "Can't reach database server"

**Solusi:**
1. Cek DATABASE_URL format benar
2. Cek database masih running
3. Cek firewall database (allow connections from anywhere)
4. Untuk Supabase: gunakan "Session Pooler" connection string

### Error: "The table `User` does not exist"

**Solusi:**
1. Run migration dulu: `npx prisma migrate deploy`
2. Baru run seed

### Error: "Unique constraint failed on the fields: (`email`)"

**Artinya:** Data sudah ada di database

**Solusi:**
1. Drop semua data dulu (⚠️ HATI-HATI!):
   ```bash
   npx dotenv -e .env.vercel -- npx prisma migrate reset
   ```
2. Atau edit seed file untuk tidak create duplicate data

### Error: "Cannot find module 'tsx'"

**Solusi:**
```bash
npm install tsx --save-dev
```

---

## 🔄 Re-seed Database (Reset & Seed Ulang)

**⚠️ WARNING: Ini akan HAPUS SEMUA DATA dan seed ulang!**

```bash
# Reset database (drop all data, run migrations, run seed)
npx dotenv -e .env.vercel -- npx prisma migrate reset --skip-generate

# Atau manual step by step:
# 1. Drop all tables
npx dotenv -e .env.vercel -- npx prisma migrate reset --skip-seed

# 2. Run migrations
npx dotenv -e .env.vercel -- npx prisma migrate deploy

# 3. Run seed
npx dotenv -e .env.vercel -- npx prisma db seed
```

---

## 📝 Custom Seeding (Modify Data)

Jika ingin mengubah data yang di-seed:

### **1. Edit Seed File**

Edit `prisma/seed.ts` sesuai kebutuhan:

```typescript
// Contoh: Ubah admin password
const admin1 = await prisma.user.create({
    data: {
        email: "admin@skh.sch.id",
        name: "admin",
        password: "password_baru_anda", // ← Ubah disini
        role: "admin",
    },
});
```

### **2. Run Seeder Lagi**

```bash
# Hapus data lama dulu
npx dotenv -e .env.vercel -- npx prisma migrate reset --skip-generate

# Atau langsung run seed (akan error jika data sudah ada)
npx dotenv -e .env.vercel -- npx prisma db seed
```

---

## 🔐 Security Best Practices

### ❌ JANGAN:
- ❌ Commit `.env.vercel` ke GitHub
- ❌ Share DATABASE_URL di public
- ❌ Pakai password default di production (ganti setelah seed)

### ✅ LAKUKAN:
- ✅ Ganti password admin/teacher setelah seed
- ✅ Simpan `.env.vercel` di local saja
- ✅ Add `.env.vercel` ke `.gitignore`

### Ganti Password Setelah Seeding:

```bash
# Via Prisma Studio
npx dotenv -e .env.vercel -- npx prisma studio

# Atau via aplikasi web:
# Login → Profile → Change Password
```

---

## 📖 Reference Commands

```bash
# Pull env vars dari Vercel
vercel env pull .env.vercel

# Run migration
npx dotenv -e .env.vercel -- npx prisma migrate deploy

# Run seed
npx dotenv -e .env.vercel -- npx prisma db seed

# Open Prisma Studio
npx dotenv -e .env.vercel -- npx prisma studio

# Reset database (⚠️ hapus semua data!)
npx dotenv -e .env.vercel -- npx prisma migrate reset

# Check migration status
npx dotenv -e .env.vercel -- npx prisma migrate status

# Generate Prisma Client
npx prisma generate
```

---

## ✅ Checklist After Seeding

- [ ] Migration berhasil dijalankan
- [ ] Seeder berhasil tanpa error
- [ ] Bisa login dengan akun admin (`admin` / `admin123`)
- [ ] Homepage menampilkan data (berita, galeri, teacher profiles)
- [ ] Stats di homepage muncul (150 siswa, 25 guru, etc.)
- [ ] Password admin sudah diganti (untuk security)

---

## 🎯 Quick Reference

**Seed Summary:**
- **2 Admin** (admin, kepsek)
- **6 Teachers** (budi, siti, andi, dewi, rudi, maya)
- **6 Teacher Profiles** untuk homepage
- **3 News Items**
- **3 Products**
- **6 Gallery Items**
- **Principal Info**
- **Site Stats**

**Default Passwords:**
- Admin: `admin123`, `kepsek123`
- Teachers: `guru123`

**⚠️ IMPORTANT:** Ganti password setelah seeding untuk security!

---

**Happy Seeding! 🌱**

Jika ada error, refer to troubleshooting section atau DEPLOY-VERCEL.md untuk panduan lebih detail.

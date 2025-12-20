# Environment Variables untuk Vercel - Panduan Lengkap

## 📋 Daftar Environment Variables yang Diperlukan

Saat deploy ke Vercel, Anda perlu mengisi environment variables berikut di **Vercel Dashboard → Project Settings → Environment Variables**:

---

## 1️⃣ DATABASE_URL (WAJIB)

**Fungsi**: Connection string ke database PostgreSQL

**Format untuk PostgreSQL (Vercel/Supabase/Railway)**:
```
postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME
```

### Contoh Berdasarkan Provider:

#### A. Vercel Postgres (Paling Mudah)
```
DATABASE_URL="postgres://default:AbC123XyZ@ep-cool-cloud-123456-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb"
```

**Cara dapat:**
1. Di Vercel dashboard, buka project Anda
2. Klik tab **Storage**
3. Klik **Create Database** → **Postgres**
4. Pilih region (pilih yang dekat, misal Singapore untuk Indonesia)
5. Copy connection string yang diberikan
6. Paste di environment variable `DATABASE_URL`

#### B. Supabase (Free Tier Bagus)
```
DATABASE_URL="postgresql://postgres.abcdefghijk:password123@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"
```

**Cara dapat:**
1. Daftar di [supabase.com](https://supabase.com)
2. Create New Project
3. Tunggu database siap (~2 menit)
4. Go to **Settings** → **Database**
5. Scroll ke **Connection String** → **Session Pooler** (recommended)
6. Copy connection string
7. Paste di environment variable `DATABASE_URL`

#### C. Railway.app
```
DATABASE_URL="postgresql://postgres:password@containers-us-west-123.railway.app:5432/railway"
```

**Cara dapat:**
1. Daftar di [railway.app](https://railway.app)
2. New Project → Deploy PostgreSQL
3. Klik database yang baru dibuat
4. Tab **Connect** → copy **Database URL**
5. Paste di environment variable `DATABASE_URL`

#### D. MySQL/MariaDB (jika masih pakai MySQL)
```
DATABASE_URL="mysql://username:password@host:3306/database_name"
```

**Contoh MySQL cPanel:**
```
DATABASE_URL="mysql://cpanel_user:MyP@ssw0rd!@server123.hostinger.com:3306/cpanel_dbname"
```

---

## 2️⃣ SESSION_SECRET (WAJIB)

**Fungsi**: Secret key untuk enkripsi session cookies

**Format**: String random minimal 32 karakter

**Contoh**:
```
SESSION_SECRET="your-super-secret-random-string-at-least-32-characters-long"
```

### Cara Generate SESSION_SECRET:

**Opsi 1: Manual (Random String)**
```
SESSION_SECRET="k8Jd9mN2pQ5rTvWx1Yz3AbCdEfGhIjKl4MnOpQ7rS9tU"
```

**Opsi 2: Via Terminal**
```bash
# Generate random string 32 karakter
openssl rand -base64 32
```
Outputnya misalnya:
```
wF3mK9pL2nQ5yT8vX1zR4cD7eG0hJ6iU3sA9bN1mK5oP=
```

**Opsi 3: Via Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Opsi 4: Via Website**
- Buka [randomkeygen.com](https://randomkeygen.com/)
- Copy salah satu dari "CodeIgniter Encryption Keys" atau "256-bit WPA Key"

**PENTING**: 
- ❌ JANGAN pakai contoh di atas secara langsung!
- ✅ Generate string random Anda sendiri
- ✅ Minimal 32 karakter
- ✅ Gunakan kombinasi huruf besar, kecil, angka

---

## 3️⃣ NODE_ENV (WAJIB)

**Fungsi**: Menentukan environment mode aplikasi

**Nilai**: 
```
NODE_ENV="production"
```

**Catatan**: Selalu set ke `production` untuk deployment Vercel

---

## 📝 Cara Mengisi di Vercel Dashboard

### Step-by-Step:

1. **Login ke Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Login dengan GitHub

2. **Buka Project Settings**
   - Pilih project Anda (`this_idonknow`)
   - Klik **Settings** (ikon gear)

3. **Tambah Environment Variables**
   - Scroll ke bagian **Environment Variables**
   - Untuk setiap variabel:

   **Variable 1: DATABASE_URL**
   - Key: `DATABASE_URL`
   - Value: `postgresql://username:password@host:5432/database`
   - Environment: ✅ Production, ✅ Preview, ✅ Development (check semua)
   - Klik **Save**

   **Variable 2: SESSION_SECRET**
   - Key: `SESSION_SECRET`
   - Value: `your-random-generated-secret-key`
   - Environment: ✅ Production, ✅ Preview, ✅ Development
   - Klik **Save**

   **Variable 3: NODE_ENV**
   - Key: `NODE_ENV`
   - Value: `production`
   - Environment: ✅ Production only
   - Klik **Save**

4. **Redeploy**
   - Setelah semua env vars di-set, klik **Deployments**
   - Klik titik tiga (...) di deployment terbaru
   - Klik **Redeploy**

---

## 🔍 Contoh Lengkap untuk Vercel

Jika menggunakan **Vercel Postgres + Random Secret**:

```env
DATABASE_URL="postgres://default:xK9mL3pQ7yT2vN8fR5sW1cD4eG6hJ0iA@ep-silent-morning-123456-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb"

SESSION_SECRET="f8K2mP5nQ9rT3vY7xZ1cB4dE6gH8jL0iM2oN4pQ6rS8uV1wX3yZ5aB7cD9eF0gH2"

NODE_ENV="production"
```

---

## 🔒 Keamanan

### ❌ JANGAN:
- ❌ Commit `.env` ke GitHub
- ❌ Share database credentials di public
- ❌ Pakai password yang mudah ditebak
- ❌ Pakai SESSION_SECRET yang sama dengan project lain

### ✅ LAKUKAN:
- ✅ Gunakan `.env.example` sebagai template (tanpa nilai asli)
- ✅ Generate SESSION_SECRET yang unik dan random
- ✅ Gunakan database password yang kuat
- ✅ Hanya set environment variables di Vercel dashboard

---

## 🛠️ Testing Environment Variables

Setelah set, verify dengan:

1. **Cek Build Logs**
   - Vercel Dashboard → Deployments → View Function Logs
   - Pastikan tidak ada error "DATABASE_URL is not defined"

2. **Test Koneksi Database**
   - Buka aplikasi di browser
   - Coba akses halaman yang butuh database
   - Jika sukses, berarti env vars sudah benar

3. **Check Server Logs**
   - Vercel Dashboard → Deployments → Function Logs
   - Lihat ada error atau tidak

---

## 🆘 Troubleshooting

### Error: "DATABASE_URL is not defined"
**Solusi**: 
1. Pastikan environment variable sudah di-set di Vercel
2. Pastikan environment dipilih (Production/Preview/Development)
3. Redeploy project

### Error: "Can't reach database server"
**Solusi**:
1. Cek format DATABASE_URL (harus valid connection string)
2. Cek database masih running
3. Untuk Supabase: pastikan pakai "Session Pooler" bukan "Direct"
4. Cek firewall database (allow connections from anywhere)

### Error: "Session secret is required"
**Solusi**:
1. Tambahkan SESSION_SECRET di environment variables
2. Pastikan minimal 32 karakter
3. Redeploy

---

## 📖 Reference Files

- `.env.example` - Template environment variables
- `DEPLOY-VERCEL.md` - Panduan deployment lengkap
- `README.md` - Quick start guide

---

## ✅ Checklist Sebelum Deploy

- [ ] DATABASE_URL sudah di-set dengan connection string yang valid
- [ ] SESSION_SECRET sudah di-generate (minimal 32 karakter)
- [ ] NODE_ENV di-set ke "production"
- [ ] Semua environment variables di-apply ke Production, Preview, Development
- [ ] Database sudah siap dan accessible
- [ ] Sudah redeploy setelah set env vars

---

**Selamat Deploy! 🚀**

Jika ada pertanyaan atau error, refer to `DEPLOY-VERCEL.md` untuk troubleshooting lebih detail.

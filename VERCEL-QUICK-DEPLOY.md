# 🚀 Quick Deploy ke Vercel - Panduan Lengkap

Panduan step-by-step untuk deploy aplikasi SKH Tamiang Layang ke Vercel dari nol.

---

## ✅ Checklist Pre-Deploy

- [x] Repository sudah di GitHub: `https://github.com/J4T3L/this_idonknow`
- [x] Code sudah di-push ke GitHub
- [x] `package.json` sudah ada `postinstall` script
- [ ] Sudah punya akun Vercel
- [ ] Database cloud sudah siap

---

## 📋 Step 1: Buat Akun Vercel (Jika Belum)

1. Buka [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Pilih **"Continue with GitHub"**
4. Authorize Vercel untuk akses GitHub Anda
5. ✅ Done! Anda akan masuk ke Vercel Dashboard

---

## 🔗 Step 2: Import Project dari GitHub

### **Via Vercel Dashboard (Recommended)**

1. **Di Vercel Dashboard**, click **"Add New"** → **"Project"**

2. **Import Git Repository:**
   - Pilih **"Import Git Repository"**
   - Cari repository: `this_idonknow`
   - Click **"Import"**

3. **Configure Project:**
   ```
   Project Name: this-idonknow (atau terserah)
   Framework Preset: Next.js (auto-detected ✓)
   Root Directory: ./
   Build Command: next build (default)
   Output Directory: .next (default)
   Install Command: npm install (default)
   ```
   
4. **JANGAN deploy dulu!** Click **"Environment Variables"** dulu

---

## 🗄️ Step 3: Setup Database Cloud

**PENTING:** Localhost tidak bisa dipakai di Vercel!

### **Opsi A: Vercel Postgres (PALING MUDAH) ⭐**

1. **Sebelum deploy**, di konfigurasi project tadi:
   - Scroll ke bawah
   - Atau skip deploy dulu, bisa setup di tab Storage nanti

2. **Setelah project dibuat:**
   - Buka project di dashboard
   - Click tab **"Storage"**
   - Click **"Create Database"**
   - Pilih **"Postgres"**
   - Region: **Singapore**
   - Click **"Create"**

3. **Copy Connection String:**
   Akan muncul seperti:
   ```
   postgres://default:AbC123XyZ@ep-silent-morning-123456-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb
   ```
   📋 **SAVE INI!** Ini DATABASE_URL Anda.

### **Opsi B: Supabase (Alternatif)**

1. Daftar di [supabase.com](https://supabase.com)
2. Create Project (tunggu 2 menit)
3. Settings → Database → Connection String (Session Pooler)
4. Copy connection string
5. 📋 **SAVE INI!** Ini DATABASE_URL Anda.

---

## 🔑 Step 4: Generate SESSION_SECRET

Di terminal komputer Anda:

```bash
openssl rand -base64 32
```

Output contoh:
```
k8Jd9mN2pQ5rTvWx1Yz3AbCdEfGhIjKl4MnOpQ7rS9tU=
```

📋 **COPY & SAVE!** Ini SESSION_SECRET Anda.

---

## ⚙️ Step 5: Set Environment Variables

### **Metode 1: Via Import File (Tercepat)**

1. **Buat file `.env.production` di komputer Anda:**

```bash
cd /home/thazz/project/skh
nano .env.production
```

2. **Isi dengan:**

```env
DATABASE_URL="postgres://default:xxx@ep-xxx.vercel-storage.com:5432/verceldb"
SESSION_SECRET="k8Jd9mN2pQ5rTvWx1Yz3AbCdEfGhIjKl4MnOpQ7rS9tU"
NODE_ENV="production"
```

Ganti dengan nilai yang benar!

3. **Import ke Vercel:**
   - Vercel Dashboard → Project Settings → **Environment Variables**
   - Click **"Add New"**
   - Pilih tab **"Plaintext"**
   - Copy **SELURUH** isi file `.env.production`
   - Paste ke textarea
   - Select environment: ☑️ Production, ☑️ Preview, ☑️ Development
   - Click **"Save"**

### **Metode 2: Manual Input**

Di **Project Settings → Environment Variables**, add satu per satu:

**Variable 1:**
- Key: `DATABASE_URL`
- Value: `postgres://default:xxx@...` (dari Step 3)
- Environment: Production + Preview + Development

**Variable 2:**
- Key: `SESSION_SECRET`
- Value: `k8Jd9mN2...` (dari Step 4)
- Environment: Production + Preview + Development

**Variable 3:**
- Key: `NODE_ENV`
- Value: `production`
- Environment: Production

---

## 🚀 Step 6: Deploy!

1. **Jika belum deploy:**
   - Click **"Deploy"**
   - Tunggu build (~2-3 menit)

2. **Jika sudah deploy (env vars baru ditambah):**
   - Tab **"Deployments"**
   - Click titik tiga (...) di deployment terakhir
   - Click **"Redeploy"**
   - Tunggu build selesai

3. **Check Build Logs:**
   - Pastikan tidak ada error
   - Look for: `✓ Compiled successfully`
   - Look for: `Running "prisma generate"` (auto dari postinstall)

4. **Get Deployment URL:**
   Akan dapat URL seperti:
   ```
   https://this-idonknow.vercel.app
   ```
   atau
   ```
   https://this-idonknow-xxx.vercel.app
   ```

---

## 🗃️ Step 7: Run Migration & Seed Database

Setelah deploy berhasil, setup database:

### **1. Install Vercel CLI**

```bash
npm install -g vercel
```

### **2. Login & Link Project**

```bash
vercel login
cd /home/thazz/project/skh
vercel link
```

Pilih project `this-idonknow` yang baru dibuat.

### **3. Pull Environment Variables**

```bash
vercel env pull .env.vercel
```

Ini download DATABASE_URL dari Vercel ke file `.env.vercel`

### **4. Run Migration**

```bash
# Install dotenv-cli
npm install -g dotenv-cli

# Run migration
npx dotenv -e .env.vercel -- npx prisma migrate deploy
```

Expected output:
```
✓ Applied migration(s)
```

### **5. Run Seed**

```bash
npx dotenv -e .env.vercel -- npx prisma db seed
```

Expected output:
```
✓ Created 2 admins and 6 teachers
✓ Created 6 teacher profiles
✓ Created 3 news items
✓ Created 3 products
✓ Created 6 gallery items
🎉 Database seeded successfully!
```

---

## ✅ Step 8: Verify & Test

### **1. Buka Website**

Buka URL deployment Anda:
```
https://this-idonknow.vercel.app
```

### **2. Test Login:**

- Click menu **Login**
- Username: `admin`
- Password: `admin123`

### **3. Check Homepage:**

Verify data muncul:
- ✅ Berita/News muncul
- ✅ Gallery muncul
- ✅ Teacher profiles muncul
- ✅ Stats muncul (150 siswa, 25 guru, etc)

### **4. Test Admin Panel:**

- Login sebagai admin
- Check CRUD functionality:
  - Tambah berita
  - Upload gambar
  - Manage products
  - etc.

---

## 🎉 Selesai!

Aplikasi Anda sekarang live di Vercel!

### **Yang Sudah Dilakukan:**

✅ Deploy aplikasi ke Vercel  
✅ Setup database cloud (Vercel Postgres/Supabase)  
✅ Set environment variables  
✅ Run database migration  
✅ Seed data awal  
✅ Website live dan accessible  

---

## 🔄 Update Aplikasi (Push Changes)

Setiap kali Anda push ke GitHub:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Vercel **auto-deploy** secara otomatis! 🚀

---

## 🆘 Troubleshooting

### Build Failed: "Prisma Client not generated"
✅ **Solved!** Ada `postinstall` script di package.json

### Error: "DATABASE_URL is not defined"
✅ Check Environment Variables di Vercel dashboard

### Error: "Can't reach database server"
✅ Check DATABASE_URL format benar
✅ Pastikan pakai Session Pooler (Supabase)
✅ Jangan pakai localhost!

### Homepage kosong (no data)
✅ Run migration & seed:
```bash
vercel env pull .env.vercel
npx dotenv -e .env.vercel -- npx prisma migrate deploy
npx dotenv -e .env.vercel -- npx prisma db seed
```

---

## 📚 Dokumentasi Lengkap

- **[DEPLOY-VERCEL.md](DEPLOY-VERCEL.md)** - Panduan deployment detail
- **[VERCEL-ENV-SETUP.md](VERCEL-ENV-SETUP.md)** - Setup environment variables
- **[VERCEL-DATABASE-SEEDING.md](VERCEL-DATABASE-SEEDING.md)** - Database seeding
- **[LOCALHOST-TO-CLOUD-DATABASE.md](LOCALHOST-TO-CLOUD-DATABASE.md)** - Migrate dari localhost

---

## 🔗 Quick Links

- **GitHub Repo**: https://github.com/J4T3L/this_idonknow
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel Docs**: https://vercel.com/docs

---

## 📝 Default Credentials (Setelah Seeding)

**Admin:**
- Username: `admin`
- Password: `admin123`

**Kepala Sekolah:**
- Username: `kepsek`
- Password: `kepsek123`

**Teachers:**
- Username: `budi`, `siti`, `andi`, `dewi`, `rudi`, `maya`
- Password: `guru123`

⚠️ **PENTING:** Ganti password setelah login pertama!

---

**Happy Deploying! 🚀**

# Cara Convert Panduan ke PDF/DOCX

## File Panduan Yang Tersedia:
1. `docs/PANDUAN_ADMIN.md` - Panduan Administrator
2. `docs/PANDUAN_GURU.md` - Panduan Guru

---

## Opsi 1: Online Converter (Termudah)

### Untuk Convert ke PDF:
1. Buka: https://www.markdowntopdf.com/
2. Upload file `PANDUAN_ADMIN.md` atau `PANDUAN_GURU.md`
3. Klik "Convert"
4. Download PDF

### Untuk Convert ke DOCX:
1. Buka: https://cloudconvert.com/md-to-docx
2. Upload file markdown
3. Klik "Convert"
4. Download DOCX

---

## Opsi 2: Menggunakan Pandoc (Terminal)

### Install Pandoc:
```bash
# Ubuntu/Debian
sudo apt-get install pandoc

# macOS
brew install pandoc
```

### Convert ke PDF:
```bash
# Ke PDF (perlu wkhtmltopdf atau LaTeX)
pandoc docs/PANDUAN_ADMIN.md -o PANDUAN_ADMIN.pdf

# Dengan styling lebih bagus
pandoc docs/PANDUAN_ADMIN.md -o PANDUAN_ADMIN.pdf --pdf-engine=wkhtmltopdf
```

### Convert ke DOCX:
```bash
# Ke DOCX
pandoc docs/PANDUAN_ADMIN.md -o PANDUAN_ADMIN.docx

# Untuk Panduan Guru
pandoc docs/PANDUAN_GURU.md -o PANDUAN_GURU.docx
```

---

## Opsi 3: Menggunakan Google Docs

1. Buka Google Docs
2. Import file markdown
3. File → Download → Microsoft Word (.docx) atau PDF

---

## Lokasi File:
- File markdown ada di folder: `docs/`
- Setelah convert, simpan PDF/DOCX di folder yang sama

---

**Note:** File tidak akan di-push ke GitHub, hanya tersimpan di lokal.

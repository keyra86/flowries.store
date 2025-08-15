# flowries.store

Static website untuk butik bunga ceria — **HTML + CSS + JavaScript** (tanpa framework), siap upload ke **GitHub Pages**.

## Fitur
- Slider **Produk Terlaris** (maks 5)
- **Keranjang belanja** + **Checkout button** (simulasi, tanpa backend)
- Alamat toko: **Svartbäcksgatan, Uppsala — Swedia**
- Form **Kritik & Saran** (tersimpan di `localStorage`)
- **Testimoni** pelanggan (CRUD sederhana via `localStorage`)
- Aksen warna: *pink soft* & *fresh freesia*
- Gambar contoh berbasis **SVG** ringan

## Struktur
```
flowries-store/
├─ index.html
├─ css/style.css
├─ js/script.js
└─ img/*.svg
```

## Deploy ke GitHub Pages
1. Buat repo baru bernama `flowries.store` atau sesuai kebutuhan.
2. Upload semua file/folder di direktori ini ke branch `main`.
3. Aktifkan **Settings → Pages**: Source = `Deploy from a branch` → Branch = `main` → `/root`.
4. Tunggu build selesai, lalu akses URL GitHub Pages-mu.

## Kustomisasi
- Data produk ada di `js/script.js` pada konstanta `PRODUCTS` (nama, harga, deskripsi, gambar).
- Style warna di `css/style.css` (variabel CSS `--pink-soft`, `--freesia`, dll).
- Logo & ilustrasi ada di folder `img/` (SVG).

---
Made with ♥ for **flowries.store**.

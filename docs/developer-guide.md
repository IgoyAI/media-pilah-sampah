# Panduan Pengembang

Dokumen ini berisi petunjuk bagi pengembang yang ingin memodifikasi atau mengembangkan game **Media Pilah Sampah 3R**.

## Struktur Proyek

```
media-pilah-sampah/
├── index.html      # Halaman utama permainan
├── style.css       # Gaya tampilan
├── script.js       # Logika permainan
└── docs/           # Dokumentasi proyek
```

## Menjalankan Secara Lokal

1. Kloning repositori ini.
2. Buka file `index.html` di peramban Anda.
3. Tidak diperlukan server atau dependensi tambahan.

## Menambah Level atau Item

- **script.js** menyimpan daftar level pada variabel `levels`.
- Setiap level berisi array item dengan properti `emoji`, `type`, dan `text`.
- Tambahkan level baru atau variasikan item dengan mengikuti format yang sama.

## Publikasi ke GitHub Pages

1. Pastikan folder `docs` berisi dokumentasi yang ingin ditampilkan.
2. Di halaman repo GitHub, buka **Settings > Pages**.
3. Pilih `main` branch dan folder `/docs` sebagai sumber.
4. Simpan pengaturan, GitHub Pages akan memuat konten dari folder tersebut.

## Kontribusi

Pull request dipersilakan. Pastikan kode terformat rapi dan dokumentasi diperbarui jika ada perubahan fungsionalitas.

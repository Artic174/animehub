# AnimeHub

Portal informasi anime terlengkap dengan berita terbaru, jadwal tayang, dan komunitas otaku Indonesia.

![AnimeHub Screenshot](https://via.placeholder.com/800x400/1a1a2e/ffffff?text=AnimeHub+Screenshot)

## 🚀 Fitur

- **🏠 Beranda**: Menampilkan anime populer dan terbaru dari API
- **📅 Halaman Jadwal**: Tampilkan jadwal rilis anime per hari (Senin–Minggu)
- **📖 Detail Anime**: Sinopsis, trailer, genre, rating, studio, dll.
- **📰 Berita Anime**: Admin bisa unggah berita harian (judul, isi, gambar)
- **💬 Komentar / Forum**: Pengguna bisa komentar di halaman anime
- **🔍 Pencarian**: Cari anime berdasarkan nama
- **🔐 Login Admin**: Sederhana (gunakan session atau token)
- **🌙 Tema Gelap (dark mode)** default

## 🛠️ Teknologi

- **Backend**: Node.js + Express.js (ESM)
- **Frontend**: HTML + CSS + Bootstrap 5
- **Database**: SQLite
- **API**: Jikan API (MyAnimeList)
- **Template Engine**: EJS

## 📁 Struktur Folder

```
AnimeHub/
├── controllers/         # Controller untuk logika bisnis
├── routes/             # Route definitions
├── views/              # Template EJS
│   ├── home/
│   ├── anime/
│   ├── news/
│   └── admin/
├── public/             # Static files
│   ├── css/
│   ├── js/
│   └── uploads/
├── config/             # Konfigurasi database dan API
├── models/             # Model database
├── data/               # File database SQLite
├── app.js              # Main application file
└── package.json
```

## 🚀 Instalasi & Menjalankan

### Prerequisites

- Node.js (v16 atau lebih baru)
- npm atau yarn

### Langkah Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/YuzakiNetwork/AnimeHub.git
   cd AnimeHub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan aplikasi**
   ```bash
   npm start
   ```

4. **Buka browser**
   ```
   http://localhost:3000
   ```

### Login Admin

- **Username**: `admin`
- **Password**: `password`

## 🌐 API yang Digunakan

- **Jikan API**: https://jikan.moe/
  - Anime populer
  - Anime musim ini
  - Detail anime
  - Jadwal anime

## 📱 Fitur Responsif

Website ini dioptimalkan untuk:
- 💻 Desktop
- 📱 Mobile
- 📟 Tablet

## 🎨 Tema

- **Default**: Dark Mode
- **Toggle**: Light/Dark mode tersedia
- **Warna**: Tema biru dengan aksen kuning

## 🔧 Konfigurasi

### Environment Variables

Buat file `.env` (opsional):
```env
PORT=3000
NODE_ENV=development
```

### Database

Database SQLite akan dibuat otomatis di `data/animehub.db` saat pertama kali menjalankan aplikasi.

## 📝 Penggunaan

### Untuk User
1. Buka halaman beranda untuk melihat anime populer
2. Gunakan fitur pencarian untuk mencari anime
3. Lihat jadwal anime di halaman jadwal
4. Baca berita terbaru di halaman berita
5. Komentar di halaman detail anime

### Untuk Admin
1. Login di `/admin/login`
2. Akses dashboard admin
3. Buat berita baru
4. Upload gambar untuk berita
5. Edit atau hapus berita yang ada

## 🚀 Deployment

### Vercel (Frontend + Backend)
```bash
npm install -g vercel
vercel
```

### Railway (Backend)
1. Connect repository ke Railway
2. Set environment variables
3. Deploy otomatis

### Render (Backend)
1. Connect repository ke Render
2. Set build command: `npm install`
3. Set start command: `npm start`

## 🤝 Kontribusi

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m \'Add some AmazingFeature\'`) 
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Developer

- **YuzakiNetwork** - *Initial work* - [YuzakiNetwork](https://github.com/YuzakiNetwork)

## 🙏 Acknowledgments

- [Jikan API](https://jikan.moe/) untuk data anime
- [Bootstrap](https://getbootstrap.com/) untuk UI framework
- [Bootstrap Icons](https://icons.getbootstrap.com/) untuk icons
- [Express.js](https://expressjs.com/) untuk web framework

## 📞 Support

Jika Anda mengalami masalah atau memiliki pertanyaan:

- 📧 Email: support@animehub.com
- 🐛 Issues: [GitHub Issues](https://github.com/YuzakiNetwork/AnimeHub/issues)
- 💬 Discord: [Join our Discord](https://discord.gg/animehub)

---

⭐ **Jangan lupa berikan star jika project ini membantu Anda!** ⭐


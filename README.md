# Pendaftaran Anggota HIMATIF - Frontend ✨

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Selamat datang di antarmuka frontend untuk Aplikasi Pendaftaran Anggota Baru HIMATIF! Dibangun dengan **HTML, Tailwind CSS, dan JavaScript murni**, aplikasi ini dirancang untuk memberikan pengalaman pengguna yang modern, responsif, dan intuitif.

**Live Demo:** [https://syalwa.github.io/pendaftaran-frontend/](https://syalwa.github.io/pendaftaran-frontend/) *(Catatan: Backend harus aktif agar semua fungsionalitas berjalan).*

---

## 🚀 Fitur Utama

-   **Desain Modern & Responsif**: Tampilan premium dengan *dark mode*, gradien, dan animasi halus yang beradaptasi sempurna di semua perangkat.
-   **Alur Pengguna Lengkap**: Mulai dari halaman *landing*, registrasi, login, hingga dashboard personal untuk pengguna dan admin.
-   **Dashboard Pengguna Interaktif**: Pengguna dapat melihat status pendaftaran, jadwal wawancara, dan pengumuman terbaru secara *real-time*.
-   **Dashboard Admin Fungsional**: Admin dapat dengan mudah memfilter, mencari, mengelola pendaftar, memperbarui status secara massal, dan mengelola konten informasi.
-   **Notifikasi Elegan**: Menggunakan **SweetAlert2** untuk memberikan *feedback* yang informatif dan menarik kepada pengguna.
-   **Manajemen Sesi**: Otentikasi di sisi klien menggunakan token Paseto untuk menjaga keamanan sesi dan melindungi halaman.

---

## 🖼️ Tampilan

| Halaman Login | Dashboard Pengguna | Dashboard Admin |
| :-----------: | :----------------: | :-------------: |
|   ** |     ** |   ** |

---

## 🛠️ Cara Menjalankan Secara Lokal

Antarmuka ini membutuhkan layanan backend untuk dapat berfungsi sepenuhnya. Pastikan [**Backend Pendaftaran HIMATIF**](https://github.com/syalwa/pendaftaran-backend) sudah berjalan terlebih dahulu.

1.  **Clone repository ini:**
    ```bash
    git clone [https://github.com/syalwa/pendaftaran-frontend.git](https://github.com/syalwa/pendaftaran-frontend.git)
    cd pendaftaran-frontend
    ```

2.  **Jalankan dengan Live Server:**
    Cara termudah untuk menjalankan frontend ini adalah menggunakan ekstensi **Live Server** di Visual Studio Code.
    -   Instal ekstensi [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
    -   Klik kanan pada file `index.html` dan pilih **"Open with Live Server"**.
    -   Aplikasi akan terbuka di browser Anda, biasanya di `http://127.0.0.1:5500`.

---

## 🧩 Ketergantungan Eksternal (via CDN)

-   **Tailwind CSS**: Untuk *utility-first styling* yang cepat dan modern.
-   **Font Awesome**: Untuk ikonografi yang kaya dan konsisten.
-   **SweetAlert2**: Untuk notifikasi *pop-up* yang indah dan responsif.
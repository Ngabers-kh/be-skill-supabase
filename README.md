# SkillLearn - Backend API

SkillLearn adalah platform pembelajaran berbasis web yang dirancang untuk membantu pengguna mengembangkan keterampilan mereka melalui sistem board learning, kursus, dan interaksi berbasis proyek.  
Proyek ini menggunakan **Express.js** sebagai backend framework dan terintegrasi dengan **Supabase** sebagai database utama.

---

## Tech Stack

**Backend:**
- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/)
- [Supabase](https://supabase.com/)
- [JWT](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt) 

---

## Struktur Proyek

```

SkillLearn/
│
├── src/
│   ├── config/
│   │   └── db.js              # Koneksi ke Supabase
│   ├── controllers/           # Logika utama tiap endpoint
│   ├── models/                # Query & interaksi dengan database
│   ├── routes/                # Routing API
│   ├── middlewares/           # Middleware (auth, error handler, dll)
│   └── app.js                 # Inisialisasi Express
│
├── .env                       # Konfigurasi environment
├── package.json
└── README.md

````

---

## Instalasi & Konfigurasi

### Clone Repositori
```bash
git clone https://github.com/username/skillearn-backend.git
cd skillearn-backend
````

### Install Dependencies

```bash
npm install
```

### 4️⃣ Jalankan Server

Untuk mode development:

```bash
npm run dev
```

Atau mode production:

```bash
npm start
```

Server akan berjalan di:

```
http://localhost:5000
```

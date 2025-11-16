# 🚀 UMKM-i


## 🔗 Live Demo  
➡️ *https://umkm-app-phi.vercel.app/*

---

## ✨ Fitur Utama

### 1. 💨 Performa & Pemuatan
- Splash Screen "No-JS" animasi 3 titik (CSS murni).
- Halaman transisi halus (Framer Motion).
- Scroll reveal animasi fade-in + slide-up.

### 2. 📱 Navigasi & UX
- Navbar berubah dari transparan → solid.
- Search bar pintar (random suggestion, live result, keyboard nav).
- Dropdown modern (desktop & mobile).
- Tombol “Back to Top” dengan smooth scrolling.

### 3. 🖥️ Halaman Utama
- Hero CTA dengan animasi panah.
- Carousel autoplay + swipe + blur background.
- Grid kartu simetris (h-full).

### 4. ℹ️ Halaman Detail Item (Dinamis)
- Routing dinamis (/food/... /drink/... /service/...).
- Layout mobile-first dan desktop.
- Tab animasi (Framer Motion layoutId).
- Lightbox modal galeri.
- Tombol Bagikan (Web Share API) & Hubungi (WhatsApp).

---

## 🛠️ Tech Stack

- Vite  
- React 18  
- TypeScript  
- Tailwind CSS  
- React Router DOM  
- Framer Motion  
- React Scroll  
- React Icons  
- React Intersection Observer  

---

## 📂 Struktur Folder

/public  
 ├── /Makanan, /Jasa, /Minuman  
 └── hero-bg.jpg  

/src  
 ├── /assets  
 │   └── /images  
 ├── /components  
 │   ├── /layout  
 │   │   ├── Navbar.tsx  
 │   │   └── ScrollToTopButton.tsx  
 │   └── FadeInOnScroll.tsx  
 ├── /data  
 │   ├── foodData.ts  
 │   ├── drinkData.ts  
 │   └── serviceData.ts  
 ├── /pages  
 │   ├── /details  
 │   │   └── ItemDetailsPage.tsx  
 │   └── /home  
 │       ├── HomePage.tsx  
 │       ├── HeroSection.tsx  
 │       ├── DisplaySection.tsx  
 │       ├── InfoSection.tsx  
 │       ├── FoodSection.tsx  
 │       ├── DrinkSection.tsx  
 │       └── ServiceSection.tsx  
 ├── App.tsx  
 ├── AnimatedRoutes.tsx  
 ├── main.tsx  
 ├── index.css  
 └── index.html  

---

## ⚙️ Cara Menjalankan Secara Lokal

### 1️⃣ Clone repository  
git clone https://github.com/farhnsndlr/umkm-app.git  
cd umkm-app

### 2️⃣ Install dependencies  
npm install

### 3️⃣ Jalankan development server  
npm run dev

Buka: http://localhost:5173

---

## 📄 Lisensi  
Tim BuBaDiBaKo - MIA 2025
(Ernilla Syahfaliza, T. Farhan Sultan Nadlir E.Q, Abib Yolian)

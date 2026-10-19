# Excelish LMS (React + Supabase + Vercel)

Aplikasi Learning Management System (LMS) sederhana yang dirancang untuk kemudahan pengembangan dan deployment. Menggunakan React untuk antarmuka dan Supabase sebagai Backend-as-a-Service (BaaS).

## Fitur Utama
- **Landing Page** - Halaman publik untuk menarik pengguna baru.
- **Autentikasi** - Login & Register menggunakan Supabase Auth.
- **Dashboard** - Ringkasan progres belajar dan rekomendasi tugas berdasarkan urgensi.
- **Modul Pembelajaran** - Daftar modul statis/dinamis.
- **Tambah Tugas** - Form untuk membuat aktivitas baru (judul, tanggal, estimasi durasi).
- **Atur Tugas** - Tabel tugas dengan aksi *Selesai*, *Snooze*, dan *Reschedule*.

## Tech Stack
- **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) (TypeScript)
- **Styling:** Tailwind CSS + [shadcn/ui](https://ui.shadcn.com/)
- **Backend & Auth:** [Supabase](https://supabase.com/) (PostgreSQL Database & Authentication)
- **Routing:** React Router DOM
- **Deployment:** [Vercel](https://vercel.com/)

## Prasyarat
- Node.js 20.19 atau lebih baru
- Akun [Supabase](https://supabase.com/) (Gratis)
- Akun Vercel (untuk deployment)

## Pengembangan Lokal

### 1. Clone Repositori & Install Dependensi
```bash
git clone https://github.com/username/excelish-lms.git
cd excelish-lms
npm install
2. Setup Supabase (Database & Auth)
Buat project baru di Supabase Dashboard.

Buka menu SQL Editor, lalu jalankan query berikut untuk membuat tabel tasks dan mengatur keamanannya (RLS):

sql
-- Buat tabel tasks
create table public.tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  due_date timestamp with time zone,
  score integer default 0,
  status text default 'Pending',
  duration integer,
  user_id uuid references auth.users(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Aktifkan Row Level Security (RLS)
alter table public.tasks enable row level security;

-- Buat kebijakan (Policy) agar user hanya bisa melihat dan mengubah tugasnya sendiri
create policy "Users can view their own tasks" on public.tasks for select using (auth.uid() = user_id);
create policy "Users can insert their own tasks" on public.tasks for insert with check (auth.uid() = user_id);
create policy "Users can update their own tasks" on public.tasks for update using (auth.uid() = user_id);
create policy "Users can delete their own tasks" on public.tasks for delete using (auth.uid() = user_id);
3. Setup Environment Variables
Buka menu Project Settings -> API di Supabase.

Salin Project URL dan anon public key.

Buat file .env.local di root folder project Anda dan isi seperti ini:

env
VITE_SUPABASE_URL="https://[PROJECT-REF].supabase.co"
VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
4. Jalankan Server Pengembangan
bash
npm run dev
Buka http://localhost:5173 di browser Anda.

Cara Kerja Integrasi Supabase (Panduan Singkat)
Karena tidak menggunakan backend terpisah, React akan berkomunikasi langsung dengan Supabase. Berikut contoh implementasinya:

1. Inisialisasi Supabase Client (src/lib/supabase.ts)

typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
2. Register & Login (Supabase Auth)

typescript
// Register
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
})

// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
})
3. Menambah & Mengambil Tugas (Database)

typescript
// Menambah Tugas
await supabase.from('tasks').insert({
  title: 'Belajar React',
  due_date: new Date().toISOString(),
  duration: 2,
  user_id: (await supabase.auth.getUser()).data.user?.id
})

// Mengambil Tugas
const { data: tasks } = await supabase.from('tasks').select('*')
Deployment ke Vercel
Push kode Anda ke repository GitHub.

Buka Vercel Dashboard dan klik Add New Project.

Import repository excelish-lms Anda.

Pada bagian Environment Variables, tambahkan:

VITE_SUPABASE_URL

VITE_SUPABASE_ANON_KEY

Klik Deploy. Vercel akan otomatis mendeteksi Vite dan melakukan build.

Struktur Project (Ringkasan)
text
src/
├── components/       # Komponen UI (Navbar, TaskForm, dll)
│   └── ui/           # Komponen shadcn/ui (Button, Input, Card)
├── pages/            # Halaman aplikasi (menggunakan React Router)
│   ├── Home.tsx      # Landing Page
│   ├── Login.tsx     # Halaman Login
│   ├── Register.tsx  # Halaman Register
│   └── Dashboard.tsx # Halaman Utama LMS
├── lib/ 
│   └── supabase.ts   # Inisialisasi Supabase Client
├── App.tsx           # Setup Routing
└── main.tsx          # Entry point React
Biaya
Pengembangan Lokal: Gratis.

Supabase Free Tier: Gratis dengan batas 500MB Database, 50.000 Monthly Active Users, dan 1GB Storage. Sangat cukup untuk project skala kecil/menengah.

Vercel Hobby Plan: Gratis untuk project personal.

Untuk skala produksi yang lebih besar, Anda dapat melakukan upgrade paket pada Supabase dan Vercel.

text

### 💡 Kenapa Pendekatan Ini Jauh Lebih Mudah?
1. **Tanpa Backend:** Anda tidak perlu lagi membuat API Routes atau *Server Actions*. React bisa langsung menyimpan data ke Supabase.
2. **Tanpa ORM:** Anda tidak perlu mengurus file `schema.prisma` atau menjalankan migrasi database. Cukup jalankan query SQL di Dashboard Supabase.
3. **Autentikasi Instan:** Supabase sudah menyediakan sistem Login/Register. Anda hanya perlu memanggil fungsi `supabase.auth.signIn()`.

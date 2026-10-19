import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { buttonClass } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Tone } from '@/lib/urgency'

const sample: { title: string; label: string; tone: Tone }[] = [
  { title: 'Kumpulkan laporan praktikum', label: 'Terlambat 1 hari', tone: 'late' },
  { title: 'Selesaikan kuis bab 3', label: 'Hari ini', tone: 'today' },
  { title: 'Siapkan presentasi kelompok', label: '3 hari lagi', tone: 'soon' },
  { title: 'Baca materi pertemuan berikutnya', label: '6 hari lagi', tone: 'later' },
]

const points = [
  { title: 'Tugas diurutkan menurut tenggat', text: 'Yang paling mendesak selalu tampil paling atas di Dashboard.' },
  { title: 'Tunda atau jadwalkan ulang', text: 'Rencana berubah? Geser tenggat satu klik tanpa menghapus tugas.' },
  { title: 'Progres terlihat jelas', text: 'Setiap tugas selesai menambah poin dan persentase progres Anda.' },
]

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
      <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Belajar lebih terarah, tugas tidak menumpuk.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted">
            Excelish membantu Anda mengikuti modul dan mengatur tugas berdasarkan tenggat, sehingga Anda tahu apa yang harus dikerjakan sekarang.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/register" className={buttonClass({ size: 'lg' })}>Mulai belajar gratis</Link>
            <Link to="/login" className={buttonClass({ variant: 'outline', size: 'lg' })}>Saya sudah punya akun</Link>
          </div>
        </div>

        <Card aria-label="Contoh daftar prioritas">
          <CardHeader><CardTitle>Prioritas Anda</CardTitle></CardHeader>
          <CardContent className="p-0">
            <ul>
              {sample.map((s) => (
                <li key={s.title} className="flex items-center justify-between gap-3 border-b border-line px-5 py-4 last:border-0">
                  <span className="font-medium">{s.title}</span>
                  <Badge tone={s.tone}>{s.label}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mt-20 grid gap-8 border-t border-line pt-12 md:grid-cols-3">
        {points.map((p) => (
          <div key={p.title}>
            <h2 className="font-bold">{p.title}</h2>
            <p className="mt-2 text-muted">{p.text}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
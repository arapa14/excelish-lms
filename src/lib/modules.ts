export interface LearningModule {
  id: string
  title: string
  summary: string
  level: 'Pemula' | 'Menengah'
  lessons: number
  hours: number
}

export const modules: LearningModule[] = [
  { id: 'm1', title: 'Dasar-dasar Excel', summary: 'Sel, rumus dasar, format angka, dan cara menyusun tabel yang rapi.', level: 'Pemula', lessons: 8, hours: 3 },
  { id: 'm2', title: 'Rumus & Fungsi Logika', summary: 'IF, AND, OR, serta kombinasinya untuk keputusan otomatis.', level: 'Pemula', lessons: 6, hours: 2 },
  { id: 'm3', title: 'Lookup & Referensi Data', summary: 'VLOOKUP, XLOOKUP, INDEX-MATCH untuk mencari data lintas tabel.', level: 'Menengah', lessons: 7, hours: 3 },
  { id: 'm4', title: 'PivotTable & Ringkasan', summary: 'Merangkum ribuan baris data menjadi laporan dalam hitungan menit.', level: 'Menengah', lessons: 6, hours: 4 },
  { id: 'm5', title: 'Grafik & Dashboard', summary: 'Memilih jenis grafik yang tepat dan merangkainya menjadi dashboard.', level: 'Menengah', lessons: 5, hours: 3 },
]

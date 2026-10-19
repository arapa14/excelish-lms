import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Field, Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'

export default function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const isLogin = mode === 'login'
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    setInfo(null)

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message === 'Invalid login credentials' ? 'Email atau kata sandi salah.' : error.message)
      else navigate('/dashboard')
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      else if (data.session) navigate('/dashboard')
      else setInfo('Akun dibuat. Cek email Anda untuk konfirmasi, lalu masuk.')
    }
    setBusy(false)
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <Card>
        <CardContent className="space-y-6 p-8">
          <div>
            <h1 className="text-2xl font-extrabold">{isLogin ? 'Masuk ke Excelish' : 'Buat akun Excelish'}</h1>
            <p className="mt-1 text-sm text-muted">
              {isLogin ? 'Lanjutkan progres belajar Anda.' : 'Gratis, tanpa kartu kredit.'}
            </p>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <Field label="Email">
              <Input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </Field>
            <Field label="Kata sandi">
              <Input
                type="password"
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                minLength={6}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
            {error && <p role="alert" className="rounded-md bg-danger-soft px-3 py-2 text-sm text-danger">{error}</p>}
            {info && <p role="status" className="rounded-md bg-brand-soft px-3 py-2 text-sm text-brand-dark">{info}</p>}
            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? 'Memproses…' : isLogin ? 'Masuk' : 'Daftar'}
            </Button>
          </form>
          <p className="text-center text-sm text-muted">
            {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
            <Link to={isLogin ? '/register' : '/login'} className="font-semibold text-brand underline">
              {isLogin ? 'Daftar' : 'Masuk'}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

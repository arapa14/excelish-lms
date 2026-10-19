import { Link, NavLink, useNavigate } from 'react-router-dom'
import { BookOpenCheck } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Button, buttonClass } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLink = ({ isActive }: { isActive: boolean }) =>
  cn('rounded-md px-3 py-2 text-sm font-medium hover:bg-surface', isActive && 'bg-brand-soft text-brand-dark')

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-extrabold">
          <BookOpenCheck className="h-6 w-6 text-brand" aria-hidden /> Excelish
        </Link>

        {user ? (
          <nav className="flex items-center gap-1">
            <NavLink to="/dashboard" className={navLink}>Dashboard</NavLink>
            <NavLink to="/modul" className={navLink}>Modul</NavLink>
            <NavLink to="/tugas" className={navLink}>Tugas</NavLink>
            <Button
              variant="outline"
              size="sm"
              className="ml-2"
              onClick={async () => {
                await signOut()
                navigate('/')
              }}
            >
              Keluar
            </Button>
          </nav>
        ) : (
          <nav className="flex items-center gap-2">
            <Link to="/login" className={buttonClass({ variant: 'ghost', size: 'sm' })}>Masuk</Link>
            <Link to="/register" className={buttonClass({ size: 'sm' })}>Daftar gratis</Link>
          </nav>
        )}
      </div>
    </header>
  )
}

import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="border-b border-neutral-800/80 sticky top-0 bg-neutral-950/70 backdrop-blur z-50">
      <div className="container-base flex items-center gap-6 h-16">
        <Link to="/" className="font-semibold text-lg">Lapidatto<span className="text-emerald-400">Bot</span></Link>
        <nav className="ml-auto flex items-center gap-4 text-sm">
          <NavLink to="/" className={({isActive}) => (isActive ? 'text-emerald-400' : 'text-neutral-300 hover:text-white')}>Início</NavLink>
          <NavLink to="/pricing" className={({isActive}) => (isActive ? 'text-emerald-400' : 'text-neutral-300 hover:text-white')}>Planos</NavLink>
          <NavLink to="/dashboard" className={({isActive}) => (isActive ? 'text-emerald-400' : 'text-neutral-300 hover:text-white')}>Painel</NavLink>
          <NavLink to="/login" className={({isActive}) => (isActive ? 'text-emerald-400' : 'text-neutral-300 hover:text-white')}>Entrar</NavLink>
        </nav>
      </div>
    </header>
  )
}

import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const nav = useNavigate()
  const location = useLocation()
  const from = (location.state as any)?.from?.pathname || '/dashboard'

  function submit(e: React.FormEvent) {
    e.preventDefault()
    // Mock auth
    localStorage.setItem('auth', '1')
    nav(from, { replace: true })
  }

  return (
    <section className="container-base py-16 max-w-md">
      <div className="card p-6">
        <h2 className="text-2xl font-semibold">Entrar</h2>
        <form onSubmit={submit} className="mt-6 grid gap-3">
          <div>
            <label className="label">E-mail</label>
            <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="label">Senha</label>
            <input className="input" type="password" value={pwd} onChange={e => setPwd(e.target.value)} />
          </div>
          <button className="btn btn-primary mt-2">Acessar</button>
          <p className="text-sm text-neutral-400">
            *Este é um login fictício para o MVP (salva um flag no localStorage).
          </p>
        </form>
      </div>
    </section>
  )
}

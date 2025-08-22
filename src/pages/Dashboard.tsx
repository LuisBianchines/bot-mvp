import { useNavigate } from 'react-router-dom'
import MenuEditor from '@/components/MenuEditor'

export default function Dashboard() {
  const nav = useNavigate()

  function logout() {
    localStorage.removeItem('auth')
    nav('/')
  }

  return (
    <section className="container-base py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Painel</h2>
        <div className="flex gap-2">
          <button className="btn btn-ghost" onClick={() => alert('Em breve: métricas, integrações e deploy.')}>Roadmap</button>
          <button className="btn btn-primary" onClick={logout}>Sair</button>
        </div>
      </div>

      <div className="grid gap-6">
        <MenuEditor />

        <section className="card p-6">
          <h3 className="text-lg font-semibold mb-2">Deploy (conceito)</h3>
          <ol className="list-decimal pl-5 space-y-2 text-neutral-300">
            <li>Exporte o JSON e suba via API para seu banco (tabelas <code>menu_opcoes</code> e <code>respostas_opcoes</code>).</li>
            <li>Garanta que seu fluxo n8n está lendo essas tabelas (como no seu protótipo).</li>
            <li>Na Meta, aponte o webhook para seu endpoint n8n.</li>
          </ol>
        </section>
      </div>
    </section>
  )
}

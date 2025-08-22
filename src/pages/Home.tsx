import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="container-base py-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Chatbot de WhatsApp <span className="text-emerald-400">personalizável</span> em minutos.
          </h1>
          <p className="text-neutral-300 mt-4 text-lg">
            Publique menus e respostas pelo painel, sem tocar no fluxo do n8n. Integração nativa com a API oficial da Meta.
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/pricing" className="btn btn-primary">Ver planos</Link>
            <Link to="/dashboard" className="btn btn-ghost">Abrir painel</Link>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-4 text-sm text-neutral-300">
            <li className="card p-4">🧰 <b>Pronto para uso</b>: você só cadastra os textos.</li>
            <li className="card p-4">🧩 <b>Extensível</b>: webhooks e integrações (CRM, Sheets, etc.).</li>
            <li className="card p-4">📈 <b>Métricas</b>: opções mais escolhidas, volume diário.</li>
            <li className="card p-4">🔒 <b>Oficial</b>: API WhatsApp Business da Meta.</li>
          </ul>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-semibold">Como funciona</h3>
          <ol className="mt-4 space-y-3 text-neutral-300">
            <li>1. Cliente escolhe um plano e cria conta.</li>
            <li>2. No painel, cadastra opções do menu e respostas.</li>
            <li>3. O n8n lê direto do banco e responde no WhatsApp.</li>
          </ol>
          <div className="mt-6 p-4 rounded-xl bg-neutral-900 border border-neutral-800">
            <code className="text-sm">
              Buscar Menu + Respostas → Cachear Opções → Validar Opções → Switch → Montar Mensagem → Enviar Mensagem
            </code>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useMemo, useState } from 'react'
import type { Opcao, DadosMenus } from '@/lib/types'
import { load, save, clear, exportJSON, importJSON } from '@/lib/storage'

function uid() { return Math.random().toString(36).slice(2) }

function cleanLabel(s: string) {
  return String(s).replace(/^\s*\d+\s*[-–—.]?\s*/u, '').trim()
}

function montarMensagemMenu(opcoes: Opcao[]) {
  const linhas = opcoes.map(o => `${o.ordem} – ${cleanLabel(o.texto)}`)
  return [
    '*Bem-vindo ao ChatBot Lapidatto!* 👋',
    '',
    '*Digite a opção desejada:*',
    ...linhas,
    '',
    'Para voltar a este menu, digite:',
    '*#menu*'
  ].join('\n')
}

function montarMensagemOpcao(opcoes: Opcao[], entrada: string) {
  const mapa: Record<string, string> = {}
  for (const o of opcoes) mapa[String(o.ordem)] = o.resposta ?? ''
  const bruto = String(mapa[entrada] ?? '')
  return bruto.replace(/\\n/g, '\n').replace(/\\t/g, '\t')
}

export default function MenuEditor() {
  const [data, setData] = useState<DadosMenus>(() => load())
  const [form, setForm] = useState<Opcao>({
    id: '',
    ordem: 1,
    texto: '',
    resposta: '',
    tipo_menu: 'principal',
    ativo: true,
  })
  const [previewEntrada, setPreviewEntrada] = useState('')
  const previewMenu = useMemo(() => montarMensagemMenu(data.opcoes), [data.opcoes])
  const previewResposta = useMemo(() => {
    const msg = (previewEntrada.trim() === '#menu')
      ? previewMenu
      : (/^\d+$/.test(previewEntrada.trim()) ? montarMensagemOpcao(data.opcoes, previewEntrada.trim()) : '')
    if (!msg) {
      // opção inválida
      const linhas = data.opcoes.map(o => `${o.ordem} – ${cleanLabel(o.texto)}`)
      return [
        '*Opção inválida. Tente novamente.*',
        '',
        '*Digite a opção desejada:*',
        ...linhas,
        '',
        'Para voltar a este menu, digite:',
        '*#menu*'
      ].join('\n')
    }
    return msg
  }, [previewEntrada, data.opcoes, previewMenu])

  useEffect(() => {
    save(data)
  }, [data])

  function resetForm() {
    setForm({ id: '', ordem: 1, texto: '', resposta: '', tipo_menu: 'principal', ativo: true })
  }

  function add() {
    if (!form.texto.trim()) return alert('Informe o texto da opção.')
    const novo: Opcao = { ...form, id: uid(), ordem: Number(form.ordem) || 1 }
    setData(d => ({ opcoes: [...d.opcoes, novo].sort((a,b) => a.ordem - b.ordem) }))
    resetForm()
  }

  function update(id: string, patch: Partial<Opcao>) {
    setData(d => ({
      opcoes: d.opcoes.map(o => o.id === id ? { ...o, ...patch } : o).sort((a,b) => a.ordem - b.ordem)
    }))
  }

  function remove(id: string) {
    setData(d => ({ opcoes: d.opcoes.filter(o => o.id !== id) }))
  }

  function handleExport() {
    const obj = exportJSON(data)
    const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'menus_export.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const obj = JSON.parse(String(reader.result))
        const d = importJSON(obj)
        setData(d)
      } catch (e) {
        alert('JSON inválido.')
      }
    }
    reader.readAsText(file)
  }

  function seedDemo() {
    const demo: DadosMenus = {
      opcoes: [
        { id: uid(), ordem: 1, texto: '1 – Ver produtos', resposta: 'Temos *camisetas* e *bonés*.\nDigite 2 para falar com atendente.', tipo_menu: 'principal', ativo: true },
        { id: uid(), ordem: 2, texto: '2 – Falar com atendente', resposta: 'Nosso time vai te chamar em instantes. Obrigado!', tipo_menu: 'principal', ativo: true },
        { id: uid(), ordem: 3, texto: '3 – Status do pedido', resposta: 'Informe seu número de pedido aqui neste formato: *#12345*', tipo_menu: 'principal', ativo: true },
        { id: uid(), ordem: 4, texto: '4 – Sair', resposta: 'Conversa encerrada. Quando quiser voltar, digite *#menu*.', tipo_menu: 'principal', ativo: true }
      ]
    }
    setData(demo)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <section className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Opções do Menu</h3>
          <div className="flex gap-2">
            <button className="btn btn-ghost" onClick={seedDemo}>Carregar demo</button>
            <button className="btn btn-ghost" onClick={() => { clear(); setData({ opcoes: [] }) }}>Limpar</button>
            <button className="btn btn-primary" onClick={handleExport}>Exportar JSON</button>
            <label className="btn btn-ghost cursor-pointer">
              Importar JSON
              <input type="file" accept="application/json" className="hidden" onChange={handleImport} />
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-3">
          <div>
            <label className="label">Ordem</label>
            <input className="input" type="number" min={1} value={form.ordem} onChange={e => setForm(f => ({ ...f, ordem: Number(e.target.value) }))} />
          </div>
          <div className="md:col-span-3">
            <label className="label">Texto da opção</label>
            <input className="input" placeholder="Ex: 1 – Ver produtos" value={form.texto} onChange={e => setForm(f => ({ ...f, texto: e.target.value }))} />
          </div>
          <div className="md:col-span-4">
            <label className="label">Resposta (suporta \n)</label>
            <textarea className="input h-28" value={form.resposta} onChange={e => setForm(f => ({ ...f, resposta: e.target.value }))} />
          </div>
          <div className="md:col-span-4 flex justify-end">
            <button className="btn btn-primary" onClick={add}>Adicionar opção</button>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-left text-neutral-400">
                <th style={{width: 80}}>Ordem</th>
                <th>Texto</th>
                <th>Resposta</th>
                <th style={{width: 140}}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.opcoes.map(o => (
                <tr key={o.id}>
                  <td>
                    <input className="input" type="number" min={1} value={o.ordem} onChange={e => update(o.id, { ordem: Number(e.target.value) })} />
                  </td>
                  <td>
                    <input className="input" value={o.texto} onChange={e => update(o.id, { texto: e.target.value })} />
                  </td>
                  <td>
                    <textarea className="input h-20" value={o.resposta} onChange={e => update(o.id, { resposta: e.target.value })} />
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-ghost" onClick={() => update(o.id, { ativo: !o.ativo })}>{o.ativo ? 'Desativar' : 'Ativar'}</button>
                      <button className="btn btn-ghost" onClick={() => remove(o.id)}>Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card p-6">
        <h3 className="text-lg font-semibold mb-2">Preview de Conversa</h3>
        <p className="text-sm text-neutral-400 mb-4">
          Simule o WhatsApp. Digite <code>#menu</code> para ver o menu, ou um número de opção.
        </p>
        <div className="grid gap-3">
          <input className="input" placeholder="#menu ou 1, 2, 3..." value={previewEntrada} onChange={e => setPreviewEntrada(e.target.value)} />
          <div className="card p-4 bg-neutral-950 border border-neutral-800 whitespace-pre-wrap">
            {previewResposta || 'Nada a mostrar ainda.'}
          </div>
          <div className="text-sm text-neutral-400">
            O texto acima segue a mesma lógica do seu fluxo n8n (Cachear Opções → Validar → Montar mensagem).
          </div>
        </div>
      </section>
    </div>
  )
}

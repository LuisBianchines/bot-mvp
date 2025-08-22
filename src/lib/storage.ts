import type { DadosMenus, Opcao, ExportJSON } from './types'

const KEY = 'lapidatto:menus'

export function load(): DadosMenus {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { opcoes: [] }
    const parsed = JSON.parse(raw) as DadosMenus
    // Garantir ordenação por ordem
    parsed.opcoes.sort((a, b) => a.ordem - b.ordem)
    return parsed
  } catch {
    return { opcoes: [] }
  }
}

export function save(data: DadosMenus) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

export function clear() {
  localStorage.removeItem(KEY)
}

export function exportJSON(data: DadosMenus): ExportJSON {
  const menu_opcoes = data.opcoes.map(o => ({
    id: o.id,
    ordem: o.ordem,
    texto: o.texto,
    tipo_menu: 'principal' as const,
    ativo: o.ativo
  }))
  const respostas_opcoes = data.opcoes.map(o => ({
    id: 'r-' + o.id,
    id_opcao: o.id,
    texto: o.resposta,
    ativo: true
  }))
  return { menu_opcoes, respostas_opcoes }
}

export function importJSON(obj: ExportJSON): DadosMenus {
  const byId: Record<string, { id: string, ordem: number, texto: string, tipo_menu: 'principal', ativo: boolean, resposta?: string }> = {}
  for (const m of obj.menu_opcoes ?? []) {
    byId[m.id] = { ...m }
  }
  for (const r of obj.respostas_opcoes ?? []) {
    if (byId[r.id_opcao]) byId[r.id_opcao].resposta = r.texto
  }
  const opcoes = Object.values(byId).map(v => ({
    id: v.id,
    ordem: v.ordem,
    texto: v.texto,
    resposta: v.resposta ?? '',
    tipo_menu: 'principal' as const,
    ativo: v.ativo
  }))
  opcoes.sort((a,b) => a.ordem - b.ordem)
  return { opcoes }
}

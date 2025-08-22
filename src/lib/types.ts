export type Opcao = {
  id: string
  ordem: number
  texto: string
  resposta: string
  tipo_menu: 'principal'
  ativo: boolean
}
export type DadosMenus = {
  opcoes: Opcao[]
}
export type ExportJSON = {
  menu_opcoes: Array<{ id: string, ordem: number, texto: string, tipo_menu: 'principal', ativo: boolean }>
  respostas_opcoes: Array<{ id: string, id_opcao: string, texto: string, ativo: boolean }>
}

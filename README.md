# Lapidatto • WhatsApp Bot MVP (React + Vite + Tailwind)

MVP de site de planos + painel para editar **menus e respostas** do seu chatbot de WhatsApp integrado ao **n8n + API da Meta**.

## 🚀 Rodando localmente
```bash
npm i
npm run dev
# abre em http://localhost:5173
```

### Build
```bash
npm run build
npm run preview
```

## 🧭 Estrutura
- **/src/pages**: Início, Planos, Login, Dashboard.
- **/src/components/MenuEditor.tsx**: CRUD de opções e preview que imita a lógica do seu fluxo n8n.
- **/src/lib/storage.ts**: Salva/carrega em `localStorage`, exporta/importa JSON no formato do banco.

## 🗄️ Export JSON (compatível com seu fluxo)
O botão **Exportar JSON** gera:
```jsonc
{
  "menu_opcoes": [
    { "id": "op1", "ordem": 1, "texto": "1 – Ver produtos", "tipo_menu": "principal", "ativo": true },
    // ...
  ],
  "respostas_opcoes": [
    { "id": "r-op1", "id_opcao": "op1", "texto": "Temos *camisetas* e *bonés*.", "ativo": true },
    // ...
  ]
}
```

Esses dados casam com o SELECT do seu n8n (`Buscar Menu + Respostas`).

## 🔌 Integração com n8n (conceito)
1. Faça upload do JSON via sua API backend para preencher as tabelas `menu_opcoes` e `respostas_opcoes`.
2. No n8n, seu fluxo já lê essas tabelas, cacheia e monta as mensagens.
3. Na Meta, deixe o webhook apontando pro **/whatsapp-recebe** do n8n.

> Dica: crie um endpoint (ex: `/admin/menus/import`) que valida e persiste esse JSON no PostgreSQL do cliente (tenant).

## 🧱 Próximos passos (sugestões)
- Autenticação real (JWT) e multi-tenant (um schema por cliente).
- Limites por plano e cobrança recorrente (ex: Stripe/Mercado Pago).
- Métricas e logs (exibição no dashboard).
- Integrações (CRM/Sheets) e webhooks de saída.
- Tema claro/escuro no painel.

---

Feito em 2025-08-22.

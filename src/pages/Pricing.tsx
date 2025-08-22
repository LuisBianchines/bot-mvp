import PlanCard from '@/components/PlanCard'

export default function Pricing() {
  return (
    <section className="container-base py-16">
      <h2 className="text-3xl font-semibold mb-6">Planos simples e previsíveis</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <PlanCard
          name="Básico"
          price="R$ 149"
          features={[
            "1 menu com até 5 opções",
            "Sem integrações externas",
            "Suporte por e-mail"
          ]}
        />
        <PlanCard
          name="Pro"
          price="R$ 349"
          features={[
            "Menus aninhados + 50 opções",
            "Integrações (Google Sheets/CRM)",
            "Relatórios mensais em PDF"
          ]}
          highlight
        />
        <PlanCard
          name="Premium"
          price="R$ 799"
          features={[
            "Tudo do Pro + SLA",
            "Onboarding assistido",
            "Ambiente dedicado"
          ]}
        />
      </div>
      <p className="text-sm text-neutral-400 mt-6">
        Os valores acima são exemplos para o MVP. Ajuste conforme seu mercado.
      </p>
    </section>
  )
}

type Props = {
  name: string
  price: string
  features: string[]
  cta?: string
  highlight?: boolean
}
export default function PlanCard({ name, price, features, cta='Escolher plano', highlight }: Props) {
  return (
    <div className={"card p-6 " + (highlight ? "outline outline-2 outline-emerald-500/60" : "")}>
      <div className="flex items-baseline justify-between">
        <h3 className="text-xl font-semibold">{name}</h3>
        <div className="text-2xl font-bold">{price}<span className="text-sm font-normal text-neutral-400">/mês</span></div>
      </div>
      <ul className="mt-4 space-y-2">
        {features.map((f, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-1">✅</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button className="btn btn-primary w-full mt-6" onClick={() => location.assign('/login')}>{cta}</button>
    </div>
  )
}

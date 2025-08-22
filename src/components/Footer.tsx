export default function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-800/80">
      <div className="container-base py-10 text-sm text-neutral-400">
        © {new Date().getFullYear()} Lapidatto Consulting — MVP do WhatsApp Bot.
      </div>
    </footer>
  )
}

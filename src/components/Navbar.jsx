import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/import', label: 'Import' },
  { to: '/detailing', label: 'Detailing' },
  { to: '/buy-sell', label: 'Achat / Vente' },
  { to: '/booking', label: 'Rendez-vous' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-darker/95 backdrop-blur-sm border-b border-white/5 py-0' : 'bg-transparent py-2'
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/logo.jpg" alt="BRB Auto Pro" className="h-14 w-auto object-contain" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-heading font-bold uppercase tracking-widest text-xs transition-colors duration-200 ${
                location.pathname === l.to
                  ? 'text-primary'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="tel:+33781787360"
          className="hidden lg:flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 font-heading font-bold uppercase tracking-widest text-xs transition-colors duration-200"
        >
          <Phone className="w-3.5 h-3.5" />
          07 81 78 73 60
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white p-2"
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-400 overflow-hidden ${
          open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } bg-darker border-t border-white/5`}
      >
        <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-heading font-bold uppercase tracking-widest text-sm py-2 border-b border-white/5 transition-colors ${
                location.pathname === l.to ? 'text-primary' : 'text-white/70'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="tel:+33781787360"
            className="btn-primary mt-2 justify-center"
          >
            <Phone className="w-4 h-4" />
            07 81 78 73 60
          </a>
        </nav>
      </div>
    </header>
  )
}

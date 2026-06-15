import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-darker border-t border-white/5">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src="/logo.jpg" alt="BRB Auto Pro" className="h-16 w-auto object-contain mb-4" />
            <p className="text-white/40 text-sm font-body leading-relaxed">
              L'expertise automobile sur-mesure du Gard. Import Europe, achat-vente et studio detailing premium.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-heading font-bold uppercase tracking-widest text-xs text-white/50 mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Accueil' },
                { to: '/import', label: 'Import Allemagne' },
                { to: '/detailing', label: 'Detailing' },
                { to: '/buy-sell', label: 'Achat / Vente' },
                { to: '/booking', label: 'Rendez-vous' },
                { to: '/contact', label: 'Contact' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-white/50 hover:text-primary transition-colors text-sm font-body"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <h4 className="font-heading font-bold uppercase tracking-widest text-xs text-white/50 mb-4">Horaires</h4>
            <ul className="space-y-2 text-sm text-white/50 font-body">
              <li>Lun – Ven : <span className="text-white">09h00 – 18h30</span></li>
              <li>Samedi : <span className="text-white">Sur RDV</span></li>
              <li>Dimanche : <span className="text-white">08h00 – 20h00 (RDV)</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold uppercase tracking-widest text-xs text-white/50 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+33781787360" className="flex items-center gap-2 text-white/50 hover:text-primary transition-colors text-sm">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  07 81 78 73 60
                </a>
              </li>
              <li>
                <a href="mailto:brbautopro@gmail.com" className="flex items-center gap-2 text-white/50 hover:text-primary transition-colors text-sm">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  brbautopro@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=30300+Beaucaire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-white/50 hover:text-primary transition-colors text-sm"
                >
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  30300 Beaucaire, Gard
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/brbautopro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/50 hover:text-primary transition-colors text-sm"
                >
                  <Instagram className="w-4 h-4 flex-shrink-0" />
                  @brbautopro
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs font-body">
            © {new Date().getFullYear()} BRB Auto Pro — Tous droits réservés
          </p>
          <Link to="/admin" className="text-white/10 hover:text-white/30 text-xs transition-colors font-body">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}

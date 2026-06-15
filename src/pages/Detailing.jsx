import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { useScrollReveal } from '../lib/useScrollReveal'
import SEO from '../components/SEO'

const services = [
  {
    id: 'interior',
    label: 'Nettoyage Intérieur',
    title: 'Nettoyage Intérieur Premium',
    price: 'À partir de 120 €',
    desc: 'Un habitacle sain et purifié. Nous allons dans les moindres recoins avec pinceaux, vapeur, et injecteur-extracteur pour retrouver la sensation du neuf.',
    items: [
      'Aspiration en profondeur (moquettes, sièges, coffre)',
      'Shampouinage des tissus ou soin des cuirs',
      'Dépoussiérage et dressing des plastiques (finition mate anti-UV)',
      'Nettoyage des vitres',
      'Purification du circuit de climatisation',
    ],
  },
  {
    id: 'polish',
    label: 'Polissage',
    title: 'Polissage Correction (Stage 2)',
    price: 'À partir de 450 €',
    badge: null,
    desc: 'Opération visant à retirer les micro-rayures, cheveux d\'ange et hologrammes causés par de mauvais lavages. Votre peinture retrouve sa profondeur et son éclat d\'origine.',
    items: [
      'Préparation esthétique complète (lavage + décontamination)',
      'Masquage des plastiques et joints',
      'Passage d\'un compound (abrasif) pour les gros défauts',
      'Passage d\'un polish de finition pour la brillance',
      'Application d\'une cire synthétique (sealant) longue durée 6 mois',
    ],
  },
  {
    id: 'ceramic',
    label: 'Céramique',
    title: 'Protection Céramique 9H',
    price: 'À partir de 690 €',
    badge: 'Garanti 3 ans',
    desc: 'Le traitement ultime pour votre carrosserie. Une couche de verre liquide qui fusionne avec le vernis pour offrir une dureté exceptionnelle (9H), une brillance extrême et un effet hydrophobe spectaculaire.',
    items: [
      'Polissage One-Step inclus pour supprimer 70% des défauts',
      'Décontamination chimique et mécanique (argile)',
      'Application traitement céramique Gtechniq / Krytex (1 couche)',
      'Inspection sous lumière directionnelle LED',
      'Certificat de garantie 3 ans',
    ],
  },
]

export default function DetailingPage() {
  useScrollReveal()
  const [active, setActive] = useState('ceramic')
  const current = services.find(s => s.id === active)

  return (
    <main className="pt-20">
      <SEO
        title="Detailing Auto Premium Beaucaire | Polissage & Céramique 9H"
        description="Studio detailing professionnel à Beaucaire. Polissage correction, protection céramique 9H garantie 3 ans, nettoyage intérieur premium. Devis en ligne."
        path="/detailing"
      />
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden flex items-end pb-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=2000"
            alt="Detailing"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-darker via-darker/50 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <p className="font-heading font-bold uppercase tracking-[4px] text-primary text-xs mb-3">Studio Premium</p>
          <h1 className="font-heading font-black uppercase text-white leading-none" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>
            STUDIO<br /><span className="text-primary">DETAILING</span>
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
      </section>

      {/* Services tabs */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="mb-12 reveal">
            <p className="font-heading font-bold uppercase tracking-[4px] text-primary text-xs mb-3">Nos prestations</p>
            <h2 className="font-heading font-black uppercase text-white text-4xl">NOS <span className="text-primary">FORMULES</span></h2>
          </div>

          <div className="flex flex-col md:flex-row gap-0 min-h-[400px]">
            {/* Sidebar tabs */}
            <div className="md:w-1/3 flex flex-row md:flex-col">
              {services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={`flex-1 md:flex-none p-6 text-left border-b border-white/5 transition-all duration-300 ${
                    active === s.id
                      ? 'bg-primary text-white border-l-0'
                      : 'bg-anthracite text-white/50 hover:text-white hover:bg-anthracite/80'
                  }`}
                >
                  <div className="font-heading font-bold uppercase tracking-widest text-xs">{s.label}</div>
                  {active === s.id && <div className="font-heading font-black text-2xl mt-1">{s.price}</div>}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="md:w-2/3 bg-anthracite border border-white/5 p-8">
              <div key={active} className="animate-fade-in">
                <div className="flex justify-between items-start mb-6 pb-6 border-b border-white/10">
                  <div>
                    <h3 className="font-heading font-black uppercase text-white text-2xl mb-1">{current.title}</h3>
                    <p className="text-primary font-heading font-bold">{current.price}</p>
                  </div>
                  {current.badge && (
                    <span className="bg-primary/20 border border-primary/50 text-white px-3 py-1 text-xs font-heading font-bold uppercase tracking-widest">
                      {current.badge}
                    </span>
                  )}
                </div>
                <p className="text-white/60 font-body leading-relaxed mb-6">{current.desc}</p>
                <ul className="space-y-3 mb-8">
                  {current.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-white/70 font-body text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/booking" className="btn-primary">
                  Réserver ce service <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-anthracite">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <p className="font-heading font-bold uppercase tracking-[4px] text-primary text-xs mb-3">Galerie</p>
            <h2 className="font-heading font-black uppercase text-white text-4xl">NOS <span className="text-primary">RÉALISATIONS</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              'https://images.unsplash.com/photo-1610647752706-3bb12232b37b?auto=format&fit=crop&q=80&w=600',
              'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=600',
              'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=600',
              'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600',
            ].map((src, i) => (
              <div key={i} className={`relative overflow-hidden group reveal-scale delay-${i * 100}`} style={{ aspectRatio: '1' }}>
                <img src={src} alt={`Réalisation ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center reveal">
          <h2 className="font-heading font-black uppercase text-white text-4xl mb-4">SUBLIMEZ VOTRE VÉHICULE</h2>
          <p className="text-white/70 font-body mb-8">Réservez votre prestation en ligne, ou appelez-nous pour un devis personnalisé.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/booking" className="bg-white text-primary hover:bg-white/90 px-8 py-4 font-heading font-bold uppercase tracking-widest text-sm transition-colors">
              Prendre RDV <ArrowRight className="inline w-4 h-4 ml-2" />
            </Link>
            <a href="tel:+33781787360" className="border border-white text-white hover:bg-white/10 px-8 py-4 font-heading font-bold uppercase tracking-widest text-sm transition-colors">
              07 81 78 73 60
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Shield, Wrench, TrendingUp, ChevronDown } from 'lucide-react'
import { useScrollReveal } from '../lib/useScrollReveal'
import SEO from '../components/SEO'

const services = [
  {
    icon: Shield,
    title: 'Import Europe',
    sub: 'Allemagne & +',
    desc: 'Votre véhicule de rêve venu d\'Europe, sécurisé, garanti et livré clés en main à Beaucaire.',
    link: '/import',
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
  },
  {
    icon: Wrench,
    title: 'Studio Detailing',
    sub: 'Polissage · Céramique',
    desc: 'Polissage, lustrage et protection céramique. L\'art de sublimer chaque courbe de votre carrosserie.',
    link: '/detailing',
    img: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800',
  },
  {
    icon: TrendingUp,
    title: 'Achat & Vente',
    sub: 'Reprise · Dépôt-vente',
    desc: 'Reprise cash ou dépôt-vente. Estimation sous 24h. Nous valorisons votre passion auto.',
    link: '/buy-sell',
    img: 'https://images.unsplash.com/photo-1503376713251-4045fbc555fa?auto=format&fit=crop&q=80&w=800',
  },
]

const testimonials = [
  { name: 'Julien M.', text: 'Super accompagnement pour l\'import de ma RS3. Rapide, transparent et pro. Je recommande les yeux fermés.' },
  { name: 'Sophie L.', text: 'Prestation de detailing exceptionnelle ! Ma carrosserie est comme neuve après le traitement céramique.' },
  { name: 'Karim B.', text: 'Très professionnel, j\'ai vendu ma voiture au prix du marché sans me prendre la tête. Merci BRB !' },
]

const stats = [
  { value: '200+', label: 'Véhicules importés' },
  { value: '98%', label: 'Clients satisfaits' },
  { value: '5★', label: 'Note moyenne' },
  { value: '3 ans', label: 'Garantie céramique' },
]

export default function Home() {
  useScrollReveal()
  const heroRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main>
      <SEO
        title="BRB Auto Pro - Import & Detailing à Beaucaire (30300) | Gard"
        description="Expert en import de véhicules d'Allemagne et studio detailing premium à Beaucaire. Polissage, céramique, achat-vente. Devis gratuit."
        path="/"
      />
      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[600px] overflow-hidden flex items-center">
        <div ref={heroRef} className="absolute inset-0 will-change-transform">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000"
            alt="BRB Auto Pro"
            className="w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-darker/90 via-darker/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-darker/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-2xl">
            <p className="font-heading font-bold uppercase tracking-[4px] text-primary text-xs mb-4 animate-fade-in">
              Beaucaire · Gard · France
            </p>
            <h1
              className="font-heading font-black uppercase text-white leading-none mb-6"
              style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', animationDelay: '0.1s' }}
            >
              <span className="block animate-fade-up" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
                L'EXPERTISE
              </span>
              <span className="block text-primary animate-fade-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                AUTOMOBILE
              </span>
              <span className="block animate-fade-up" style={{ animationDelay: '0.45s', animationFillMode: 'both' }}>
                SUR-MESURE
              </span>
            </h1>
            <p
              className="text-white/60 font-body font-light text-lg mb-8 max-w-md animate-fade-up"
              style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
            >
              Accompagnement premium pour l'achat, l'importation et l'entretien de vos véhicules de prestige.
            </p>
            <div
              className="flex flex-wrap gap-4 animate-fade-up"
              style={{ animationDelay: '0.75s', animationFillMode: 'both' }}
            >
              <Link to="/booking" className="btn-primary">
                Prendre RDV <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/import" className="btn-outline">
                Importer un véhicule
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <ChevronDown className="w-5 h-5 text-white/30" />
        </div>

        {/* Red diagonal accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
      </section>

      {/* ── MARQUEE BAND ── */}
      <div className="bg-primary py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(8).fill(['IMPORT ALLEMAGNE', 'PROTECTION CÉRAMIQUE', 'POLISSAGE CORRECTION', 'ACHAT VENTE', 'DETAILING PREMIUM', 'BEAUCAIRE · GARD']).flat().map((t, i) => (
            <span key={i} className="font-heading font-black uppercase text-white text-xs tracking-[3px] mx-8">
              {t} <span className="text-white/40 mx-4">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <section className="bg-anthracite border-b border-white/5">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className={`text-center reveal delay-${i * 100 + 100}`}>
                <div className="font-heading font-black text-4xl text-primary mb-1">{s.value}</div>
                <div className="text-white/40 font-body text-xs uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 bg-dark">
        <div className="container mx-auto px-4">
          <div className="mb-16 reveal">
            <p className="font-heading font-bold uppercase tracking-[4px] text-primary text-xs mb-3">Nos Prestations</p>
            <h2 className="font-heading font-black uppercase text-white text-5xl leading-none">
              CE QUE NOUS<br /><span className="text-primary">FAISONS</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {services.map((s, i) => (
              <Link
                key={i}
                to={s.link}
                className={`group relative overflow-hidden block reveal-scale delay-${i * 200}`}
                style={{ aspectRatio: '4/5' }}
              >
                <img
                  src={s.img}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darker via-darker/60 to-transparent" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <s.icon className="w-8 h-8 text-primary mb-3 transform group-hover:scale-110 transition-transform duration-300" />
                  <p className="font-heading font-bold text-primary text-xs uppercase tracking-widest mb-1">{s.sub}</p>
                  <h3 className="font-heading font-black uppercase text-white text-3xl leading-tight mb-2">{s.title}</h3>
                  <p className="text-white/60 font-body text-sm leading-relaxed mb-4 max-w-xs">{s.desc}</p>
                  <span className="font-heading font-bold text-xs uppercase tracking-widest text-primary flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                    Découvrir <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                {/* Hover border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/40 transition-colors duration-500 pointer-events-none" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY BRB ── */}
      <section className="py-24 bg-anthracite relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/3 clip-diagonal pointer-events-none" />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-left">
              <p className="font-heading font-bold uppercase tracking-[4px] text-primary text-xs mb-3">Pourquoi nous choisir</p>
              <h2 className="font-heading font-black uppercase text-white text-5xl leading-none mb-6">
                UNE APPROCHE<br /><span className="text-primary">DIFFÉRENTE</span>
              </h2>
              <p className="text-white/50 font-body font-light leading-relaxed mb-8">
                Chez BRB Auto Pro, chaque client bénéficie d'un suivi personnalisé de A à Z. Pas de stock pléthorique, pas de vendeurs sous pression : juste un expert passionné à votre service.
              </p>
              <ul className="space-y-4">
                {[
                  'Transparence totale sur chaque transaction',
                  'Rapport d\'expertise complet avant import',
                  'Homologation et livraison clés en main',
                  'Suivi après-vente personnalisé',
                ].map((item, i) => (
                  <li key={i} className={`flex items-start gap-3 reveal delay-${i * 100 + 100}`}>
                    <span className="w-1 h-6 bg-primary flex-shrink-0 mt-0.5" />
                    <span className="text-white/70 font-body text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-primary mt-8">
                Nous contacter <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="reveal-right relative">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=900"
                  alt="BRB Auto Pro expertise"
                  className="w-full object-cover"
                  style={{ aspectRatio: '4/3' }}
                  loading="lazy"
                />
                <div className="absolute -bottom-4 -left-4 bg-primary p-6">
                  <div className="font-heading font-black text-white text-4xl">5★</div>
                  <div className="font-heading font-bold text-white/80 text-xs uppercase tracking-widest">Note Google</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 reveal">
            <p className="font-heading font-bold uppercase tracking-[4px] text-primary text-xs mb-3">Témoignages</p>
            <h2 className="font-heading font-black uppercase text-white text-5xl leading-none">
              ILS NOUS FONT <span className="text-primary">CONFIANCE</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className={`bg-anthracite p-8 border border-white/5 border-l-4 border-l-primary reveal delay-${i * 150 + 100}`}>
                <div className="flex text-primary mb-4">
                  {Array(5).fill(0).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-white/70 font-body italic mb-6 leading-relaxed">"{t.text}"</p>
                <p className="font-heading font-bold text-white uppercase tracking-widest text-xs">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2000"
            alt="background"
            className="w-full h-full object-cover opacity-20"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-dark/90" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center reveal">
          <p className="font-heading font-bold uppercase tracking-[4px] text-primary text-xs mb-4">Passez à l'action</p>
          <h2 className="font-heading font-black uppercase text-white text-5xl md:text-7xl leading-none mb-6">
            VOTRE PROJET<br /><span className="text-primary">DÉMARRE ICI</span>
          </h2>
          <p className="text-white/40 font-body mb-10 max-w-lg mx-auto">
            Import, detailing, estimation… Prenez rendez-vous en ligne en 2 minutes.
          </p>
          <Link to="/booking" className="btn-primary text-base px-10 py-5">
            Réserver un créneau <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}

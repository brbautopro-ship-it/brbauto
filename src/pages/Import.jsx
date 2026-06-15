import { useState } from 'react'
import { ArrowRight, CheckCircle, Shield, FileText, Car } from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useScrollReveal } from '../lib/useScrollReveal'
import SEO from '../components/SEO'

const steps = [
  { n: '01', title: 'Briefing', desc: 'Vous nous décrivez votre véhicule idéal : marque, modèle, budget, options.' },
  { n: '02', title: 'Recherche', desc: 'Nous sélectionnons les meilleures annonces sur les marchés allemand et européen.' },
  { n: '03', title: 'Expertise', desc: 'Inspection physique ou rapport expert tiers avant tout achat.' },
  { n: '04', title: 'Livraison', desc: 'Homologation, immatriculation, livraison à Beaucaire. Clés en main.' },
]

const checkpoints = [
  'Vérification du historique Carfax / AutoScout',
  'Inspection technique complète (boîte, moteur, carrosserie)',
  'Contrôle du kilométrage réel',
  'Vérification des antécédents d\'accident',
  'Conformité au contrôle technique français',
  'Dédouanement et homologation inclus',
]

export default function ImportPage() {
  useScrollReveal()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', brand: '', model: '', budget: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await addDoc(collection(db, 'importRequests'), { ...form, status: 'new', createdAt: serverTimestamp() })
      setSent(true)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="pt-20">
      <SEO
        title="Import Véhicule Allemagne | BRB Auto Pro Beaucaire"
        description="Importez votre voiture d'Allemagne en toute sécurité. BRB Auto Pro gère tout : recherche, expertise, homologation, livraison. Économisez jusqu'à 30%."
        path="/import"
      />
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden flex items-end pb-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000"
            alt="Import automobile"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-darker via-darker/50 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <p className="font-heading font-bold uppercase tracking-[4px] text-primary text-xs mb-3">Service Premium</p>
          <h1 className="font-heading font-black uppercase text-white leading-none" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>
            IMPORT<br /><span className="text-primary">ALLEMAGNE & EUROPE</span>
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
      </section>

      {/* Intro */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-left">
              <p className="font-heading font-bold uppercase tracking-[4px] text-primary text-xs mb-3">Pourquoi importer ?</p>
              <h2 className="font-heading font-black uppercase text-white text-4xl leading-none mb-6">
                JUSQU'À <span className="text-primary">30%</span><br />MOINS CHER
              </h2>
              <p className="text-white/50 font-body leading-relaxed mb-6">
                Le marché allemand est le plus grand d'Europe avec des stocks immenses et des prix compétitifs. Nous gérons l'intégralité du processus pour vous : recherche, inspection, transport, homologation.
              </p>
              <p className="text-white/50 font-body leading-relaxed">
                Votre véhicule de rêve venu d'Europe, sécurisé, garanti et livré clés en main à Beaucaire.
              </p>
            </div>
            <div className="reveal-right">
              <div className="bg-anthracite border border-white/5 p-8">
                <h3 className="font-heading font-bold uppercase text-white text-lg mb-6 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Nos 6 points de contrôle
                </h3>
                <ul className="space-y-3">
                  {checkpoints.map((c, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-white/70 font-body text-sm">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-anthracite">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 reveal">
            <p className="font-heading font-bold uppercase tracking-[4px] text-primary text-xs mb-3">Notre méthode</p>
            <h2 className="font-heading font-black uppercase text-white text-4xl">COMMENT ÇA <span className="text-primary">MARCHE</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {steps.map((s, i) => (
              <div key={i} className={`relative p-8 border border-white/5 reveal delay-${i * 150}`}>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-px w-px h-1/2 -translate-y-1/2 bg-primary/20" />
                )}
                <div className="font-heading font-black text-primary/20 text-7xl leading-none mb-4">{s.n}</div>
                <h3 className="font-heading font-bold uppercase text-white text-lg mb-2">{s.title}</h3>
                <p className="text-white/40 font-body text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12 reveal">
            <p className="font-heading font-bold uppercase tracking-[4px] text-primary text-xs mb-3">Demande d'import</p>
            <h2 className="font-heading font-black uppercase text-white text-4xl">TROUVEZ VOTRE<br /><span className="text-primary">VÉHICULE</span></h2>
            <p className="text-white/40 font-body mt-4">Un expert BRB configurera une sélection sur-mesure pour vous.</p>
          </div>

          {sent ? (
            <div className="text-center bg-primary/10 border border-primary/30 p-12 reveal">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading font-bold uppercase text-white text-xl mb-2">Demande envoyée !</h3>
              <p className="text-white/50 font-body">Nous vous contacterons sous 48h avec nos suggestions.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 reveal">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-widest text-white/40 mb-2">Prénom *</label>
                  <input required value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} className="input-dark" />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-widest text-white/40 mb-2">Nom *</label>
                  <input required value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} className="input-dark" />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-widest text-white/40 mb-2">Email *</label>
                  <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="input-dark" />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-widest text-white/40 mb-2">Téléphone</label>
                  <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="input-dark" />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-widest text-white/40 mb-2">Marque souhaitée *</label>
                  <input required placeholder="Ex: BMW, Audi, Mercedes…" value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} className="input-dark" />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-widest text-white/40 mb-2">Modèle</label>
                  <input placeholder="Ex: Série 3, RS3, Classe C…" value={form.model} onChange={e => setForm({...form, model: e.target.value})} className="input-dark" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-heading font-bold uppercase tracking-widest text-white/40 mb-2">Budget max (€)</label>
                  <input type="number" placeholder="Ex: 35000" value={form.budget} onChange={e => setForm({...form, budget: e.target.value})} className="input-dark" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-widest text-white/40 mb-2">Précisions / Options souhaitées</label>
                <textarea rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="input-dark resize-none" placeholder="Kilométrage max, couleur, boîte auto/manuelle, année…" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                {loading ? 'Envoi en cours…' : <>Envoyer ma demande <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Guide CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <FileText className="w-10 h-10 text-white/80 flex-shrink-0" />
            <div>
              <h3 className="font-heading font-bold uppercase text-white text-lg">Guide Gratuit</h3>
              <p className="text-white/70 text-sm font-body">Les 6 points de contrôle essentiels avant d'importer une voiture d'Allemagne</p>
            </div>
          </div>
          <form className="flex gap-3 w-full md:w-auto" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Votre email" className="input-dark flex-1 md:w-64" />
            <button type="submit" className="bg-white text-primary hover:bg-white/90 px-6 py-3 font-heading font-bold uppercase tracking-widest text-xs transition-colors whitespace-nowrap">
              Recevoir le PDF
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

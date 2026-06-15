import { useState } from 'react'
import { CheckCircle, ArrowRight, TrendingUp } from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useScrollReveal } from '../lib/useScrollReveal'
import SEO from '../components/SEO'

export default function BuySellPage() {
  useScrollReveal()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', brand: '', model: '', year: '', mileage: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await addDoc(collection(db, 'contactRequests'), { ...form, type: 'estimation', status: 'new', createdAt: serverTimestamp() })
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
        title="Reprise & Vente Voiture Beaucaire | BRB Auto Pro"
        description="Vendez ou faites reprendre votre voiture au meilleur prix à Beaucaire. Estimation gratuite sous 24h. Reprise cash ou dépôt-vente."
        path="/buy-sell"
      />
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden flex items-end pb-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1503376713251-4045fbc555fa?auto=format&fit=crop&q=80&w=2000"
            alt="Achat Vente"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-darker via-darker/60 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <p className="font-heading font-bold uppercase tracking-[4px] text-primary text-xs mb-3">Reprise · Dépôt-vente</p>
          <h1 className="font-heading font-black uppercase text-white leading-none" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>
            ACHAT<br /><span className="text-primary">& VENTE</span>
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
      </section>

      {/* Options */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[
              {
                title: 'Reprise Cash',
                desc: 'Nous rachetons votre véhicule directement, sans intermédiaire. Estimation sous 24h et paiement immédiat. Simple, rapide, sans prise de tête.',
                items: ['Estimation gratuite sous 24h', 'Paiement immédiat par virement', 'Prise en charge administrative', 'Aucuns frais cachés'],
              },
              {
                title: 'Dépôt-Vente',
                desc: 'Confiez-nous votre véhicule, nous nous chargeons de la vente au meilleur prix. Vous maximisez la valeur de votre voiture sans vous en occuper.',
                items: ['Valorisation maximale du véhicule', 'Annonces multicanaux professionnelles', 'Gestion complète des visites', 'Commission transparente à la vente'],
              },
            ].map((opt, i) => (
              <div key={i} className={`bg-anthracite border border-white/5 p-8 hover-lift reveal delay-${i * 200}`}>
                <TrendingUp className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-heading font-black uppercase text-white text-2xl mb-3">{opt.title}</h3>
                <p className="text-white/50 font-body text-sm leading-relaxed mb-6">{opt.desc}</p>
                <ul className="space-y-2">
                  {opt.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-white/70 font-body text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estimation form */}
      <section className="py-20 bg-anthracite">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12 reveal">
            <p className="font-heading font-bold uppercase tracking-[4px] text-primary text-xs mb-3">Estimation gratuite</p>
            <h2 className="font-heading font-black uppercase text-white text-4xl">ESTIMATION <span className="text-primary">EN 24H</span></h2>
            <p className="text-white/40 font-body mt-4">Nous vous répondrons avec l'estimation la plus juste selon les prix du marché.</p>
          </div>

          {sent ? (
            <div className="text-center bg-primary/10 border border-primary/30 p-12 reveal">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading font-bold uppercase text-white text-xl mb-2">Demande envoyée !</h3>
              <p className="text-white/50 font-body">Nous vous recontactons sous 24h avec notre estimation.</p>
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
                  <label className="block text-xs font-heading font-bold uppercase tracking-widest text-white/40 mb-2">Téléphone *</label>
                  <input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="input-dark" />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-widest text-white/40 mb-2">Marque *</label>
                  <input required placeholder="Ex: Renault, Peugeot…" value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} className="input-dark" />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-widest text-white/40 mb-2">Modèle *</label>
                  <input required placeholder="Ex: Clio, 308…" value={form.model} onChange={e => setForm({...form, model: e.target.value})} className="input-dark" />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-widest text-white/40 mb-2">Année</label>
                  <input type="number" placeholder="Ex: 2019" value={form.year} onChange={e => setForm({...form, year: e.target.value})} className="input-dark" />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-widest text-white/40 mb-2">Kilométrage</label>
                  <input type="number" placeholder="Ex: 85000" value={form.mileage} onChange={e => setForm({...form, mileage: e.target.value})} className="input-dark" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-widest text-white/40 mb-2">Informations complémentaires</label>
                <textarea rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="input-dark resize-none" placeholder="État général, options, historique…" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                {loading ? 'Envoi…' : <>Faire estimer mon véhicule <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}

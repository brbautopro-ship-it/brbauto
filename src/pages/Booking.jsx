import { useState } from 'react'
import { CheckCircle, ArrowRight, Calendar, Clock } from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useScrollReveal } from '../lib/useScrollReveal'
import SEO from '../components/SEO'

const services = [
  { id: 'nettoyage-interieur', name: 'Nettoyage Intérieur Premium', duration: '2-3h' },
  { id: 'polissage', name: 'Polissage & Lustrage', duration: '1 journée' },
  { id: 'ceramique', name: 'Protection Céramique 9H', duration: '1-2 jours' },
  { id: 'import', name: 'Consultation Import', duration: '1h' },
  { id: 'estimation', name: 'Estimation Véhicule', duration: '30min' },
  { id: 'autre', name: 'Autre / Devis Personnalisé', duration: 'Variable' },
]

const timeSlots = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

function getMinDate() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

export default function BookingPage() {
  useScrollReveal()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    service: '',
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    carModel: '',
    message: '',
  })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const selectedService = services.find(s => s.id === form.service)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.time) { alert('Veuillez sélectionner un créneau horaire.'); return }
    setLoading(true)
    try {
      const dateTime = new Date(`${form.date}T${form.time}`)
      await addDoc(collection(db, 'bookings'), {
        ...form,
        dateTime: dateTime.toISOString(),
        status: 'pending',
        createdAt: serverTimestamp(),
      })
      setSent(true)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <main className="pt-20 min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-4">
          <div className="w-20 h-20 bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-heading font-black uppercase text-white text-3xl mb-3">Demande Reçue !</h2>
          <p className="text-white/50 font-body leading-relaxed">
            Votre demande de rendez-vous a bien été reçue. Nous vous contacterons rapidement pour confirmer le créneau.
          </p>
          <div className="mt-8 bg-anthracite border border-white/5 p-6 text-left">
            <p className="text-xs font-heading font-bold uppercase tracking-widest text-white/30 mb-3">Récapitulatif</p>
            <p className="text-white font-body"><span className="text-white/50">Service :</span> {selectedService?.name}</p>
            <p className="text-white font-body mt-1"><span className="text-white/50">Date :</span> {new Date(`${form.date}T${form.time}`).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} à {form.time}</p>
            <p className="text-white font-body mt-1"><span className="text-white/50">Véhicule :</span> {form.carModel}</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-20">
      <SEO
        title="Prendre Rendez-vous | BRB Auto Pro Beaucaire"
        description="Réservez votre créneau en ligne pour un service detailing, une consultation import ou une estimation véhicule."
        path="/booking"
      />
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden flex items-end pb-12">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1562141961-d56a0a97c50f?auto=format&fit=crop&q=80&w=2000"
            alt="Rendez-vous"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-darker via-darker/60 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <p className="font-heading font-bold uppercase tracking-[4px] text-primary text-xs mb-3">En ligne · 2 minutes</p>
          <h1 className="font-heading font-black uppercase text-white leading-none" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>
            PRISE DE<br /><span className="text-primary">RENDEZ-VOUS</span>
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
      </section>

      {/* Steps indicator */}
      <div className="bg-anthracite border-b border-white/5">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 max-w-lg">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center gap-2">
                <div className={`w-7 h-7 flex items-center justify-center text-xs font-heading font-bold transition-colors ${step >= n ? 'bg-primary text-white' : 'bg-white/10 text-white/30'}`}>
                  {n}
                </div>
                <span className={`text-xs font-heading uppercase tracking-widest transition-colors ${step >= n ? 'text-white' : 'text-white/30'}`}>
                  {n === 1 ? 'Service' : n === 2 ? 'Créneau' : 'Coordonnées'}
                </span>
                {n < 3 && <div className={`flex-1 h-px transition-colors ${step > n ? 'bg-primary' : 'bg-white/10'}`} style={{ width: 40 }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="py-16 bg-dark">
        <div className="container mx-auto px-4 max-w-2xl">

          {/* Step 1 - Service */}
          {step === 1 && (
            <div className="reveal">
              <h2 className="font-heading font-black uppercase text-white text-2xl mb-8">Choisissez votre prestation</h2>
              <div className="grid grid-cols-1 gap-3">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setForm({...form, service: s.id}); setStep(2) }}
                    className={`flex items-center justify-between p-5 border text-left transition-all duration-200 ${
                      form.service === s.id
                        ? 'border-primary bg-primary/10 text-white'
                        : 'border-white/10 bg-anthracite text-white/70 hover:border-primary/50 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="font-heading font-bold uppercase text-sm">{s.name}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3 text-primary" />
                        <span className="text-xs text-white/40 font-body">{s.duration}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 - Date & Time */}
          {step === 2 && (
            <div className="reveal">
              <button onClick={() => setStep(1)} className="text-white/40 hover:text-white text-xs font-heading uppercase tracking-widest mb-6 flex items-center gap-1">
                ← Retour
              </button>
              <h2 className="font-heading font-black uppercase text-white text-2xl mb-2">Choisissez votre créneau</h2>
              <p className="text-white/40 font-body text-sm mb-8">Service : <span className="text-primary">{selectedService?.name}</span></p>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-widest text-white/40 mb-3 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" /> Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={getMinDate()}
                    value={form.date}
                    onChange={e => setForm({...form, date: e.target.value, time: ''})}
                    className="input-dark"
                  />
                </div>

                {form.date && (
                  <div>
                    <label className="block text-xs font-heading font-bold uppercase tracking-widest text-white/40 mb-3 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" /> Créneaux disponibles *
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((t) => (
                        <button
                          key={t}
                          onClick={() => setForm({...form, time: t})}
                          className={`py-3 text-center text-sm font-heading font-bold transition-all ${
                            form.time === t
                              ? 'bg-primary text-white'
                              : 'bg-anthracite border border-white/10 text-white/60 hover:border-primary/50 hover:text-white'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => { if (!form.date || !form.time) { alert('Veuillez choisir une date et un créneau.'); return } setStep(3) }}
                  className="btn-primary w-full justify-center"
                >
                  Continuer <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3 - Personal info */}
          {step === 3 && (
            <div className="reveal">
              <button onClick={() => setStep(2)} className="text-white/40 hover:text-white text-xs font-heading uppercase tracking-widest mb-6 flex items-center gap-1">
                ← Retour
              </button>
              <h2 className="font-heading font-black uppercase text-white text-2xl mb-2">Vos coordonnées</h2>
              <div className="bg-anthracite border border-white/5 p-4 mb-8">
                <p className="text-xs text-white/40 font-body">
                  <span className="text-primary font-bold">{selectedService?.name}</span> · {new Date(`${form.date}T${form.time}`).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })} à {form.time}
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-heading font-bold uppercase tracking-widest text-white/40 mb-2">Prénom *</label>
                    <input required value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} className="input-dark" />
                  </div>
                  <div>
                    <label className="block text-xs font-heading font-bold uppercase tracking-widest text-white/40 mb-2">Nom *</label>
                    <input required value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} className="input-dark" />
                  </div>
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
                  <label className="block text-xs font-heading font-bold uppercase tracking-widest text-white/40 mb-2">Votre véhicule *</label>
                  <input required placeholder="Ex: BMW Série 3 2020" value={form.carModel} onChange={e => setForm({...form, carModel: e.target.value})} className="input-dark" />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-widest text-white/40 mb-2">Message (optionnel)</label>
                  <textarea rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="input-dark resize-none" placeholder="Précisions supplémentaires…" />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                  {loading ? 'Envoi en cours…' : <>Confirmer le rendez-vous <ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

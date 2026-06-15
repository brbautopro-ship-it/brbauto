import { useState } from 'react'
import { Phone, Mail, MapPin, Instagram, CheckCircle, ArrowRight, Clock } from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useScrollReveal } from '../lib/useScrollReveal'
import SEO from '../components/SEO'

export default function ContactPage() {
  useScrollReveal()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await addDoc(collection(db, 'contactRequests'), { ...form, type: 'general', status: 'new', createdAt: serverTimestamp() })
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
        title="Contact BRB Auto Pro | Beaucaire 30300"
        description="Contactez BRB Auto Pro à Beaucaire (Gard). Téléphone : 07 81 78 73 60. Email : brbautopro@gmail.com."
        path="/contact"
      />
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[280px] overflow-hidden flex items-end pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-darker via-anthracite to-darker" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(181,0,0,0.5) 80px, rgba(181,0,0,0.5) 81px), repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(181,0,0,0.5) 80px, rgba(181,0,0,0.5) 81px)' }} />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <p className="font-heading font-bold uppercase tracking-[4px] text-primary text-xs mb-3">Nous Joindre</p>
          <h1 className="font-heading font-black uppercase text-white leading-none" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>
            CONTACT
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
      </section>

      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="reveal">
                <p className="font-heading font-bold uppercase tracking-[4px] text-primary text-xs mb-3">Informations</p>
                <h2 className="font-heading font-black uppercase text-white text-3xl mb-6">ON EST LÀ<br />POUR VOUS</h2>
              </div>

              <div className="space-y-6 reveal delay-100">
                {[
                  { icon: Phone, label: 'Téléphone', value: '07 81 78 73 60', href: 'tel:+33781787360' },
                  { icon: Mail, label: 'Email', value: 'brbautopro@gmail.com', href: 'mailto:brbautopro@gmail.com' },
                  { icon: MapPin, label: 'Adresse', value: '30300 Beaucaire, Gard', href: 'https://maps.google.com/?q=30300+Beaucaire' },
                  { icon: Instagram, label: 'Instagram', value: '@brbautopro', href: 'https://www.instagram.com/brbautopro' },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                      <Icon className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-xs font-heading font-bold uppercase tracking-widest text-white/30">{label}</div>
                      <div className="text-white/80 group-hover:text-primary transition-colors font-body text-sm mt-0.5">{value}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="bg-anthracite border border-white/5 p-6 reveal delay-200">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-primary" />
                  <h3 className="font-heading font-bold uppercase text-white text-sm tracking-widest">Horaires</h3>
                </div>
                <ul className="space-y-2 text-sm text-white/50 font-body">
                  <li className="flex justify-between"><span>Lundi – Vendredi</span><span className="text-white">09h – 18h30</span></li>
                  <li className="flex justify-between"><span>Samedi</span><span className="text-white">Sur RDV</span></li>
                  <li className="flex justify-between"><span>Dimanche</span><span className="text-white">08h – 20h (RDV)</span></li>
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 reveal-right">
              {sent ? (
                <div className="text-center bg-primary/10 border border-primary/30 p-12 h-full flex flex-col items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-heading font-bold uppercase text-white text-xl mb-2">Message envoyé !</h3>
                  <p className="text-white/50 font-body">Nous vous répondrons dans les plus brefs délais.</p>
                </div>
              ) : (
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
                    <label className="block text-xs font-heading font-bold uppercase tracking-widest text-white/40 mb-2">Téléphone</label>
                    <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="input-dark" />
                  </div>
                  <div>
                    <label className="block text-xs font-heading font-bold uppercase tracking-widest text-white/40 mb-2">Sujet *</label>
                    <select required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="input-dark">
                      <option value="">Sélectionner…</option>
                      <option value="import">Import véhicule</option>
                      <option value="detailing">Detailing</option>
                      <option value="achat-vente">Achat / Vente</option>
                      <option value="devis">Demande de devis</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-heading font-bold uppercase tracking-widest text-white/40 mb-2">Message *</label>
                    <textarea rows={5} required value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="input-dark resize-none" placeholder="Décrivez votre projet…" />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                    {loading ? 'Envoi…' : <>Envoyer le message <ArrowRight className="w-4 h-4" /></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

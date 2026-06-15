import { useState, useEffect } from 'react'
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { collection, query, orderBy, getDocs, doc, updateDoc, onSnapshot } from 'firebase/firestore'
import { auth, db, googleProvider } from '../lib/firebase'
import { LogIn, LogOut, CheckCircle, XCircle, Clock, Calendar, User, Phone, Mail, Car } from 'lucide-react'

const ADMIN_EMAIL = 'brbautopro@gmail.com'

const STATUS_COLORS = {
  pending: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400',
  confirmed: 'border-green-500/50 bg-green-500/10 text-green-400',
  cancelled: 'border-red-500/50 bg-red-500/10 text-red-400',
}
const STATUS_LABELS = { pending: 'En attente', confirmed: 'Confirmé', cancelled: 'Annulé' }

function buildGoogleCalendarUrl(booking) {
  const start = new Date(booking.dateTime)
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000)
  const fmt = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `RDV BRB Auto Pro - ${booking.firstName} ${booking.lastName} - ${booking.service}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `Véhicule: ${booking.carModel || 'N/A'}\nTél: ${booking.phone}\nEmail: ${booking.email}\n${booking.message || ''}`,
    location: '30300 Beaucaire, Gard',
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

export default function AdminPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loginError, setLoginError] = useState('')
  const [bookings, setBookings] = useState([])
  const [contacts, setContacts] = useState([])
  const [imports, setImports] = useState([])
  const [tab, setTab] = useState('bookings')
  const [updating, setUpdating] = useState(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return unsub
  }, [])

  useEffect(() => {
    if (!user) return
    // Live bookings
    const unsub = onSnapshot(
      query(collection(db, 'bookings'), orderBy('createdAt', 'desc')),
      (snap) => setBookings(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    )
    // Contacts
    getDocs(query(collection(db, 'contactRequests'), orderBy('createdAt', 'desc')))
      .then(snap => setContacts(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
    // Import requests
    getDocs(query(collection(db, 'importRequests'), orderBy('createdAt', 'desc')))
      .then(snap => setImports(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
    return unsub
  }, [user])

  const handleLogin = async () => {
    setLoginError('')
    try {
      const result = await signInWithPopup(auth, googleProvider)
      if (result.user.email !== ADMIN_EMAIL) {
        await signOut(auth)
        setLoginError('Accès refusé. Ce compte n\'est pas autorisé.')
      }
    } catch (err) {
      setLoginError(`Erreur lors de la connexion : ${err.message}`)
    }
  }

  const handleStatus = async (id, status) => {
    setUpdating(id)
    try {
      await updateDoc(doc(db, 'bookings', id), { status })
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
    } catch (err) {
      console.error(err)
    } finally {
      setUpdating(null)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-darker flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!user) return (
    <main className="min-h-screen bg-darker flex items-center justify-center pt-20">
      <div className="text-center max-w-sm mx-auto px-4">
        <div className="w-16 h-16 bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
          <LogIn className="w-7 h-7 text-primary" />
        </div>
        <h1 className="font-heading font-black uppercase text-white text-3xl mb-2">ACCÈS ADMIN</h1>
        <p className="text-white/40 font-body text-sm mb-8">Réservé à BRB Auto Pro</p>
        {loginError && (
          <div className="bg-red-500/10 border border-red-500/30 p-4 mb-6 text-red-400 text-sm font-body text-left">
            {loginError}
          </div>
        )}
        <button onClick={handleLogin} className="btn-primary w-full justify-center">
          <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Connexion Google
        </button>
        <p className="text-white/20 text-xs mt-4 font-body">Note : Si rien ne se passe, ouvrez le site dans un nouvel onglet.</p>
      </div>
    </main>
  )

  const tabs = [
    { id: 'bookings', label: 'Rendez-vous', count: bookings.filter(b => b.status === 'pending').length },
    { id: 'contacts', label: 'Contacts', count: contacts.length },
    { id: 'imports', label: 'Imports', count: imports.length },
  ]

  return (
    <main className="pt-20 min-h-screen bg-darker">
      {/* Header */}
      <div className="bg-anthracite border-b border-white/5">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="BRB" className="h-8 w-auto" />
            <span className="font-heading font-bold uppercase tracking-widest text-white text-sm">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/40 text-xs font-body hidden md:block">{user.email}</span>
            <button onClick={() => signOut(auth)} className="flex items-center gap-2 text-white/40 hover:text-primary text-xs font-heading uppercase tracking-widest transition-colors">
              <LogOut className="w-4 h-4" /> Déconnexion
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-white/10">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-3 font-heading font-bold uppercase tracking-widest text-xs transition-all ${
                tab === t.id ? 'text-primary border-b-2 border-primary' : 'text-white/40 hover:text-white'
              }`}
            >
              {t.label}
              {t.count > 0 && <span className="ml-2 bg-primary text-white text-xs px-1.5 py-0.5">{t.count}</span>}
            </button>
          ))}
        </div>

        {/* Bookings */}
        {tab === 'bookings' && (
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <p className="text-white/30 font-body text-center py-16">Aucun rendez-vous pour le moment.</p>
            ) : bookings.map(b => (
              <div key={b.id} className={`border p-6 ${STATUS_COLORS[b.status] || STATUS_COLORS.pending}`}>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                    <div>
                      <p className="text-xs opacity-50 uppercase tracking-widest font-heading mb-1">Client</p>
                      <p className="text-white font-body font-medium">{b.firstName} {b.lastName}</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-50 uppercase tracking-widest font-heading mb-1">Service</p>
                      <p className="text-white font-body text-sm">{b.service}</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-50 uppercase tracking-widest font-heading mb-1">Date & Heure</p>
                      <p className="text-white font-body text-sm">
                        {b.dateTime ? new Date(b.dateTime).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' }) : b.date} à {b.time}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs opacity-50 uppercase tracking-widest font-heading mb-1">Statut</p>
                      <span className="text-sm font-heading font-bold uppercase">{STATUS_LABELS[b.status]}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={buildGoogleCalendarUrl(b)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 text-white/70 text-xs font-heading uppercase tracking-widest transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5" /> Agenda
                    </a>
                    {b.status !== 'confirmed' && (
                      <button
                        onClick={() => handleStatus(b.id, 'confirmed')}
                        disabled={updating === b.id}
                        className="flex items-center gap-1.5 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 text-xs font-heading uppercase tracking-widest transition-colors"
                      >
                        <CheckCircle className="w-3.5 h-3.5" /> Confirmer
                      </button>
                    )}
                    {b.status !== 'cancelled' && (
                      <button
                        onClick={() => handleStatus(b.id, 'cancelled')}
                        disabled={updating === b.id}
                        className="flex items-center gap-1.5 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-heading uppercase tracking-widest transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Annuler
                      </button>
                    )}
                  </div>
                </div>
                {/* Details */}
                <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <a href={`tel:${b.phone}`} className="flex items-center gap-1.5 text-white/40 hover:text-primary transition-colors">
                    <Phone className="w-3 h-3" /> {b.phone}
                  </a>
                  <a href={`mailto:${b.email}`} className="flex items-center gap-1.5 text-white/40 hover:text-primary transition-colors">
                    <Mail className="w-3 h-3" /> {b.email}
                  </a>
                  <div className="flex items-center gap-1.5 text-white/40">
                    <Car className="w-3 h-3" /> {b.carModel || 'N/A'}
                  </div>
                  {b.message && <div className="text-white/30 italic col-span-2 md:col-span-1">{b.message}</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contacts */}
        {tab === 'contacts' && (
          <div className="space-y-4">
            {contacts.length === 0 ? (
              <p className="text-white/30 font-body text-center py-16">Aucun message de contact.</p>
            ) : contacts.map(c => (
              <div key={c.id} className="bg-anthracite border border-white/5 p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-primary" />
                    <span className="font-heading font-bold text-white">{c.firstName} {c.lastName}</span>
                    {c.subject && <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 font-heading uppercase tracking-widest">{c.subject}</span>}
                  </div>
                  <span className="text-xs text-white/30 font-body">
                    {c.createdAt?.toDate?.()?.toLocaleDateString('fr-FR') || ''}
                  </span>
                </div>
                <p className="text-white/60 font-body text-sm mb-3">{c.message}</p>
                <div className="flex gap-4 text-xs">
                  <a href={`mailto:${c.email}`} className="text-primary hover:underline font-body">{c.email}</a>
                  {c.phone && <a href={`tel:${c.phone}`} className="text-white/40 hover:text-primary font-body">{c.phone}</a>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Imports */}
        {tab === 'imports' && (
          <div className="space-y-4">
            {imports.length === 0 ? (
              <p className="text-white/30 font-body text-center py-16">Aucune demande d'import.</p>
            ) : imports.map(imp => (
              <div key={imp.id} className="bg-anthracite border border-white/5 p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <Car className="w-4 h-4 text-primary" />
                    <span className="font-heading font-bold text-white">{imp.firstName} {imp.lastName}</span>
                    <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 font-heading uppercase tracking-widest">{imp.brand} {imp.model}</span>
                  </div>
                  {imp.budget && <span className="text-white/50 text-sm font-body">Budget : {Number(imp.budget).toLocaleString('fr-FR')} €</span>}
                </div>
                {imp.message && <p className="text-white/50 font-body text-sm mb-3">{imp.message}</p>}
                <div className="flex gap-4 text-xs">
                  <a href={`mailto:${imp.email}`} className="text-primary hover:underline font-body">{imp.email}</a>
                  {imp.phone && <a href={`tel:${imp.phone}`} className="text-white/40 hover:text-primary font-body">{imp.phone}</a>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

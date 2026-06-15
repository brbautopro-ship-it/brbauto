import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'

export default function NotFound() {
  return (
    <main className="pt-20 min-h-screen bg-dark flex items-center">
      <SEO
        title="Page introuvable | BRB Auto Pro"
        description="La page que vous cherchez n'existe pas ou a été déplacée."
        path="/404"
      />
      <div className="container mx-auto px-4 text-center">
        <p className="font-heading font-bold uppercase tracking-[4px] text-primary text-xs mb-4">Erreur</p>
        <h1
          className="font-heading font-black text-primary leading-none mb-6"
          style={{ fontSize: 'clamp(6rem, 18vw, 14rem)' }}
        >
          404
        </h1>
        <h2 className="font-heading font-black uppercase text-white text-3xl md:text-5xl leading-none mb-6">
          PAGE <span className="text-primary">INTROUVABLE</span>
        </h2>
        <p className="text-white/50 font-body max-w-md mx-auto mb-10">
          La page que vous recherchez n'existe pas ou a été déplacée. Retournez à l'accueil pour découvrir nos services.
        </p>
        <Link to="/" className="btn-primary">
          Retour à l'accueil <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </main>
  )
}

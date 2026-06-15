import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const Home = lazy(() => import('./pages/Home'))
const ImportPage = lazy(() => import('./pages/Import'))
const DetailingPage = lazy(() => import('./pages/Detailing'))
const BuySellPage = lazy(() => import('./pages/BuySell'))
const BookingPage = lazy(() => import('./pages/Booking'))
const ContactPage = lazy(() => import('./pages/Contact'))
const AdminPage = lazy(() => import('./pages/Admin'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout({ children }) {
  const { pathname } = useLocation()
  const isAdmin = pathname === '/admin'
  return (
    <>
      <Navbar />
      {children}
      {!isAdmin && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<div className="min-h-screen bg-darker" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/import" element={<ImportPage />} />
            <Route path="/detailing" element={<DetailingPage />} />
            <Route path="/buy-sell" element={<BuySellPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}

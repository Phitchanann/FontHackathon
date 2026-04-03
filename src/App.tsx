import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import KioskPage from './pages/kiosk/KioskPage'
import SignUpPage from './pages/signup/SignUpPage'
import NurseDashboard from './pages/dashboard/NurseDashboard'
import type { Language } from './types/patient'

const queryClient = new QueryClient()

function AppShell() {
  const [dashLang, setDashLang] = useState<Language>('EN')

  return (
    <Routes>
      <Route path="/" element={<KioskPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/dashboard" element={<NurseDashboard lang={dashLang} onLangChange={setDashLang} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-6xl font-heading font-black text-primary">404</h1>
      <p className="text-xl font-body text-text-secondary">Page not found</p>
      <div className="flex gap-4">
        <Link to="/" className="btn-primary">Kiosk</Link>
        <Link to="/dashboard" className="btn-secondary">Dashboard</Link>
        <Link to="/signup" className="btn-ghost">Sign Up</Link>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

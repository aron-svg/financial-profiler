import { Routes, Route } from 'react-router-dom'
import { SimulationProvider } from './context/SimulationContext'
import Layout from './components/Layout'
import Welcome from './pages/Welcome'
import Finances from './pages/Finances'
import Profile from './pages/Profile'
import Results from './pages/Results'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <SimulationProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path="finances" element={<Finances />} />
          <Route path="profil" element={<Profile />} />
          <Route path="resultats" element={<Results />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </SimulationProvider>
  )
}

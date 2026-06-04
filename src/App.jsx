import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import LandingPage from './pages/LandingPage.jsx'
import ReservarPage from './pages/ReservarPage.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/reservar" element={<ReservarPage />} />
      </Route>
    </Routes>
  )
}

export default App

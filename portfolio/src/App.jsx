import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Contact from './pages/Contact'
import PhononViewer from './pages/projects/PhononViewer'
import CadDesigns from './pages/projects/CadDesigns'
import TeachingResources from './pages/projects/TeachingResources'
import './App.css'

function HashScrollManager() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    const targetId = hash.slice(1)

    const scrollToHashTarget = () => {
      const target = document.getElementById(targetId)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    // Wait for route content to commit before measuring the target section.
    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToHashTarget)
    })
  }, [pathname, hash])

  return null
}

function App() {
  return (
    <div className="app">
      <HashScrollManager />
      <Navigation />
      <div className="app-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/phonon-viewer" element={<PhononViewer />} />
        <Route path="/projects/cad-designs" element={<CadDesigns />} />
        <Route path="/projects/teaching-resources" element={<TeachingResources />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      </div>
    </div>
  )
}

export default App

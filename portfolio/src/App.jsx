import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Projects from './pages/Projects'
import PhononViewer from './pages/projects/PhononViewer'
import CadDesigns from './pages/projects/CadDesigns'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navigation />
      <div className="app-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/phonon-viewer" element={<PhononViewer />} />
        <Route path="/projects/cad-designs" element={<CadDesigns />} />
      </Routes>
      </div>
    </div>
  )
}

export default App

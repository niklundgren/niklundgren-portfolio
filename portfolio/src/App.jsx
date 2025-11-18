import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<div className="page-placeholder">Projects page coming soon...</div>} />
        <Route path="/skills" element={<div className="page-placeholder">Skills page coming soon...</div>} />
        <Route path="/contact" element={<div className="page-placeholder">Contact page coming soon...</div>} />
      </Routes>
    </div>
  )
}

export default App

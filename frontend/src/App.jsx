import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import About from './Pages/About'
import Portfolio from './Pages/Portfolio'
import ProjectDetails from './Pages/ProjectDetails'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import ProtectedRoute from './Components/ProtectedRoute'
import Services from './Pages/Services'
import Blogs from './Pages/Blogs'
import BlogDetails from './Pages/BlogDetails'
import Reviews from './Pages/Reviews'
import Contact from './Pages/Contact'
import Faq from './Pages/Faq'
import InteractiveBackground from './Components/InteractiveBackground'
import Footer from './Components/Footer'
import ScrollToTop from './Components/ScrollToTop'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkScreen()
    window.addEventListener('resize', checkScreen, { passive: true })
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  return (
    <Router>
      <ScrollToTop />
      <MotionConfig transition={isMobile ? { duration: 0 } : undefined} reducedMotion={isMobile ? "always" : "never"}>
        <div className="min-h-screen bg-c-bg text-c-text transition-colors duration-300 relative">
        {/* Premium Navbar - dynamically tracks active tab from route location */}
        <Navbar />

        {/* Main Content Area driven by React Router */}
        <main className="relative z-10">
          {/* Dynamic Glassmorphic Interactive Background */}
          <InteractiveBackground />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
              />
            <Route path="/services" element={<Services />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
          </Routes>

          {/* Premium, Interactive & Responsive Footer */}
          <Footer />
        </main>
        
        {/* React Toastify Container for notifications */}
        <ToastContainer 
          position="bottom-right" 
          autoClose={4000} 
          hideProgressBar={false} 
          newestOnTop={false} 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover 
          theme="dark"
        />
      </div>
      </MotionConfig>
    </Router>
  )
}

export default App


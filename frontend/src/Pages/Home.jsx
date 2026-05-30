import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import * as THREE from 'three'
import { ArrowUpRight, Cpu, Sparkles, Briefcase, ShoppingBag, Zap, Heart, Award, Rocket, Target, Search, Compass, Layers, Code2, ShieldCheck, Palette, Globe, BookOpen, PenTool, Monitor, Settings, Smartphone, Bug, Database, Layout, Check, Loader2, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import myImage from '../assets/images/myImage.png'
import devIllustration from '../assets/images/developer_illustration.png'
import Services from '../Components/Services'
import Pricing from '../Components/Pricing'
import Process from '../Components/Process'
import Testimonials from '../Components/Testimonials'
import { useProjectStore } from '../Store/projectStore'

// USER REQUIREMENT: Animated Typing Effect (Perfect character-by-character typing, pause, and deleting loop)
const words = [
  "Frontend Developer",
  "Backend Developer",
  "MERN Stack Developer",
  "Ecommerce Store Builder",
  "WordPress Expert"
]


const Home = () => {
  const mountRef = useRef(null)
  const { projects, fetchProjects, loading } = useProjectStore()
  const [isMobile, setIsMobile] = useState(false)

  // Track screen size to determine mobile/tablet for rendering fallback graphics
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkScreen()
    window.addEventListener('resize', checkScreen, { passive: true })
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [])

  const subtleFadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  // Motivational Words for the scrolling slider section paired with premium styles
  const motivationalWords = [
    { text: "Innovative", icon: <Zap className="w-5 h-5 text-c-primary animate-pulse" /> },
    { text: "Passionate", icon: <Heart className="w-5 h-5 text-c-accent-2" /> },
    { text: "Creative", icon: <Sparkles className="w-5 h-5 text-c-accent animate-pulse" /> },
    { text: "Dedicated", icon: <Award className="w-5 h-5 text-c-primary" /> },
    { text: "Professional", icon: <Briefcase className="w-5 h-5 text-c-accent" /> },
    { text: "Fast Learner", icon: <Rocket className="w-5 h-5 text-c-accent-2 animate-pulse" /> },
    { text: "Problem Solver", icon: <Cpu className="w-5 h-5 text-c-primary" /> },
    { text: "Detail Oriented", icon: <Target className="w-5 h-5 text-c-accent animate-pulse" /> },
  ]
  const reversedMotivationalWords = [...motivationalWords].reverse()



  const [activePricingCat, setActivePricingCat] = useState("development")
  const [isPricingTransitioning, setIsPricingTransitioning] = useState(false)

  const handlePricingCatClick = (catId) => {
    if (catId === activePricingCat) return
    setIsPricingTransitioning(true)
    setTimeout(() => {
      setActivePricingCat(catId)
      setIsPricingTransitioning(false)
    }, 300)
  }

  // Motivational Words for the scrolling slider section paired with premium styles
  const [currentWordIdx, setCurrentWordIdx] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fullWord = words[currentWordIdx]

    // 1. If typing and reached the end of the word -> pause 1.5s and then start deleting
    if (!isDeleting && currentText === fullWord) {
      const timeout = setTimeout(() => setIsDeleting(true), 1500)
      return () => clearTimeout(timeout)
    }

    // 2. If deleting and reached the beginning -> switch to typing the next word
    if (isDeleting && currentText === '') {
      const timeout = setTimeout(() => {
        setIsDeleting(false)
        setCurrentWordIdx((prev) => (prev + 1) % words.length)
      }, 40)
      return () => clearTimeout(timeout)
    }

    // 3. Main character typing or deleting tick
    const tick = () => {
      if (!isDeleting) {
        // Add next character
        setCurrentText(fullWord.substring(0, currentText.length + 1))
      } else {
        // Remove last character
        setCurrentText(fullWord.substring(0, currentText.length - 1))
      }
    }

    // Snappy deleting speed; natural human-like typing speed
    const speed = isDeleting ? 40 : 100 + Math.random() * 40
    const timer = setTimeout(tick, speed)

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentWordIdx])

  useEffect(() => {
    if (window.innerWidth < 1024) return
    if (!mountRef.current) return

    // Scene Setup
    const container = mountRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()
    
    // Transparent WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    container.appendChild(renderer.domElement)

    // Camera Setup - Brought closer to scale up the objects significantly
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.set(0, 1.6, 4.4)
    camera.lookAt(0, 0.35, 0)

    // Scene Group for slow rotations
    const sceneGroup = new THREE.Group()
    scene.add(sceneGroup)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Neon Purple Underglow
    const purpleLight = new THREE.PointLight(0xa855f7, 3, 10)
    purpleLight.position.set(-1.5, -0.2, 0.5)
    sceneGroup.add(purpleLight)

    // Neon Cyan Screen Glow
    const cyanLight = new THREE.PointLight(0x22d3ee, 3, 8)
    cyanLight.position.set(0, 0.6, 0.2)
    sceneGroup.add(cyanLight)

    // Directional Key Light
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9)
    dirLight.position.set(5, 5, 2)
    scene.add(dirLight)

    // ==========================================
    // 3D Scene Geometry Programmatic Generation
    // ==========================================

    // Materials
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.25,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9,
      ior: 1.5,
      side: THREE.DoubleSide
    })

    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x121225,
      roughness: 0.4,
      metalness: 0.8
    })

    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      roughness: 0.3,
      metalness: 0.1,
      emissive: 0x581c87,
      emissiveIntensity: 0.35
    })

    const neonMaterial = new THREE.MeshBasicMaterial({
      color: 0x22d3ee
    })

    // 1. The Desk (Scaled up by 15%)
    const deskTopGeom = new THREE.BoxGeometry(2.7, 0.08, 1.5)
    const deskTop = new THREE.Mesh(deskTopGeom, glassMaterial)
    deskTop.position.set(0, 0, 0)
    sceneGroup.add(deskTop)

    // Desk Legs
    const legGeom = new THREE.CylinderGeometry(0.045, 0.045, 1.2)
    const legPositions = [
      [-1.2, -0.6, 0.65],
      [1.2, -0.6, 0.65],
      [-1.2, -0.6, -0.65],
      [1.2, -0.6, -0.65]
    ]
    legPositions.forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(legGeom, bodyMaterial)
      leg.position.set(x, y, z)
      sceneGroup.add(leg)
    })

    // 2. The Keyboard
    const kbGeom = new THREE.BoxGeometry(0.7, 0.02, 0.22)
    const kb = new THREE.Mesh(kbGeom, bodyMaterial)
    kb.position.set(0, 0.06, 0.3)
    sceneGroup.add(kb)

    // Keyboard Keys
    const keysGeom = new THREE.BoxGeometry(0.64, 0.03, 0.18)
    const keys = new THREE.Mesh(keysGeom, neonMaterial)
    keys.position.set(0, 0.07, 0.3)
    sceneGroup.add(keys)

    // 3. Dynamic Screen Texture (Upscaled to 1024x768 for super-sharp text)
    const textCanvas = document.createElement('canvas')
    textCanvas.width = 1024
    textCanvas.height = 768
    const ctx = textCanvas.getContext('2d')

    const updateScreenTexture = () => {
      if (!ctx) return
      ctx.fillStyle = '#0a0a0f'
      ctx.fillRect(0, 0, 1024, 768)

      // Cyan neon border
      ctx.strokeStyle = '#22d3ee'
      ctx.lineWidth = 14
      ctx.strokeRect(0, 0, 1024, 768)

      // Split bar
      ctx.strokeStyle = '#121225'
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.moveTo(0, 140)
      ctx.lineTo(1024, 140)
      ctx.stroke()

      // Header shell prompt
      ctx.font = 'bold 36px monospace'
      ctx.fillStyle = '#a1a1aa'
      ctx.fillText('system_prompt.sh', 80, 88)

      // Windows control dots
      ctx.fillStyle = '#ef4444' // red
      ctx.beginPath(); ctx.arc(840, 80, 16, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = '#eab308' // yellow
      ctx.beginPath(); ctx.arc(896, 80, 16, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = '#22c55e' // green
      ctx.beginPath(); ctx.arc(952, 80, 16, 0, Math.PI * 2); ctx.fill()

      // Exec command
      ctx.fillStyle = '#a855f7'
      ctx.font = 'bold 38px monospace'
      ctx.fillText('> run greeting.js', 80, 230)

      // USER REQUIREMENT: Crisp Greeting text
      ctx.fillStyle = '#f8fafc'
      ctx.font = 'bold 44px monospace'
      ctx.fillText('“Hi, I am', 80, 345)
      
      ctx.fillStyle = '#22d3ee'
      ctx.font = 'black 54px monospace'
      ctx.fillText('Waqas Tariq', 80, 450)
      
      ctx.fillStyle = '#f8fafc'
      ctx.font = 'bold 44px monospace'
      ctx.fillText(', your developer.”', 80, 555)

      // Footer
      ctx.fillStyle = '#22c55e'
      ctx.font = 'bold 32px monospace'
      ctx.fillText('STATUS: OK (ACTIVE_HOVER)', 80, 680)
    }

    updateScreenTexture()

    const screenTexture = new THREE.CanvasTexture(textCanvas)
    screenTexture.colorSpace = THREE.SRGBColorSpace

    // 4. Computer Screen Object
    const monitorGeom = new THREE.BoxGeometry(1.2, 0.85, 0.06)
    const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture })
    const caseMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, roughness: 0.4 })
    
    // Assign monitor screen text strictly to the FRONT face (index 4)
    const monitorMaterials = [
      caseMaterial, // Right
      caseMaterial, // Left
      caseMaterial, // Top
      caseMaterial, // Bottom
      screenMaterial, // Front
      caseMaterial  // Back
    ]

    const monitor = new THREE.Mesh(monitorGeom, monitorMaterials)
    monitor.position.set(0, 0.55, -0.25)
    // Tilted slightly
    monitor.rotation.x = -0.05
    sceneGroup.add(monitor)

    // Monitor Stand
    const standGeom = new THREE.CylinderGeometry(0.045, 0.055, 0.35)
    const stand = new THREE.Mesh(standGeom, bodyMaterial)
    stand.position.set(0, 0.15, -0.25)
    sceneGroup.add(stand)

    const baseGeom = new THREE.BoxGeometry(0.35, 0.02, 0.3)
    const base = new THREE.Mesh(baseGeom, bodyMaterial)
    base.position.set(0, 0.02, -0.25)
    sceneGroup.add(base)

    // 5. Stylized Low-Poly Boy Character
    const boyGroup = new THREE.Group()
    sceneGroup.add(boyGroup)

    // Head
    const headGeom = new THREE.SphereGeometry(0.26, 16, 16)
    const head = new THREE.Mesh(headGeom, skinMaterial)
    head.position.set(0, 0.95, 0.8)
    boyGroup.add(head)

    // Torso
    const torsoGeom = new THREE.CylinderGeometry(0.24, 0.2, 0.65, 8)
    const torso = new THREE.Mesh(torsoGeom, bodyMaterial)
    torso.position.set(0, 0.4, 0.8)
    boyGroup.add(torso)

    // Arms reaching towards keyboard
    const armGeom = new THREE.CylinderGeometry(0.065, 0.055, 0.4)
    
    const leftArm = new THREE.Mesh(armGeom, bodyMaterial)
    leftArm.position.set(-0.32, 0.45, 0.6)
    leftArm.rotation.set(0.6, 0, -0.2)
    boyGroup.add(leftArm)

    const rightArm = new THREE.Mesh(armGeom, bodyMaterial)
    rightArm.position.set(0.32, 0.45, 0.6)
    rightArm.rotation.set(0.6, 0, 0.2)
    boyGroup.add(rightArm)

    // Forearms
    const forearmGeom = new THREE.CylinderGeometry(0.055, 0.045, 0.35)

    const leftForearm = new THREE.Mesh(forearmGeom, skinMaterial)
    leftForearm.position.set(-0.27, 0.25, 0.4)
    leftForearm.rotation.set(0.9, 0, -0.1)
    boyGroup.add(leftForearm)

    const rightForearm = new THREE.Mesh(forearmGeom, skinMaterial)
    rightForearm.position.set(0.27, 0.25, 0.4)
    rightForearm.rotation.set(0.9, 0, 0.1)
    boyGroup.add(rightForearm)

    // 6. Futuristic Office Chair
    const chairGroup = new THREE.Group()
    sceneGroup.add(chairGroup)

    // Seat Cushion
    const seatGeom = new THREE.BoxGeometry(0.6, 0.08, 0.6)
    const seat = new THREE.Mesh(seatGeom, bodyMaterial)
    seat.position.set(0, 0.08, 0.88)
    chairGroup.add(seat)

    // Backrest
    const backrestGeom = new THREE.BoxGeometry(0.55, 0.8, 0.08)
    const backrest = new THREE.Mesh(backrestGeom, bodyMaterial)
    backrest.position.set(0, 0.55, 1.15)
    backrest.rotation.x = -0.06
    chairGroup.add(backrest)

    // Chair neon strip
    const stripGeom = new THREE.BoxGeometry(0.04, 0.76, 0.09)
    const strip = new THREE.Mesh(stripGeom, neonMaterial)
    strip.position.set(0, 0.55, 1.16)
    strip.rotation.x = -0.06
    chairGroup.add(strip)

    // Chair Support Cylinder
    const cylinderGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.5)
    const cylinder = new THREE.Mesh(cylinderGeom, bodyMaterial)
    cylinder.position.set(0, -0.22, 0.88)
    chairGroup.add(cylinder)

    // Base
    const chairBaseGeom = new THREE.BoxGeometry(0.52, 0.03, 0.52)
    const chairBase = new THREE.Mesh(chairBaseGeom, bodyMaterial)
    chairBase.position.set(0, -0.47, 0.88)
    chairGroup.add(chairBase)

    // Position entire scene slightly down
    sceneGroup.position.y = 0.15

    // ==========================================
    // USER REQUIREMENT: Twinkling Multi-Color Stars
    // ==========================================
    const starsCount = 80
    const starsGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(starsCount * 3)
    const colors = new Float32Array(starsCount * 3)
    const originalY = new Float32Array(starsCount)
    const speedOffsets = new Float32Array(starsCount)

    // Colors: Purple, Cyan, Orange, White
    const starColors = [
      new THREE.Color(0xa855f7), // Purple
      new THREE.Color(0x22d3ee), // Cyan
      new THREE.Color(0xf97316), // Orange
      new THREE.Color(0xffffff)  // White
    ]

    for (let i = 0; i < starsCount; i++) {
      // Position spread
      positions[i * 3] = (Math.random() - 0.5) * 4.2
      positions[i * 3 + 1] = (Math.random() - 0.4) * 2.8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3.8

      originalY[i] = positions[i * 3 + 1]
      speedOffsets[i] = 0.2 + Math.random() * 0.8

      // Assign random cyberpunk color
      const color = starColors[Math.floor(Math.random() * starColors.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Programmatic radial star texture mapping
    const starCanvas = document.createElement('canvas')
    starCanvas.width = 16
    starCanvas.height = 16
    const starCtx = starCanvas.getContext('2d')
    const grad = starCtx.createRadialGradient(8, 8, 0, 8, 8, 8)
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
    starCtx.fillStyle = grad
    starCtx.fillRect(0, 0, 16, 16)
    
    const starTexture = new THREE.CanvasTexture(starCanvas)

    const starsMaterial = new THREE.PointsMaterial({
      size: 0.15,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })

    const starParticles = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(starParticles)

    // ==========================================
    // Animation Loop (Viewport-aware IntersectionObserver optimized)
    // ==========================================
    let animationId
    const clock = new THREE.Clock()
    let isIntersecting = true

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isIntersecting = entry.isIntersecting
      })
    }, { threshold: 0.05 })
    observer.observe(container)

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Skip GPU render / updates if the section is not visible
      if (!isIntersecting) return

      const time = clock.getElapsedTime()

      // USER REQUIREMENT: Smooth 3D sweeping rotation of the entire group (Desk, Boy, Chair, and Monitor screen rotate together in perfect synchronization)
      const sweepRotation = Math.sin(time * 0.2) * (Math.PI / 2.5) // Smooth wide 3D sweep
      sceneGroup.rotation.y = sweepRotation
      sceneGroup.rotation.x = Math.sin(time * 0.3) * 0.02

      // Subtle breathing typing motions
      head.position.y = 0.95 + Math.sin(time * 1.5) * 0.01
      leftForearm.rotation.x = 0.9 + Math.sin(time * 4) * 0.03
      rightForearm.rotation.x = 0.9 + Math.cos(time * 4.5) * 0.03

      // USER REQUIREMENT 5: Animate subtle twinkling and slow floating upward movement for the multi-color stars
      const posArr = starsGeometry.attributes.position.array
      for (let i = 0; i < starsCount; i++) {
        // Slow float up
        posArr[i * 3 + 1] = originalY[i] + (time * 0.05 * speedOffsets[i]) % 2.5
        
        // Horizontal drift wave
        posArr[i * 3] += Math.sin(time * 0.5 + i) * 0.0003
      }
      starsGeometry.attributes.position.needsUpdate = true

      // Stars Twinkling effect
      starsMaterial.opacity = 0.5 + Math.sin(time * 3.5) * 0.35

      renderer.render(scene, camera)
    }

    animate()

    // Resize Handler
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup assets
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
      
      // Clean disposals
      deskTopGeom.dispose()
      legGeom.dispose()
      kbGeom.dispose()
      keysGeom.dispose()
      monitorGeom.dispose()
      standGeom.dispose()
      baseGeom.dispose()
      headGeom.dispose()
      torsoGeom.dispose()
      armGeom.dispose()
      forearmGeom.dispose()
      seatGeom.dispose()
      backrestGeom.dispose()
      stripGeom.dispose()
      cylinderGeom.dispose()
      chairBaseGeom.dispose()
      starsGeometry.dispose()

      glassMaterial.dispose()
      bodyMaterial.dispose()
      skinMaterial.dispose()
      neonMaterial.dispose()
      screenMaterial.dispose()
      caseMaterial.dispose()
      starsMaterial.dispose()
      screenTexture.dispose()
      starTexture.dispose()

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <>
      <section id="home" className="relative min-h-[calc(100vh-5rem)] flex items-center  pt-10 pb-20 overflow-hidden">
      {/* Dynamic Cyberpunk Glow Effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-c-primary/10 rounded-full blur-[100px] pointer-events-none z-1" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-c-accent/10 rounded-full blur-[130px] pointer-events-none z-1" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={subtleFadeUp}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          
          {/* Left Side: Content Area */}
          <div className="lg:col-span-6 space-y-8 text-left animate-in fade-in slide-in-from-left-6 duration-700">
            {/* Availability Glow Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-c-border bg-c-card/85 text-xs font-bold text-c-sec-text tracking-wide shadow-[0_0_15px_rgba(168,85,247,0.05)] select-none">
              <span className="w-2.5 h-2.5 rounded-full bg-c-primary animate-pulse" />
              <span>Available for Premium Fullstack Roles</span>
            </div>

            {/* Premium Heading with Animated Typing Effect */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-c-text">
                Meet Waqas Tariq <br />
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-c-sec-text block mt-1.5 select-none">
                  A passionate{" "}
                  <span className="font-extrabold bg-gradient-to-r from-c-primary via-c-accent to-c-accent-2 bg-clip-text text-transparent drop-shadow-sm inline-flex items-center min-h-[38px] sm:min-h-[46px] lg:min-h-[56px]">
                    {currentText}
                    <span className="w-1 h-[24px] sm:h-[30px] lg:h-[36px] ml-1 bg-c-accent animate-pulse" />
                  </span>
                </span>
              </h1>
              <p className="text-base sm:text-lg text-c-sec-text max-w-lg leading-relaxed font-medium">
                I am a Senior Web Architect and Fullstack Engineer, specializing in creating high-speed React applications, secure backends, MERN systems, and custom Shopify / WordPress e-commerce solutions tailored for growth.
              </p>
            </div>


            {/* Action CTAs (View Projects & My Story Buttons) */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link 
                to="/portfolio"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-c-primary to-c-accent hover:from-c-primary hover:to-c-accent-2 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)] shadow-[0_4px_15px_rgba(168,85,247,0.25)] hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer w-full sm:w-auto text-center"
              >
                <Briefcase className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                <span>View Projects</span>
                <ArrowUpRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link to="/about" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-c-text bg-c-card hover:bg-c-sec-bg/50 border border-c-border hover:border-c-accent/50 hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto cursor-pointer group">
                <BookOpen className="w-4 h-4 text-c-accent transition-transform duration-300 group-hover:scale-110" />
                <span>My Story</span>
                <ArrowUpRight className="w-4 h-4 opacity-50 transform transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

          </div>

          {/* Right Side: Interactive 3D WebGL Canvas Area */}
          <div className="lg:col-span-6 flex justify-center items-center animate-in fade-in slide-in-from-right-6 duration-700 relative">
            {/* Ambient project glowing backlights */}
            <div className="absolute w-[350px] h-[350px] rounded-full bg-c-primary/5 blur-[90px] pointer-events-none z-0" />
            <div className="absolute w-[300px] h-[300px] rounded-full bg-c-accent/5 blur-[100px] pointer-events-none z-0" />
            
            {/* The 3D scene mount container - significantly scaled up and fills the banner */}
            <div 
              ref={mountRef}
              style={{
                maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 62%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 62%, rgba(0,0,0,0) 100%)'
              }}
              className="w-full h-[450px] sm:h-[550px] md:h-[600px] relative z-10 opacity-90 hover:opacity-100 transition-opacity duration-500 cursor-grab active:cursor-grabbing flex items-center justify-center"
            >
              {isMobile && (
                <div className="absolute inset-0 flex items-center justify-center animate-in fade-in zoom-in duration-1000">
                  <img 
                    src={devIllustration}
                    alt="Developer Illustration" 
                    className="w-full h-full max-h-[400px] object-contain drop-shadow-[0_15px_30px_rgba(34,211,238,0.25)] select-none pointer-events-none"
                  />
                </div>
              )}
            </div>
          </div>
         </motion.div>
       </div>
     </section>

    {/* Full-Width Glassmorphic Motivational Text Slider Section */}
    <section className="relative w-full py-10 border-t border-b border-c-border select-none overflow-hidden mt-6">
      {/* Glassy Background Overlay Sandwich Layer */}
      <div className="absolute inset-0 bg-[#FAF9F6]/15 dark:bg-[#0A0A0F]/15 z-1 pointer-events-none" />

      {/* Subtle Ambient Backlights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[280px] h-[280px] bg-c-primary/5 rounded-full blur-[80px] pointer-events-none z-1" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[280px] h-[280px] bg-c-accent/5 rounded-full blur-[80px] pointer-events-none z-1" />

      <div className="w-full flex flex-col gap-6 relative z-20">
        
        {/* Top Row: Left-to-Right Scrolling Marquee */}
        <div className="w-full overflow-hidden flex whitespace-nowrap">
          <div className="animate-marquee-right flex gap-6 items-center">
            {/* Copy 1 */}
            {motivationalWords.map((word, idx) => (
              <div 
                key={`top-c1-${idx}`} 
                className="flex items-center gap-3 px-6 py-3.5 rounded-2xl border border-c-border/40 bg-white/90 dark:bg-c-card/95 shadow-[0_4px_20px_rgba(0,0,0,0.01)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:border-c-primary/20 hover:bg-c-card/70 transition-all duration-300 hover:scale-105"
              >
                {word.icon}
                <span className="text-base sm:text-lg font-bold tracking-wide text-c-text">
                  {word.text}
                </span>
              </div>
            ))}
            {/* Copy 2 */}
            {motivationalWords.map((word, idx) => (
              <div 
                key={`top-c2-${idx}`} 
                className="flex items-center gap-3 px-6 py-3.5 rounded-2xl border border-c-border/40 bg-white/90 dark:bg-c-card/95 shadow-[0_4px_20px_rgba(0,0,0,0.01)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:border-c-primary/20 hover:bg-c-card/70 transition-all duration-300 hover:scale-105"
              >
                {word.icon}
                <span className="text-base sm:text-lg font-bold tracking-wide text-c-text">
                  {word.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row: Right-to-Left Scrolling Marquee */}
        <div className="w-full overflow-hidden flex whitespace-nowrap">
          <div className="animate-marquee-left flex gap-6 items-center">
            {/* Copy 1 */}
            {reversedMotivationalWords.map((word, idx) => (
              <div 
                key={`bot-c1-${idx}`} 
                className="flex items-center gap-3 px-6 py-3.5 rounded-2xl border border-c-border/40 bg-white/90 dark:bg-c-card/95 shadow-[0_4px_20px_rgba(0,0,0,0.01)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:border-c-accent/20 hover:bg-c-card/70 transition-all duration-300 hover:scale-105"
              >
                {word.icon}
                <span className="text-base sm:text-lg font-bold tracking-wide text-c-text">
                  {word.text}
                </span>
              </div>
            ))}
            {/* Copy 2 */}
            {reversedMotivationalWords.map((word, idx) => (
              <div 
                key={`bot-c2-${idx}`} 
                className="flex items-center gap-3 px-6 py-3.5 rounded-2xl border border-c-border/40 bg-white/90 dark:bg-c-card/95 shadow-[0_4px_20px_rgba(0,0,0,0.01)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:border-c-accent/20 hover:bg-c-card/70 transition-all duration-300 hover:scale-105"
              >
                {word.icon}
                <span className="text-base sm:text-lg font-bold tracking-wide text-c-text">
                  {word.text}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>

    {/* Modern Glassy About Me Section */}
    <motion.section 
      id="about" 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative w-full pt-24 pb-12 sm:pt-32 sm:pb-16 border-b border-c-border select-none overflow-hidden"
    >
      {/* Glassy Background Overlay Sandwich Layer */}
      <div className="absolute inset-0 bg-[#FAF9F6]/10 dark:bg-[#0A0A0F]/10 z-1 pointer-events-none" />

      {/* Dynamic Cyberpunk Glow Effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-c-primary/5 rounded-full blur-[90px] pointer-events-none z-1" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] bg-c-accent/5 rounded-full blur-[110px] pointer-events-none z-1" />

      {/* Volumetric Glowing Backlights using `#39bdd3` to ensure highly visible, smooth, and elegant depth */}
      {/* 1. Large, Wide Ambient Outer Glow spanning the entire section (scaled for mobile vs desktop) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[1100px] sm:h-[550px] rounded-full bg-[#39bdd3]/12 dark:bg-[#39bdd3]/10 blur-[80px] sm:blur-[140px] pointer-events-none z-1 animate-pulse duration-[12000ms]" />
      
      {/* 2. High-Intensity Core Glow centered directly behind the glass panel (scaled for mobile vs desktop) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[550px] sm:h-[280px] rounded-full bg-[#39bdd3]/25 dark:bg-[#39bdd3]/20 blur-[50px] sm:blur-[80px] pointer-events-none z-1" />

      <div className="max-w-7xl mx-auto px-4 md:px-5 lg:px-8 w-full relative z-20">
        
        {/* Layer 1: Outer Glass Frame (Responsive padding/corners: p-2 & rounded-3xl on mobile; p-5 & rounded-[56px] on desktop) */}
        <div className="relative p-2 sm:p-5 rounded-[32px] sm:rounded-[56px] border border-black/[0.04] dark:border-white/[0.08] bg-black/[0.005] dark:bg-white/[0.003] shadow-[0_30px_70px_rgba(0,0,0,0.02),0_40px_90px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.12),0_0_50px_rgba(57,189,211,0.06),0_40px_90px_rgba(0,0,0,0.25)] backdrop-blur-lg hover:scale-[1.01] transition-all duration-700 ease-out">
          
          {/* Layer 2: Middle Glass Layer (Responsive padding/corners: p-1.5 & rounded-2xl on mobile; p-4 & rounded-[42px] on desktop) */}
          <div className="relative p-1.5 sm:p-4 rounded-[24px] sm:rounded-[42px] border border-black/[0.06] dark:border-white/[0.12] bg-black/[0.008] dark:bg-white/[0.005] shadow-[0_15px_30px_rgba(0,0,0,0.01),inset_0_1px_1px_rgba(255,255,255,0.25)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
            
            {/* Layer 3: Inner Glass Core Card (Responsive padding/corners: p-5 & rounded-xl on mobile; p-12 & rounded-[28px] on desktop) */}
            <div className="relative p-5 sm:p-12 lg:p-16 rounded-[18px] sm:rounded-[28px] border border-black/[0.08] dark:border-white/[0.18] bg-white/45 dark:bg-white/[0.015] shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] overflow-hidden">
              
              {/* Futuristic Reflective Elements & Refractions (Sheesha highlights) */}
              {/* A. Sweeping Reflective Glass Glare Line */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.03] to-white/[0.08] dark:via-white/[0.01] dark:to-white/[0.05] opacity-75 pointer-events-none" />
              {/* B. 45-degree Diagonal Light Flare */}
              <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/[0.05] dark:via-white/[0.02] to-transparent rotate-45 translate-y-[-50%] pointer-events-none animate-pulse duration-[10000ms]" />
              {/* C. Ambient Neon Corner Glows inside the glass */}
              <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-[#39bdd3]/5 dark:bg-[#39bdd3]/8 blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-[#39bdd3]/5 dark:bg-[#39bdd3]/8 blur-[80px] pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
                
                {/* Left Side: Styled Developer Image Frame */}
                <div className="lg:col-span-5 flex justify-center items-center">
                  <div className="relative group max-w-sm sm:max-w-md w-full">
                    {/* Backlight halo glow overlay */}
                    <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-c-primary to-c-accent opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />
                    
                    {/* Frosted glassy frame */}
                    <div className="relative p-3 rounded-[32px] border border-white/10 dark:border-white/5 bg-white/5 dark:bg-[#1A1A2E]/30 shadow-[0_12px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-700 group-hover:scale-102 group-hover:rotate-[1deg] group-hover:border-c-primary/30 overflow-hidden">
                      <img 
                        src={myImage} 
                        alt="Waqas Tariq" 
                        className="w-full h-[320px] sm:h-[400px] object-cover rounded-2xl select-none pointer-events-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Side: Professional Summary Content Section */}
                <div className="lg:col-span-7 space-y-8 text-left">
                  <div className="space-y-4">
                    {/* Section Pill Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-c-border bg-c-card/85 text-xs font-bold text-c-accent uppercase tracking-wider select-none shadow-[0_0_15px_rgba(34,211,238,0.05)]">
                      About Me
                    </div>
                    
                    {/* Elegant Section Title */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-c-text leading-tight">
                      Crafting Experiences <br />
                      <span className="bg-gradient-to-r from-c-primary via-c-accent to-c-accent-2 bg-clip-text text-transparent">
                        Since 2022
                      </span>
                    </h2>
                  </div>

                  {/* Paragraph Blocks */}
                  <div className="space-y-6 text-base sm:text-lg text-c-sec-text leading-relaxed font-medium">
                    <p>
                      I’m a passionate Web Developer who’s deeply committed to bringing ideas to life through thoughtful, user centered design. Every project I take on is built with care, creativity, and a clear understanding of what the client truly needs. My goal is always to create websites that not only look great but also work smoothly and deliver results.
                    </p>
                    <p>
                      What truly drives me is the satisfaction of solving problems and making a real impact for the people I work with. I believe in clear communication, long term value, and building strong relationships through trust and reliability. I also enjoy sharing what I learn along the way, helping others grow through content on social media.
                    </p>
                  </div>

                  {/* Learn More Interactive glassy Button */}
                  <div className="pt-4">
                    <Link 
                      to="/about"
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-c-text bg-white/10 dark:bg-white/5 hover:bg-c-primary/10 border border-c-border hover:border-c-primary/45 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.01)] hover:shadow-[0_4px_20px_rgba(168,85,247,0.15)] group cursor-pointer"
                    >
                      <span>Learn More</span>
                      <ArrowUpRight className="w-4 h-4 opacity-50 transform transition-transform duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>

    <Process />

    <Services />

    {/* Featured Projects Section */}
    <section className="relative w-full py-16 sm:py-24 border-b border-c-border select-none overflow-hidden text-left bg-white/20 dark:bg-black/10">
      {/* Background ambient glowing shapes */}
      <div className="absolute top-[20%] left-[20%] w-[320px] h-[320px] bg-c-primary/5 rounded-full blur-[90px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[20%] w-[380px] h-[380px] bg-c-accent/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-white/5 text-xs font-bold text-c-accent uppercase tracking-wider">
            Featured Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-c-text">
            My Latest Projects
          </h2>
          <p className="text-slate-500 dark:text-c-sec-text text-sm sm:text-base font-semibold max-w-lg mx-auto">
            Explore a curated selection of my latest full-stack systems, creative frontends, and bespoke applications.
          </p>
        </div>

        {/* Dynamic loading state */}
        {loading && projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-c-primary" />
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Loading masterworks...</p>
          </div>
        ) : projects.length === 0 ? (
          <p className="text-center text-slate-500 dark:text-slate-400 py-12">No projects showcased yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {projects.slice(0, 3).map((proj) => (
              <div
                key={proj._id}
                className="group relative flex flex-col justify-between rounded-[24px] border border-black/[0.08] dark:border-white/[0.12] bg-white/45 dark:bg-white/[0.015] shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md hover:border-c-primary/40 dark:hover:border-c-primary/30 hover:shadow-[0_20px_50px_rgba(168,85,247,0.12)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden"
              >
                {/* Glowing decorative border glare on hover */}
                <div className="absolute -inset-px rounded-[24px] bg-gradient-to-r from-c-primary/0 via-c-accent/0 to-c-accent-2/0 opacity-0 group-hover:opacity-100 group-hover:from-c-primary/10 group-hover:via-c-accent/10 group-hover:to-c-accent-2/10 blur-sm transition-all duration-500 pointer-events-none" />

                <div className="relative z-10">
                  {/* Project Cover Image */}
                  {proj.imageUrl && (
                    <div className="relative w-full h-52 overflow-hidden border-b border-slate-200/80 dark:border-white/10 bg-black/5 dark:bg-black/20">
                      <img
                        src={proj.imageUrl}
                        alt={proj.projectName}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                      />
                      {/* Semi-transparent Neon Category Badges Floating */}
                      {proj.category && (
                        <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-20">
                          {(Array.isArray(proj.category) ? proj.category : [proj.category]).filter(Boolean).map((cat, idx) => (
                            <span key={idx} className="text-[9px] bg-[#06060c]/85 dark:bg-[#06060c]/90 text-c-accent border border-c-accent/30 backdrop-blur-md px-3 py-1 rounded-full font-black tracking-widest uppercase select-none shadow-lg">
                              {cat}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Content Slot */}
                  <div className="p-6 space-y-4">
                    {/* Project Title */}
                    <h3 className="text-xl font-black text-slate-900 dark:text-c-text group-hover:bg-gradient-to-r group-hover:from-c-primary group-hover:to-c-accent group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 truncate">
                      {proj.projectName}
                    </h3>

                    {/* Main Description (Truncated to strictly 2 lines) */}
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 leading-relaxed tracking-wide line-clamp-2 h-10 overflow-hidden">
                      {proj.mainDescription || "No project overview description provided."}
                    </p>

                    {/* Technologies Tags */}
                    {(() => {
                      const techList = (proj.technologies && proj.technologies.length > 0) ? proj.technologies : (proj.tools || []);
                      if (techList.length === 0) return null;
                      return (
                        <div className="space-y-2 pt-2 border-t border-slate-200/40 dark:border-white/5">
                          <div className="flex flex-wrap gap-1.5">
                            {techList.slice(0, 4).map((tech, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 rounded-lg text-[9px] font-bold bg-gradient-to-r from-c-primary/5 to-c-accent/5 dark:from-white/5 dark:to-white/5 border border-slate-200/50 dark:border-white/5 text-slate-600 dark:text-slate-300 shadow-sm"
                              >
                                {tech}
                              </span>
                            ))}
                            {techList.length > 4 && (
                              <span className="px-2.5 py-1 rounded-lg text-[9px] font-black bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-gray-500 border border-slate-200/50 dark:border-white/5">
                                +{techList.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-6 pt-0 border-t border-slate-200/40 dark:border-white/5 mt-4 z-10">
                  <Link
                    to={`/project/${proj._id}`}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-c-primary to-c-accent hover:from-c-primary hover:to-c-accent-2 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg hover:shadow-purple-500/15 transition-all duration-300 cursor-pointer group/btn"
                  >
                    <span>View Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Projects Action CTA */}
        <div className="flex justify-center mt-12">
          <Link
            to="/portfolio"
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-c-primary to-c-accent hover:from-c-primary hover:to-c-accent-2 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] shadow-[0_4px_12px_rgba(168,85,247,0.2)] hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

      </div>
    </section>

    <Pricing />
    <Testimonials />
  </>
)
}

export default Home

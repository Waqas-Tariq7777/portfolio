import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

const InteractiveBackground = () => {
  const location = useLocation()
  const containerRef = useRef(null)
  const glowRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(true)

  // Track screen size for desktop vs phone/tablet
  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkScreen()
    window.addEventListener('resize', checkScreen, { passive: true })
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  // Hide on login page or admin dashboard / admin pages
  const isExcludedRoute = 
    location.pathname === '/login' || 
    location.pathname.startsWith('/dashboard') || 
    location.pathname.startsWith('/admin')

  // Tracking targets, current coordinates, angles, and scroll parallax
  const position = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    targetX: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    targetY: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    angle: 0, // current interpolated angle (radians)
    targetAngle: 0,
    scale: 1.0,
    targetScale: 1.0
  })

  useEffect(() => {
    if (isExcludedRoute || !isDesktop) return
    let animId
    let isLoopRunning = false

    const updatePosition = () => {
      // 1. Calculate coordinate deltas
      const dx = position.current.targetX - position.current.x
      const dy = position.current.targetY - position.current.y
      const speed = Math.sqrt(dx * dx + dy * dy)

      // 2. Interpolate Position (factor 0.085 for smooth spring follow)
      position.current.x += dx * 0.085
      position.current.y += dy * 0.085

      // 3. Dynamic Angle Interpolation following cursor direction
      if (speed > 1.2) {
        position.current.targetAngle = Math.atan2(dy, dx)
      }

      // Handle correct mathematical angle-wrapping (shortest rotation path) to prevent sudden 360-degree spins
      let angleDiff = position.current.targetAngle - position.current.angle
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2
      
      // Lerp angle smoothly (factor 0.12 for highly responsive turning kinetics)
      position.current.angle += angleDiff * 0.12

      // 4. Calculate speed-based scaling & 3D tilt impact
      position.current.targetScale = 1.0 + Math.min(speed * 0.005, 0.22)
      position.current.scale += (position.current.targetScale - position.current.scale) * 0.1

      if (containerRef.current && glowRef.current) {
        // Apply synchronized 3D transform combining translate, rotation, and speed scaling
        // We add Math.PI / 2 (90 degrees) to rotation angle because the default jet SVG points upwards
        containerRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) rotate(${position.current.angle + Math.PI / 2}rad) scale(${position.current.scale})`
        
        // Soft background ambient glow stays aligned with the aircraft
        glowRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`
      }

      // 5. Check if animation values have converged to sleep
      const dScale = position.current.targetScale - position.current.scale

      const isIdle = Math.abs(dx) < 0.08 &&
                     Math.abs(dy) < 0.08 &&
                     Math.abs(angleDiff) < 0.01 &&
                     Math.abs(dScale) < 0.01

      if (isIdle) {
        position.current.x = position.current.targetX
        position.current.y = position.current.targetY
        position.current.angle = position.current.targetAngle
        position.current.scale = position.current.targetScale
        
        // Final precise layout update
        if (containerRef.current && glowRef.current) {
          containerRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) rotate(${position.current.angle + Math.PI / 2}rad) scale(${position.current.scale})`
          glowRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`
        }
        isLoopRunning = false
      } else {
        animId = requestAnimationFrame(updatePosition)
      }
    }

    const startLoopIfNeeded = () => {
      if (!isLoopRunning) {
        isLoopRunning = true
        animId = requestAnimationFrame(updatePosition)
      }
    }

    const handleMouseMove = (e) => {
      position.current.targetX = e.clientX
      position.current.targetY = e.clientY
      startLoopIfNeeded()
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Initial setup and trigger
    isLoopRunning = true
    updatePosition()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animId)
    }
  }, [isExcludedRoute, isDesktop])

  if (isExcludedRoute) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[5] select-none">
      {/* 1. Subtle, Large Cyan/Purple Ambient Spot Backglow */}
      <div 
        ref={glowRef}
        className="absolute top-0 left-0 w-[300px] h-[300px] -ml-[150px] -mt-[150px] rounded-full bg-gradient-to-tr from-c-primary/5 via-c-accent/3 to-transparent blur-[70px] opacity-75 transition-opacity duration-700"
        style={{ willChange: 'transform' }}
      />

      {/* 2. Interactive Aircraft Cursor Follower Wrapper - Hidden on Mobile/Tablet */}
      <div 
        ref={containerRef}
        className="absolute top-0 left-0 w-16 h-16 -ml-8 -mt-8 hidden lg:flex items-center justify-center transition-opacity duration-700 opacity-90"
        style={{ willChange: 'transform' }}
      >
        {/* Soft Glass Outline circular radar shield - optimized by removing expensive backdrop-blur */}
        <div className="absolute inset-0 rounded-full border border-white/10 dark:border-white/5 bg-gradient-to-tr from-white/3 via-white/5 to-white/12 dark:from-white/1 dark:via-white/2 dark:to-white/6 shadow-[0_4px_16px_rgba(0,0,0,0.12),inset_0_2px_4px_rgba(255,255,255,0.06)]" />

        {/* Realistic Stealth Fighter Jet Silhouette (F-22 Raptor) */}
        <svg 
          viewBox="0 0 24 24" 
          className="w-10 h-10 relative z-10 text-c-accent drop-shadow-[0_0_12px_rgba(34,211,238,0.45)]"
          fill="currentColor"
          stroke="none"
        >
          {/* Detailed F-22 Stealth Fighter Geometry */}
          <path d="M12 2c-.1 0-.2.1-.2.2v4.3L8.3 11l-4.5.9c-.2 0-.3.2-.2.4l1.1 1.6h5.8v3.6l-1.8 1.4c-.1.1-.1.3 0 .4l.7.9 2.6-.7 2.6.7.7-.9c.1-.1 0-.3 0-.4l-1.8-1.4v-3.6h5.8l1.1-1.6c.1-.2 0-.4-.2-.4l-4.5-.9-3.5-4.5V2.2c0-.1-.1-.2-.2-.2z" />
        </svg>

        {/* Double-engine afterburner glowing thrusters perfectly aligned with the twin exhausts */}
        {/* Left Exhaust Thruster */}
        <div className="w-1 h-1 rounded-full bg-c-accent-2 absolute bottom-[15px] left-[45.5%] z-20 animate-ping opacity-80" />
        <div className="w-0.5 h-0.5 rounded-full bg-c-accent-2 absolute bottom-[15px] left-[45.5%] z-20 shadow-[0_0_4px_var(--accent-2)]" />

        {/* Right Exhaust Thruster */}
        <div className="w-1 h-1 rounded-full bg-c-accent-2 absolute bottom-[15px] right-[45.5%] z-20 animate-ping opacity-80" />
        <div className="w-0.5 h-0.5 rounded-full bg-c-accent-2 absolute bottom-[15px] right-[45.5%] z-20 shadow-[0_0_4px_var(--accent-2)]" />
      </div>
    </div>
  )
}

export default InteractiveBackground

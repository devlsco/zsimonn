"use client"

import { memo, useState, useEffect, useCallback, useMemo } from "react"
import Image from "next/image"
import { FaTwitch, FaInstagram, FaYoutube, FaTiktok, FaDiscord } from "react-icons/fa"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Particle {
  readonly id: number
  readonly x: number
  readonly y: number
  readonly delay: number
  readonly duration: number
}

interface MousePosition {
  readonly x: number
  readonly y: number
}

interface SocialChannel {
  readonly name: string
  readonly platform: string
  readonly icon: React.ComponentType<{ className?: string }>
  readonly url: string
  readonly colors: {
    readonly bg: string
    readonly hover: string
    readonly shadow: string
  }
}

const PROFILE_CONFIG = {
  name: "zSimonn",
  title: "Content Creator & Twitch Moderator",
  logoPath: "/logo.png",
  logoAlt: "zSimonn Logo"
} as const

const PARTICLE_CONFIG = {
  mobile: 8,
  desktop: 25,
  size: {
    mobile: "w-[3px] h-[3px]",
    desktop: "w-[4px] h-[4px]"
  },
  opacity: {
    mobile: "opacity-50",
    desktop: "opacity-70"
  }
} as const

const SOCIAL_CHANNELS: readonly SocialChannel[] = [
  {
    name: "7Simonn",
    platform: "twitch",
    icon: FaTwitch,
    url: "https://twitch.tv/7simonn",
    colors: {
      bg: "from-[#9146FF] to-[#6441A5]",
      hover: "hover:from-[#9146FF] hover:to-[#6441A5]",
      shadow: "shadow-[#9146FF]/25"
    }
  },
  {
    name: "ulrsimon",
    platform: "instagram",
    icon: FaInstagram,
    url: "https://instagram.com/ulrsimon",
    colors: {
      bg: "from-[#833AB4] to-[#FD1D1D]",
      hover: "hover:from-[#833AB4] hover:to-[#FD1D1D]",
      shadow: "shadow-[#E1306C]/25"
    }
  },
  {
    name: "zSimonn",
    platform: "tiktok",
    icon: FaTiktok,
    url: "https://www.tiktok.com/@zsimonn",
    colors: {
      bg: "from-[#FF0050] to-[#00F2EA]",
      hover: "hover:from-[#FF0050] hover:to-[#00F2EA]",
      shadow: "shadow-[#FF0050]/25"
    }
  },
  {
    name: "Simon's Lounge",
    platform: "discord",
    icon: FaDiscord,
    url: "https://discord.gg/9Gx43wBddD",
    colors: {
      bg: "from-[#5865F2] to-[#4752C4]",
      hover: "hover:from-[#5865F2] hover:to-[#4752C4]",
      shadow: "shadow-[#5865F2]/25"
    }
  },
  {
    name: "7Simonn",
    platform: "youtube",
    icon: FaYoutube,
    url: "https://www.youtube.com/@7simonn",
    colors: {
      bg: "from-[#FF0000] to-[#CC0000]",
      hover: "hover:from-[#FF0000] hover:to-[#CC0000]",
      shadow: "shadow-[#FF0000]/25"
    }
  }
] as const

const STYLES = {
  container: "min-h-screen w-full relative overflow-hidden",
  background: "bg-gradient-to-br from-black via-blue-950 to-black",
  centerFlex: "flex items-center justify-center",
  card: "bg-black/30 backdrop-blur-3xl border border-blue-500/20 rounded-2xl md:rounded-3xl",
  shadow: "shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40",
  transition: "transition-all duration-500 ease-out hover:scale-[1.01]",
  gradientText: "bg-gradient-to-r from-white via-blue-200 to-blue-100 bg-clip-text text-transparent"
} as const

const generateParticles = (count: number): Particle[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 4,
    duration: Math.random() * 4 + 8
  }))

const getParticleGradient = (id: number): string => {
  const gradients = [
    'linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%)',
    'linear-gradient(180deg, #818cf8 0%, #4f46e5 100%)',
    'linear-gradient(180deg, #a78bfa 0%, #7c3aed 100%)'
  ]
  return gradients[id % 3]
}

const BackgroundOverlays = memo(() => (
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(120,119,198,0.2)_0%,_transparent_60%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,119,198,0.2)_0%,_transparent_60%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(120,200,255,0.1)_0%,_transparent_70%)]" />
  </div>
))

interface MouseFollowerProps {
  position: MousePosition
  isMobile: boolean
}

const MouseFollower = memo<MouseFollowerProps>(({ position, isMobile }) => {
  if (isMobile) return null

  return (
    <div
      className="fixed w-64 md:w-96 h-64 md:h-96 pointer-events-none z-0 opacity-20 blur-3xl transition-all duration-500 ease-out will-change-transform"
      style={{
        background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(236,72,153,0.3) 50%, transparent 100%)',
        transform: `translate(${position.x - 192}px, ${position.y - 192}px)`,
      }}
    />
  )
})

interface ParticleProps {
  particle: Particle
  isMobile: boolean
}

const Particle = memo<ParticleProps>(({ particle, isMobile }) => (
  <div
    className={`absolute ${isMobile ? PARTICLE_CONFIG.size.mobile : PARTICLE_CONFIG.size.desktop} rounded-full ${isMobile ? PARTICLE_CONFIG.opacity.mobile : PARTICLE_CONFIG.opacity.desktop}`}
    style={{
      left: `${particle.x}%`,
      top: `${particle.y}%`,
      background: getParticleGradient(particle.id),
      animation: `particle${particle.id % 3} ${particle.duration}s linear 0s infinite`,
    }}
  />
))

interface ProfileHeaderProps {
  isMobile: boolean
}

const ProfileHeader = memo<ProfileHeaderProps>(({ isMobile }) => (
  <div className="text-center space-y-2 md:space-y-4">
    <div className="relative mx-auto w-16 h-16 md:w-24 md:h-24">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-75 -m-0.5" />
      <Image
        src={PROFILE_CONFIG.logoPath}
        alt={PROFILE_CONFIG.logoAlt}
        width={isMobile ? 64 : 96}
        height={isMobile ? 64 : 96}
        className="rounded-full object-cover relative z-10"
        priority
      />
    </div>

    <div className="space-y-1">
      <h1 className="text-2xl md:text-4xl font-black bg-gradient-to-r from-white via-blue-200 to-blue-100 bg-clip-text text-transparent tracking-wide">
        {PROFILE_CONFIG.name}
      </h1>
      <p className="text-blue-300/80 font-medium text-sm md:text-base">
        {PROFILE_CONFIG.title}
      </p>
    </div>
  </div>
))

interface SocialButtonProps {
  channel: SocialChannel
  index: number
}

const SocialButton = memo<SocialButtonProps>(({ channel, index }) => (
  <Button
    variant="outline"
    size="lg"
    className={`w-full h-14 md:h-16 bg-gradient-to-r ${channel.colors.bg} ${channel.colors.hover} transition-all duration-300 border-0 text-white hover:text-white font-bold shadow-2xl ${channel.colors.shadow} transform-gpu transition duration-500 ease-out will-change-transform group rounded-xl md:rounded-2xl relative overflow-hidden hover:shadow-[0_0_25px_2px_rgba(255,255,255,0.1)] hover:brightness-110`}
    asChild
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <a
      href={channel.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${channel.name} on ${channel.platform}`}
    >
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative flex items-center justify-between w-full px-2 md:px-3">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="p-1.5 md:p-2 bg-white/20 rounded-lg md:rounded-xl transition-transform duration-300 group-hover:scale-110">
            <channel.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div className="text-left">
            <div className="font-bold text-sm md:text-lg">{channel.name}</div>
          </div>
        </div>
        <div className="text-right">
          <ExternalLink className="w-8 h-8 md:w-10 md:h-10 transition-all duration-300 ease-out group-hover:scale-110" />
        </div>
      </div>
    </a>
  </Button>
))

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const particleCount = isMobile ? PARTICLE_CONFIG.mobile : PARTICLE_CONFIG.desktop
    setParticles(generateParticles(particleCount))
  }, [isMobile])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isMobile) {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
  }, [isMobile])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
    }

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove, isMobile])

  const particleElements = useMemo(
    () => particles.map((particle) => (
      <Particle key={particle.id} particle={particle} isMobile={isMobile} />
    )),
    [particles, isMobile]
  )

  const socialButtons = useMemo(
    () => SOCIAL_CHANNELS.map((channel, index) => (
      <SocialButton key={`${channel.platform}-${channel.name}-${index}`} channel={channel} index={index} />
    )),
    []
  )

  return (
    <div className={`${STYLES.container} ${STYLES.background}`}>
      <BackgroundOverlays />
      
      <MouseFollower position={mousePosition} isMobile={isMobile} />
      
      {particleElements}
      
      <div className={`relative z-10 min-h-screen ${STYLES.centerFlex} p-3 md:p-6`}>
        <Card className={`w-full max-w-sm md:max-w-lg ${STYLES.card} ${STYLES.shadow} transform-gpu transition duration-500 ease-out will-change-transform`}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/5 rounded-2xl md:rounded-3xl" />

          <CardContent className="relative p-3 md:p-6 space-y-4 md:space-y-6">
            <ProfileHeader isMobile={isMobile} />
            
            <nav className="space-y-3 md:space-y-4" role="navigation" aria-label="Social media links">
              {socialButtons}
            </nav>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
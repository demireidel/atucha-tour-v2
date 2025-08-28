"use client"

import { Suspense, useState } from "react"
import dynamic from "next/dynamic"
import { Canvas } from "@react-three/fiber"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Play,
  Clock,
  Users,
  Shield,
  Zap,
  Building,
  ArrowLeft,
  Sun,
  Moon,
  Monitor,
  ChevronRight,
  Star,
  Award,
  Globe,
} from "lucide-react"
import { useTheme } from "next-themes"
import { TourControls } from "@/components/tour-controls"
import { LoadingSpinner } from "@/components/loading-spinner"
import { StatsPanel } from "@/components/stats-panel"

const AtuchaScene = dynamic(() => import("@/components/atucha-scene"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
})

const TOURS = [
  {
    id: "reactor-core",
    title: "Reactor Core Journey",
    description:
      "Explore the heart of nuclear power generation, walking through the reactor vessel and control systems with unprecedented detail.",
    duration: "12 minutes",
    highlights: ["Reactor Pressure Vessel", "Control Rod Systems", "Steam Generators", "Primary Coolant Loop"],
    icon: <Zap className="h-5 w-5" />,
    difficulty: "Beginner",
    rating: 4.9,
    participants: "2.3k",
    category: "Core Systems",
  },
  {
    id: "turbine-hall",
    title: "Turbine Hall Experience",
    description:
      "Discover how nuclear energy transforms into electricity through massive turbogenerators and advanced power conversion systems.",
    duration: "10 minutes",
    highlights: ["Steam Turbines", "Generator Hall", "Energy Conversion", "Power Distribution"],
    icon: <Building className="h-5 w-5" />,
    difficulty: "Intermediate",
    rating: 4.8,
    participants: "1.8k",
    category: "Power Generation",
  },
  {
    id: "safety-systems",
    title: "Safety Systems Tour",
    description:
      "Learn about the multiple layers of safety that protect workers and the environment through redundant safety systems.",
    duration: "15 minutes",
    highlights: ["Emergency Systems", "Containment", "Safety Protocols", "Backup Systems"],
    icon: <Shield className="h-5 w-5" />,
    difficulty: "Advanced",
    rating: 4.9,
    participants: "1.5k",
    category: "Safety & Security",
  },
  {
    id: "control-room",
    title: "Control Room Operations",
    description:
      "Step into the nerve center where operators monitor and control the entire facility using advanced digital systems.",
    duration: "8 minutes",
    highlights: ["Control Panels", "Monitoring Systems", "Operations Center", "Digital Interfaces"],
    icon: <Monitor className="h-5 w-5" />,
    difficulty: "Intermediate",
    rating: 4.7,
    participants: "2.1k",
    category: "Operations",
  },
  {
    id: "complete-facility",
    title: "Complete Facility Overview",
    description:
      "A comprehensive tour covering all major systems and areas of the Atucha II plant with expert commentary.",
    duration: "25 minutes",
    highlights: ["Complete Plant Tour", "All Major Systems", "Comprehensive Overview", "Expert Commentary"],
    icon: <Globe className="h-5 w-5" />,
    difficulty: "All Levels",
    rating: 4.9,
    participants: "3.2k",
    category: "Complete Experience",
  },
]

const DIFFICULTY_COLORS = {
  Beginner: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  Intermediate: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  Advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  "All Levels": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
}

export default function HomePage() {
  const [selectedTour, setSelectedTour] = useState<string | null>(null)
  const [isInTour, setIsInTour] = useState(false)
  const [tourProgress, setTourProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { theme, setTheme } = useTheme()

  const startTour = async (tourId: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate loading
    setSelectedTour(tourId)
    setIsInTour(true)
    setTourProgress(0)
    setIsLoading(false)
  }

  const exitTour = () => {
    setSelectedTour(null)
    setIsInTour(false)
    setTourProgress(0)
  }

  const currentTour = TOURS.find((t) => t.id === selectedTour)

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <LoadingSpinner />
      </div>
    )
  }

  if (isInTour && currentTour) {
    return (
      <div className="h-screen w-full relative overflow-hidden bg-background">
        {/* 3D Scene */}
        <div className="absolute inset-0">
          <Canvas
            camera={{ position: [50, 20, 50], fov: 60 }}
            shadows
            gl={{ antialias: true, alpha: false }}
            dpr={[1, 2]}
          >
            <Suspense fallback={null}>
              <AtuchaScene tourId={selectedTour} onProgressUpdate={setTourProgress} />
            </Suspense>
          </Canvas>
        </div>

        {/* Tour UI Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-6 pointer-events-auto">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={exitTour}
                className="bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background/90"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Exit Tour
              </Button>

              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                  {currentTour.category}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Panel */}
          <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-auto">
            <Card className="bg-background/90 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {currentTour.icon}
                    <div>
                      <CardTitle className="text-lg font-bold">{currentTour.title}</CardTitle>
                      <CardDescription className="text-sm">{currentTour.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {currentTour.duration}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{Math.round(tourProgress)}%</span>
                  </div>
                  <Progress value={tourProgress} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-current text-amber-500" />
                        {currentTour.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {currentTour.participants}
                      </div>
                    </div>
                    <TourControls />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="mb-4 pulse-glow">
                <Award className="h-3 w-3 mr-1" />
                Premium Nuclear Engineering Experience
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black text-balance leading-tight">
                Explore the Engineering Marvel of <span className="text-primary">Atucha II</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
                Immerse yourself in premium guided virtual tours and discover the cutting-edge technology behind
                Argentina's most advanced nuclear power facility.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 font-semibold"
                onClick={() => document.getElementById("tours")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Play className="h-5 w-5 mr-2" />
                Start Virtual Tour
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 bg-transparent"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn More
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </div>

            <StatsPanel />
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section id="tours" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-balance">Premium Virtual Tours</h2>
              <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
                Choose from our expertly designed tours, each crafted to provide deep insights into different aspects of
                nuclear power generation.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {TOURS.map((tour) => (
                <Card
                  key={tour.id}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/20"
                >
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {tour.icon}
                      </div>
                      <Badge
                        variant="secondary"
                        className={DIFFICULTY_COLORS[tour.difficulty as keyof typeof DIFFICULTY_COLORS]}
                      >
                        {tour.difficulty}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                        {tour.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">{tour.description}</CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {tour.duration}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-current text-amber-500" />
                          <span className="font-medium">{tour.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {tour.participants}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm">Tour Highlights:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {tour.highlights.map((highlight) => (
                          <Badge key={highlight} variant="outline" className="text-xs justify-center py-1">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      className="w-full font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      onClick={() => startTour(tour.id)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Tour
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-balance">Safety & Excellence</h2>
              <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
                Our virtual tours are developed in collaboration with nuclear engineers and safety experts, ensuring
                accurate representation of safety protocols and operational procedures.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="text-center border-border/50">
                <CardHeader className="space-y-4">
                  <div className="mx-auto p-3 rounded-full bg-primary/10 text-primary w-fit">
                    <Shield className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl font-bold">Safety First</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    Multiple safety systems and protocols ensure the highest standards of nuclear safety education.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center border-border/50">
                <CardHeader className="space-y-4">
                  <div className="mx-auto p-3 rounded-full bg-secondary/10 text-secondary w-fit">
                    <Zap className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl font-bold">Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    Cutting-edge nuclear technology showcased through immersive 3D visualization.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center border-border/50">
                <CardHeader className="space-y-4">
                  <div className="mx-auto p-3 rounded-full bg-accent/10 text-accent w-fit">
                    <Award className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl font-bold">Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    Guided by industry professionals and nuclear engineering experts.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

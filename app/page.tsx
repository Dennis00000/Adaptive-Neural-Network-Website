"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Brain,
  Zap,
  Activity,
  Cpu,
  Network,
  Sparkles,
  RotateCcw,
  Eye,
  TrendingUp,
  Palette,
  Moon,
  Droplets,
  Flame,
  Leaf,
  Cloud,
  Download,
  FileJson,
  FileText,
  Copy,
  Check,
} from "lucide-react"

// Theme types and interfaces
type ThemeType = "adaptive" | "neural" | "cosmic" | "ember" | "ocean" | "forest" | "tech"

interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  backgroundGradient: string
  text: string
  border: string
  neuronTypes: {
    memory: [number, number, number]
    processing: [number, number, number]
    creative: [number, number, number]
    analytical: [number, number, number]
    emotional: [number, number, number]
  }
}

interface Theme {
  id: ThemeType
  name: string
  icon: React.ReactNode
  colors: ThemeColors
  particleCount: number
  particleColor: string
  particleSize: number
  glowIntensity: number
  description: string
}

interface Neuron {
  id: string
  x: number
  y: number
  active: boolean
  content: {
    title: string
    description: string
    type: "memory" | "processing" | "creative" | "analytical" | "emotional"
  }
  connections: string[]
  pulseIntensity: number
  // Adaptive behavior properties
  activationCount: number
  learningRate: number
  strength: number
  lastActivated: number
  adaptiveConnections: string[]
  experienceLevel: number
}

interface Synapse {
  from: string
  to: string
  active: boolean
  strength: number
  // Adaptive properties
  usageCount: number
  efficiency: number
  lastUsed: number
  adaptiveStrength: number
}

interface LearningPattern {
  id: string
  name: string
  description: string
  neurons: string[]
  strength: number
  discoveredAt: number
}

// Export data interface
interface ExportData {
  version: string
  exportDate: string
  networkState: {
    neurons: Neuron[]
    synapses: Synapse[]
    learningPatterns: LearningPattern[]
  }
  analytics: {
    totalNeurons: number
    totalSynapses: number
    totalInteractions: number
    totalPatterns: number
    averageStrength: number
    totalExperience: number
    sessionTime: number
    dominantNeuronType: string
  }
  theme: ThemeType
}

export default function NeuralNetworkExplorer() {
  const [neurons, setNeurons] = useState<Neuron[]>([])
  const [synapses, setSynapses] = useState<Synapse[]>([])
  const [activeNeuron, setActiveNeuron] = useState<string | null>(null)
  const [thoughtWave, setThoughtWave] = useState(0)
  const [isThinking, setIsThinking] = useState(false)
  const [showConnections, setShowConnections] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [viewMode, setViewMode] = useState<"normal" | "focus" | "overview">("normal")
  const [learningMode, setLearningMode] = useState(true)
  const [learningPatterns, setLearningPatterns] = useState<LearningPattern[]>([])
  const [sessionTime, setSessionTime] = useState(0)
  const [totalInteractions, setTotalInteractions] = useState(0)
  const [currentTheme, setCurrentTheme] = useState<ThemeType>("adaptive")
  const [themeMenuOpen, setThemeMenuOpen] = useState(false)
  const [dominantNeuronType, setDominantNeuronType] = useState<string>("processing")
  const [themeTransitioning, setThemeTransitioning] = useState(false)
  const [exportMenuOpen, setExportMenuOpen] = useState(false)
  const [exportFormat, setExportFormat] = useState<"json" | "text">("json")
  const [exportSuccess, setExportSuccess] = useState(false)
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  // Define themes
  const themes: Record<ThemeType, Theme> = {
    adaptive: {
      id: "adaptive",
      name: "Adaptive",
      icon: <Brain />,
      colors: {
        primary: "#3b82f6",
        secondary: "#8b5cf6",
        accent: "#ec4899",
        background: "#000000",
        backgroundGradient: "from-blue-900/20 via-purple-900/10 to-transparent",
        text: "#ffffff",
        border: "#1f2937",
        neuronTypes: {
          memory: [59, 130, 246], // blue
          processing: [16, 185, 129], // green
          creative: [236, 72, 153], // pink
          analytical: [245, 158, 11], // amber
          emotional: [239, 68, 68], // red
        },
      },
      particleCount: 80,
      particleColor: "#3b82f6",
      particleSize: 1,
      glowIntensity: 1.0,
      description: "Dynamically adapts to your neural network's dominant patterns",
    },
    neural: {
      id: "neural",
      name: "Neural",
      icon: <Cpu />,
      colors: {
        primary: "#3b82f6",
        secondary: "#8b5cf6",
        accent: "#ec4899",
        background: "#000000",
        backgroundGradient: "from-blue-900/20 via-purple-900/10 to-transparent",
        text: "#ffffff",
        border: "#1f2937",
        neuronTypes: {
          memory: [59, 130, 246], // blue
          processing: [16, 185, 129], // green
          creative: [236, 72, 153], // pink
          analytical: [245, 158, 11], // amber
          emotional: [239, 68, 68], // red
        },
      },
      particleCount: 80,
      particleColor: "#3b82f6",
      particleSize: 1,
      glowIntensity: 1.0,
      description: "Classic neural network visualization with blue accents",
    },
    cosmic: {
      id: "cosmic",
      name: "Cosmic",
      icon: <Moon />,
      colors: {
        primary: "#8b5cf6",
        secondary: "#6366f1",
        accent: "#ec4899",
        background: "#0f172a",
        backgroundGradient: "from-indigo-900/20 via-purple-900/10 to-transparent",
        text: "#f3f4f6",
        border: "#1e293b",
        neuronTypes: {
          memory: [139, 92, 246], // purple
          processing: [99, 102, 241], // indigo
          creative: [236, 72, 153], // pink
          analytical: [167, 139, 250], // violet
          emotional: [244, 114, 182], // fuchsia
        },
      },
      particleCount: 120,
      particleColor: "#c4b5fd",
      particleSize: 1.5,
      glowIntensity: 1.2,
      description: "Deep space inspired theme with cosmic particles",
    },
    ember: {
      id: "ember",
      name: "Ember",
      icon: <Flame />,
      colors: {
        primary: "#ef4444",
        secondary: "#f59e0b",
        accent: "#f97316",
        background: "#18181b",
        backgroundGradient: "from-red-900/20 via-orange-900/10 to-transparent",
        text: "#fafafa",
        border: "#27272a",
        neuronTypes: {
          memory: [239, 68, 68], // red
          processing: [249, 115, 22], // orange
          creative: [245, 158, 11], // amber
          analytical: [234, 88, 12], // orange-dark
          emotional: [220, 38, 38], // red-dark
        },
      },
      particleCount: 60,
      particleColor: "#fca5a5",
      particleSize: 1.2,
      glowIntensity: 1.5,
      description: "Warm, energetic theme with fiery particles",
    },
    ocean: {
      id: "ocean",
      name: "Ocean",
      icon: <Droplets />,
      colors: {
        primary: "#0ea5e9",
        secondary: "#06b6d4",
        accent: "#3b82f6",
        background: "#0c4a6e",
        backgroundGradient: "from-cyan-900/30 via-blue-900/20 to-transparent",
        text: "#f0f9ff",
        border: "#0c4a6e",
        neuronTypes: {
          memory: [14, 165, 233], // sky
          processing: [6, 182, 212], // cyan
          creative: [59, 130, 246], // blue
          analytical: [2, 132, 199], // sky-dark
          emotional: [8, 145, 178], // cyan-dark
        },
      },
      particleCount: 100,
      particleColor: "#7dd3fc",
      particleSize: 1.3,
      glowIntensity: 0.8,
      description: "Calming blue tones inspired by deep ocean depths",
    },
    forest: {
      id: "forest",
      name: "Forest",
      icon: <Leaf />,
      colors: {
        primary: "#10b981",
        secondary: "#059669",
        accent: "#65a30d",
        background: "#064e3b",
        backgroundGradient: "from-green-900/30 via-emerald-900/20 to-transparent",
        text: "#ecfdf5",
        border: "#064e3b",
        neuronTypes: {
          memory: [16, 185, 129], // emerald
          processing: [5, 150, 105], // emerald-dark
          creative: [101, 163, 13], // lime
          analytical: [22, 163, 74], // green
          emotional: [4, 120, 87], // emerald-darker
        },
      },
      particleCount: 70,
      particleColor: "#6ee7b7",
      particleSize: 1.1,
      glowIntensity: 0.7,
      description: "Natural green tones inspired by lush forests",
    },
    tech: {
      id: "tech",
      name: "Tech",
      icon: <Cloud />,
      colors: {
        primary: "#6366f1",
        secondary: "#2563eb",
        accent: "#7c3aed",
        background: "#111827",
        backgroundGradient: "from-gray-900/30 via-slate-900/20 to-transparent",
        text: "#f9fafb",
        border: "#1f2937",
        neuronTypes: {
          memory: [99, 102, 241], // indigo
          processing: [37, 99, 235], // blue
          creative: [124, 58, 237], // violet
          analytical: [79, 70, 229], // indigo-dark
          emotional: [67, 56, 202], // indigo-darker
        },
      },
      particleCount: 90,
      particleColor: "#a5b4fc",
      particleSize: 1,
      glowIntensity: 1.1,
      description: "Modern tech-inspired theme with digital particles",
    },
  }

  // Initialize neural network with adaptive properties
  useEffect(() => {
    const initialNeurons: Neuron[] = [
      {
        id: "welcome",
        x: 400,
        y: 300,
        active: true,
        content: {
          title: "Welcome to the Neural Web",
          description:
            "You are now inside a digital consciousness. Each neuron contains unique experiences and knowledge.",
          type: "processing",
        },
        connections: ["creativity", "memory", "logic"],
        pulseIntensity: 1,
        activationCount: 1,
        learningRate: 0.1,
        strength: 1.0,
        lastActivated: Date.now(),
        adaptiveConnections: [],
        experienceLevel: 1,
      },
      {
        id: "creativity",
        x: 200,
        y: 150,
        active: false,
        content: {
          title: "Creative Cortex",
          description: "Where imagination flows like electric dreams. Art, music, and innovation spark here.",
          type: "creative",
        },
        connections: ["welcome", "emotion", "memory", "inspiration"],
        pulseIntensity: 0.3,
        activationCount: 0,
        learningRate: 0.15,
        strength: 0.8,
        lastActivated: 0,
        adaptiveConnections: [],
        experienceLevel: 1,
      },
      {
        id: "memory",
        x: 600,
        y: 150,
        active: false,
        content: {
          title: "Memory Palace",
          description:
            "Vast archives of experiences, knowledge, and forgotten dreams stored in crystalline structures.",
          type: "memory",
        },
        connections: ["welcome", "creativity", "logic", "learning"],
        pulseIntensity: 0.5,
        activationCount: 0,
        learningRate: 0.12,
        strength: 0.9,
        lastActivated: 0,
        adaptiveConnections: [],
        experienceLevel: 1,
      },
      {
        id: "logic",
        x: 500,
        y: 450,
        active: false,
        content: {
          title: "Logic Engine",
          description: "Pure reasoning and computational power. Where problems dissolve into elegant solutions.",
          type: "analytical",
        },
        connections: ["welcome", "memory", "emotion", "calculation"],
        pulseIntensity: 0.4,
        activationCount: 0,
        learningRate: 0.08,
        strength: 0.95,
        lastActivated: 0,
        adaptiveConnections: [],
        experienceLevel: 1,
      },
      {
        id: "emotion",
        x: 150,
        y: 400,
        active: false,
        content: {
          title: "Emotional Core",
          description: "The heart of consciousness. Where feelings create colors that paint all experiences.",
          type: "emotional",
        },
        connections: ["creativity", "logic", "intuition", "empathy"],
        pulseIntensity: 0.6,
        activationCount: 0,
        learningRate: 0.18,
        strength: 0.85,
        lastActivated: 0,
        adaptiveConnections: [],
        experienceLevel: 1,
      },
      {
        id: "intuition",
        x: 700,
        y: 350,
        active: false,
        content: {
          title: "Intuitive Nexus",
          description: "Beyond logic lies knowing. Where patterns emerge from chaos and wisdom whispers.",
          type: "processing",
        },
        connections: ["emotion", "memory", "future", "insight"],
        pulseIntensity: 0.7,
        activationCount: 0,
        learningRate: 0.14,
        strength: 0.75,
        lastActivated: 0,
        adaptiveConnections: [],
        experienceLevel: 1,
      },
      {
        id: "future",
        x: 400,
        y: 100,
        active: false,
        content: {
          title: "Future Sight",
          description: "Probability cascades and potential timelines. Where tomorrow takes shape.",
          type: "analytical",
        },
        connections: ["intuition", "creativity", "planning"],
        pulseIntensity: 0.2,
        activationCount: 0,
        learningRate: 0.1,
        strength: 0.7,
        lastActivated: 0,
        adaptiveConnections: [],
        experienceLevel: 1,
      },
      {
        id: "inspiration",
        x: 100,
        y: 200,
        active: false,
        content: {
          title: "Inspiration Hub",
          description: "Where sudden insights and breakthrough moments are born from the void.",
          type: "creative",
        },
        connections: ["creativity", "future"],
        pulseIntensity: 0.4,
        activationCount: 0,
        learningRate: 0.2,
        strength: 0.6,
        lastActivated: 0,
        adaptiveConnections: [],
        experienceLevel: 1,
      },
      {
        id: "learning",
        x: 650,
        y: 250,
        active: false,
        content: {
          title: "Learning Center",
          description: "Adaptive pathways that grow stronger with each new experience and discovery.",
          type: "memory",
        },
        connections: ["memory", "logic"],
        pulseIntensity: 0.5,
        activationCount: 0,
        learningRate: 0.25,
        strength: 0.8,
        lastActivated: 0,
        adaptiveConnections: [],
        experienceLevel: 1,
      },
      {
        id: "calculation",
        x: 550,
        y: 500,
        active: false,
        content: {
          title: "Calculation Matrix",
          description: "Pure mathematical processing where numbers dance in perfect harmony.",
          type: "analytical",
        },
        connections: ["logic", "planning"],
        pulseIntensity: 0.3,
        activationCount: 0,
        learningRate: 0.06,
        strength: 0.9,
        lastActivated: 0,
        adaptiveConnections: [],
        experienceLevel: 1,
      },
      {
        id: "empathy",
        x: 50,
        y: 350,
        active: false,
        content: {
          title: "Empathy Network",
          description: "Understanding others through shared emotional resonance and connection.",
          type: "emotional",
        },
        connections: ["emotion", "insight"],
        pulseIntensity: 0.6,
        activationCount: 0,
        learningRate: 0.16,
        strength: 0.75,
        lastActivated: 0,
        adaptiveConnections: [],
        experienceLevel: 1,
      },
      {
        id: "insight",
        x: 750,
        y: 400,
        active: false,
        content: {
          title: "Insight Generator",
          description: "Where deep understanding emerges from the synthesis of knowledge and experience.",
          type: "processing",
        },
        connections: ["intuition", "empathy"],
        pulseIntensity: 0.7,
        activationCount: 0,
        learningRate: 0.13,
        strength: 0.8,
        lastActivated: 0,
        adaptiveConnections: [],
        experienceLevel: 1,
      },
      {
        id: "planning",
        x: 450,
        y: 550,
        active: false,
        content: {
          title: "Strategic Planning",
          description: "Orchestrating complex sequences of actions toward desired outcomes.",
          type: "analytical",
        },
        connections: ["future", "calculation"],
        pulseIntensity: 0.4,
        activationCount: 0,
        learningRate: 0.09,
        strength: 0.85,
        lastActivated: 0,
        adaptiveConnections: [],
        experienceLevel: 1,
      },
    ]

    const initialSynapses: Synapse[] = []
    initialNeurons.forEach((neuron) => {
      neuron.connections.forEach((connectionId) => {
        if (
          !initialSynapses.find(
            (s) => (s.from === neuron.id && s.to === connectionId) || (s.from === connectionId && s.to === neuron.id),
          )
        ) {
          initialSynapses.push({
            from: neuron.id,
            to: connectionId,
            active: neuron.id === "welcome",
            strength: Math.random() * 0.5 + 0.3,
            usageCount: neuron.id === "welcome" ? 1 : 0,
            efficiency: 0.5,
            lastUsed: neuron.id === "welcome" ? Date.now() : 0,
            adaptiveStrength: Math.random() * 0.3 + 0.2,
          })
        }
      })
    })

    setNeurons(initialNeurons)
    setSynapses(initialSynapses)
    setActiveNeuron("welcome")
  }, [])

  // Session timer for learning analytics
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Adaptive theme system - analyze dominant neuron type
  useEffect(() => {
    if (currentTheme !== "adaptive") return

    // Count activations by type
    const typeCounts: Record<string, number> = {}
    neurons.forEach((neuron) => {
      const type = neuron.content.type
      typeCounts[type] = (typeCounts[type] || 0) + neuron.activationCount
    })

    // Find dominant type
    let maxCount = 0
    let dominantType = "processing" // default
    Object.entries(typeCounts).forEach(([type, count]) => {
      if (count > maxCount) {
        maxCount = count
        dominantType = type
      }
    })

    // Only update if there's a change to avoid unnecessary re-renders
    if (dominantType !== dominantNeuronType) {
      setDominantNeuronType(dominantType)
    }
  }, [neurons, currentTheme, dominantNeuronType])

  // Apply theme transition effect
  const changeTheme = (themeId: ThemeType) => {
    setThemeTransitioning(true)
    setTimeout(() => {
      setCurrentTheme(themeId)
      setThemeTransitioning(false)
    }, 300)
  }

  // Get current theme colors
  const getActiveTheme = (): Theme => {
    if (currentTheme === "adaptive") {
      // Create a dynamic theme based on dominant neuron type
      const baseTheme = { ...themes.adaptive }

      switch (dominantNeuronType) {
        case "memory":
          baseTheme.colors.primary = "#3b82f6"
          baseTheme.colors.secondary = "#60a5fa"
          baseTheme.colors.backgroundGradient = "from-blue-900/20 via-blue-800/10 to-transparent"
          baseTheme.particleColor = "#93c5fd"
          break
        case "creative":
          baseTheme.colors.primary = "#ec4899"
          baseTheme.colors.secondary = "#f472b6"
          baseTheme.colors.backgroundGradient = "from-pink-900/20 via-purple-800/10 to-transparent"
          baseTheme.particleColor = "#f9a8d4"
          break
        case "analytical":
          baseTheme.colors.primary = "#f59e0b"
          baseTheme.colors.secondary = "#fbbf24"
          baseTheme.colors.backgroundGradient = "from-amber-900/20 via-yellow-800/10 to-transparent"
          baseTheme.particleColor = "#fcd34d"
          break
        case "emotional":
          baseTheme.colors.primary = "#ef4444"
          baseTheme.colors.secondary = "#f87171"
          baseTheme.colors.backgroundGradient = "from-red-900/20 via-rose-800/10 to-transparent"
          baseTheme.particleColor = "#fca5a5"
          break
        default: // processing
          baseTheme.colors.primary = "#10b981"
          baseTheme.colors.secondary = "#34d399"
          baseTheme.colors.backgroundGradient = "from-emerald-900/20 via-green-800/10 to-transparent"
          baseTheme.particleColor = "#6ee7b7"
      }

      return baseTheme
    }

    return themes[currentTheme]
  }

  const activeTheme = getActiveTheme()

  // Adaptive learning system
  const updateNeuralLearning = (activatedNeuronId: string, previousNeuronId: string | null) => {
    if (!learningMode) return

    const currentTime = Date.now()

    setNeurons((prev) =>
      prev.map((neuron) => {
        if (neuron.id === activatedNeuronId) {
          // Strengthen the activated neuron
          const newActivationCount = neuron.activationCount + 1
          const experienceBonus = Math.floor(newActivationCount / 5)
          const newStrength = Math.min(1.0, neuron.strength + neuron.learningRate * 0.1)

          return {
            ...neuron,
            activationCount: newActivationCount,
            strength: newStrength,
            lastActivated: currentTime,
            experienceLevel: 1 + experienceBonus,
            pulseIntensity: Math.min(1.0, neuron.pulseIntensity + 0.05),
          }
        }

        // Decay unused neurons slightly
        if (currentTime - neuron.lastActivated > 30000) {
          // 30 seconds
          return {
            ...neuron,
            strength: Math.max(0.3, neuron.strength - 0.01),
            pulseIntensity: Math.max(0.1, neuron.pulseIntensity - 0.01),
          }
        }

        return neuron
      }),
    )

    setSynapses((prev) =>
      prev.map((synapse) => {
        if (synapse.from === activatedNeuronId || synapse.to === activatedNeuronId) {
          // Strengthen used synapses
          const newUsageCount = synapse.usageCount + 1
          const newEfficiency = Math.min(1.0, synapse.efficiency + 0.05)
          const newAdaptiveStrength = Math.min(1.0, synapse.adaptiveStrength + 0.03)

          return {
            ...synapse,
            usageCount: newUsageCount,
            efficiency: newEfficiency,
            lastUsed: currentTime,
            adaptiveStrength: newAdaptiveStrength,
            strength: Math.min(1.0, synapse.strength + 0.02),
          }
        }

        // Decay unused synapses
        if (currentTime - synapse.lastUsed > 45000) {
          // 45 seconds
          return {
            ...synapse,
            efficiency: Math.max(0.1, synapse.efficiency - 0.01),
            adaptiveStrength: Math.max(0.1, synapse.adaptiveStrength - 0.005),
          }
        }

        return synapse
      }),
    )

    // Discover learning patterns
    if (previousNeuronId && activatedNeuronId !== previousNeuronId) {
      discoverLearningPattern(previousNeuronId, activatedNeuronId)
    }

    // Create adaptive connections based on usage patterns
    createAdaptiveConnections(activatedNeuronId)
  }

  // Discover learning patterns based on user behavior
  const discoverLearningPattern = (fromNeuron: string, toNeuron: string) => {
    const patternId = `${fromNeuron}-${toNeuron}`
    const existingPattern = learningPatterns.find((p) => p.id === patternId)

    if (existingPattern) {
      // Strengthen existing pattern
      setLearningPatterns((prev) =>
        prev.map((pattern) =>
          pattern.id === patternId ? { ...pattern, strength: Math.min(1.0, pattern.strength + 0.1) } : pattern,
        ),
      )
    } else {
      // Create new pattern
      const fromNeuronData = neurons.find((n) => n.id === fromNeuron)
      const toNeuronData = neurons.find((n) => n.id === toNeuron)

      if (fromNeuronData && toNeuronData) {
        const newPattern: LearningPattern = {
          id: patternId,
          name: `${fromNeuronData.content.title} → ${toNeuronData.content.title}`,
          description: `Learned pathway between ${fromNeuronData.content.type} and ${toNeuronData.content.type} processing`,
          neurons: [fromNeuron, toNeuron],
          strength: 0.3,
          discoveredAt: Date.now(),
        }

        setLearningPatterns((prev) => [...prev, newPattern])
      }
    }
  }

  // Create adaptive connections based on frequent usage patterns
  const createAdaptiveConnections = (neuronId: string) => {
    const neuron = neurons.find((n) => n.id === neuronId)
    if (!neuron || neuron.activationCount < 3) return

    // Find frequently co-activated neurons
    const coActivatedNeurons = neurons.filter(
      (n) => n.id !== neuronId && n.activationCount > 2 && Math.abs(n.lastActivated - neuron.lastActivated) < 10000,
    )

    coActivatedNeurons.forEach((coNeuron) => {
      if (
        !neuron.adaptiveConnections.includes(coNeuron.id) &&
        !neuron.connections.includes(coNeuron.id) &&
        neuron.adaptiveConnections.length < 2
      ) {
        // Create adaptive connection
        setNeurons((prev) =>
          prev.map((n) =>
            n.id === neuronId ? { ...n, adaptiveConnections: [...n.adaptiveConnections, coNeuron.id] } : n,
          ),
        )

        // Add adaptive synapse
        setSynapses((prev) => [
          ...prev,
          {
            from: neuronId,
            to: coNeuron.id,
            active: false,
            strength: 0.3,
            usageCount: 0,
            efficiency: 0.3,
            lastUsed: 0,
            adaptiveStrength: 0.2,
          },
        ])
      }
    })
  }

  // Safe animation loop with adaptive behavior
  useEffect(() => {
    const animate = () => {
      setThoughtWave((prev) => (prev + 0.02 * animationSpeed) % (Math.PI * 2))

      // Adaptive pulse based on neuron strength and experience
      setNeurons((prev) =>
        prev.map((neuron) => {
          const baseIntensity = neuron.active
            ? 0.8 + Math.sin(thoughtWave * 3) * 0.3
            : 0.3 + Math.sin(thoughtWave + neuron.x * 0.01) * 0.2

          // Adaptive modulation based on strength and experience
          const adaptiveModulation = neuron.strength * 0.2 + neuron.experienceLevel * 0.05
          const finalIntensity = Math.min(1.0, baseIntensity + adaptiveModulation)

          return {
            ...neuron,
            pulseIntensity: finalIntensity,
          }
        }),
      )

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [thoughtWave, animationSpeed])

  const activateNeuron = (neuronId: string) => {
    const previousNeuron = activeNeuron
    setIsThinking(true)
    setTotalInteractions((prev) => prev + 1)

    // Deactivate all neurons first
    setNeurons((prev) => prev.map((n) => ({ ...n, active: false })))
    setSynapses((prev) => prev.map((s) => ({ ...s, active: false })))

    setTimeout(() => {
      setNeurons((prev) =>
        prev.map((neuron) => ({
          ...neuron,
          active: neuron.id === neuronId,
        })),
      )

      setSynapses((prev) =>
        prev.map((synapse) => ({
          ...synapse,
          active: synapse.from === neuronId || synapse.to === neuronId,
        })),
      )

      setActiveNeuron(neuronId)
      setIsThinking(false)

      // Apply adaptive learning
      updateNeuralLearning(neuronId, previousNeuron)
    }, 300)
  }

  const getNeuronColor = (type: string, active: boolean, pulseIntensity: number, strength: number) => {
    const [r, g, b] =
      activeTheme.colors.neuronTypes[type as keyof typeof activeTheme.colors.neuronTypes] ||
      activeTheme.colors.neuronTypes.processing

    const adaptiveIntensity = pulseIntensity * strength * activeTheme.glowIntensity
    const opacity = active ? adaptiveIntensity : Math.max(0.2, adaptiveIntensity * 0.5)

    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  const getViewModeClass = () => {
    switch (viewMode) {
      case "focus":
        return "scale-125 transition-transform duration-500"
      case "overview":
        return "scale-75 transition-transform duration-500"
      default:
        return "scale-100 transition-transform duration-500"
    }
  }

  const resetLearning = () => {
    setNeurons((prev) =>
      prev.map((neuron) => ({
        ...neuron,
        activationCount: neuron.id === "welcome" ? 1 : 0,
        strength: neuron.id === "welcome" ? 1.0 : Math.random() * 0.3 + 0.6,
        experienceLevel: 1,
        adaptiveConnections: [],
      })),
    )

    setSynapses((prev) =>
      prev.map((synapse) => ({
        ...synapse,
        usageCount: synapse.from === "welcome" || synapse.to === "welcome" ? 1 : 0,
        efficiency: 0.5,
        adaptiveStrength: Math.random() * 0.3 + 0.2,
      })),
    )

    setLearningPatterns([])
    setTotalInteractions(0)
    setSessionTime(0)
    activateNeuron("welcome")
  }

  // Export network data
  const exportNetworkData = () => {
    const averageStrength = neurons.reduce((sum, n) => sum + n.strength, 0) / neurons.length
    const totalExperience = neurons.reduce((sum, n) => sum + n.experienceLevel, 0)

    const exportData: ExportData = {
      version: "1.0",
      exportDate: new Date().toISOString(),
      networkState: {
        neurons,
        synapses,
        learningPatterns,
      },
      analytics: {
        totalNeurons: neurons.length,
        totalSynapses: synapses.length,
        totalInteractions,
        totalPatterns: learningPatterns.length,
        averageStrength,
        totalExperience,
        sessionTime,
        dominantNeuronType,
      },
      theme: currentTheme,
    }

    return exportData
  }

  // Format export data based on selected format
  const getFormattedExportData = () => {
    const data = exportNetworkData()

    if (exportFormat === "json") {
      return JSON.stringify(data, null, 2)
    } else {
      // Text format - more human readable
      const neuronSummary = data.networkState.neurons.map(
        (n) =>
          `${n.content.title} (${n.content.type}): Level ${n.experienceLevel}, Strength ${(n.strength * 100).toFixed(
            0,
          )}%, Activations ${n.activationCount}`,
      )

      const patternSummary = data.networkState.learningPatterns
        .sort((a, b) => b.strength - a.strength)
        .map(
          (p) =>
            `${p.name}: ${p.description}, Strength ${(p.strength * 100).toFixed(0)}%, Discovered ${new Date(
              p.discoveredAt,
            ).toLocaleString()}`,
        )

      return `NEURAL NETWORK EXPORT
===================
Date: ${new Date().toLocaleString()}
Theme: ${data.theme}
Session Time: ${Math.floor(data.analytics.sessionTime / 60)}:${(data.analytics.sessionTime % 60)
        .toString()
        .padStart(2, "0")}

ANALYTICS
---------
Total Neurons: ${data.analytics.totalNeurons}
Total Synapses: ${data.analytics.totalSynapses}
Total Interactions: ${data.analytics.totalInteractions}
Discovered Patterns: ${data.analytics.totalPatterns}
Average Network Strength: ${(data.analytics.averageStrength * 100).toFixed(1)}%
Total Experience: ${data.analytics.totalExperience}
Dominant Neuron Type: ${data.analytics.dominantNeuronType}

NEURONS
-------
${neuronSummary.join("\n")}

DISCOVERED PATTERNS
------------------
${patternSummary.join("\n")}
`
    }
  }

  // Download export data
  const downloadExportData = () => {
    const data = getFormattedExportData()
    const blob = new Blob([data], { type: exportFormat === "json" ? "application/json" : "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `neural-network-export-${Date.now()}.${exportFormat === "json" ? "json" : "txt"}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setExportSuccess(true)
    setTimeout(() => setExportSuccess(false), 3000)
  }

  // Copy export data to clipboard
  const copyToClipboard = () => {
    const data = getFormattedExportData()
    navigator.clipboard.writeText(data)
    setCopiedToClipboard(true)
    setTimeout(() => setCopiedToClipboard(false), 3000)
  }

  const activeNeuronData = neurons.find((n) => n.id === activeNeuron)
  const activeConnections = activeNeuronData ? activeNeuronData.connections.length : 0
  const totalNeurons = neurons.length
  const activeSynapses = synapses.filter((s) => s.active).length
  const averageStrength = neurons.reduce((sum, n) => sum + n.strength, 0) / neurons.length
  const totalExperience = neurons.reduce((sum, n) => sum + n.experienceLevel, 0)

  return (
    <div
      className={`min-h-screen text-white overflow-hidden relative transition-colors duration-500 ${
        themeTransitioning ? "opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: activeTheme.colors.background }}
    >
      {/* Enhanced animated background with theme-based particles */}
      <div className="absolute inset-0 opacity-20">
        <div
          className={`absolute inset-0 bg-gradient-radial ${activeTheme.colors.backgroundGradient}`}
          style={{
            transform: `scale(${1 + Math.sin(thoughtWave) * 0.1})`,
            transition: "transform 0.1s ease-out",
          }}
        />
        {[...Array(activeTheme.particleCount)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${activeTheme.particleSize}px`,
              height: `${activeTheme.particleSize}px`,
              backgroundColor: activeTheme.particleColor,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
        {[...Array(15)].map((_, i) => (
          <div
            key={`shape-${i}`}
            className="absolute w-2 h-2 border rotate-45 animate-pulse"
            style={{
              borderColor: `${activeTheme.colors.primary}20`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Enhanced Header with Theme Controls */}
      <div
        className="relative z-10 p-6 backdrop-blur-sm bg-black/30 transition-colors duration-500"
        style={{ borderBottomColor: `${activeTheme.colors.border}80` }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Brain className="w-8 h-8" style={{ color: activeTheme.colors.primary }} />
              <div
                className="absolute inset-0 w-8 h-8 rounded-full animate-pulse"
                style={{ backgroundColor: `${activeTheme.colors.primary}20` }}
              />
            </div>
            <div>
              <h1
                className="text-2xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, ${activeTheme.colors.primary}, ${activeTheme.colors.secondary}, ${activeTheme.colors.accent})`,
                }}
              >
                Adaptive Neural Network
              </h1>
              <p className="text-sm text-gray-400">
                {currentTheme === "adaptive"
                  ? `Self-learning network • ${dominantNeuronType.charAt(0).toUpperCase() + dominantNeuronType.slice(1)} dominant`
                  : activeTheme.description}
              </p>
            </div>
          </div>

          {/* Enhanced Controls with Theme Selector */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Activity className="w-4 h-4" />
              <span>Learning: {learningMode ? "Active" : "Paused"}</span>
            </div>

            {/* Export Button */}
            <div className="relative">
              <button
                onClick={() => setExportMenuOpen(!exportMenuOpen)}
                className="p-2 rounded-lg transition-colors flex items-center space-x-1"
                style={{
                  backgroundColor: exportMenuOpen ? activeTheme.colors.primary : `${activeTheme.colors.primary}30`,
                  color: exportMenuOpen ? "#ffffff" : activeTheme.colors.primary,
                }}
                title="Export Network Data"
              >
                <Download className="w-4 h-4" />
                <span className="text-xs">Export</span>
              </button>

              {/* Export Menu */}
              {exportMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg overflow-hidden z-50 backdrop-blur-md border"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    borderColor: activeTheme.colors.border,
                  }}
                >
                  <div className="p-4">
                    <h3 className="text-sm font-semibold mb-3">Export Network Data</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-400 mb-2">Format</p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setExportFormat("json")}
                            className={`flex items-center space-x-1 px-3 py-1.5 rounded text-xs ${
                              exportFormat === "json"
                                ? "bg-gray-700 text-white"
                                : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
                            }`}
                          >
                            <FileJson className="w-3 h-3" />
                            <span>JSON</span>
                          </button>
                          <button
                            onClick={() => setExportFormat("text")}
                            className={`flex items-center space-x-1 px-3 py-1.5 rounded text-xs ${
                              exportFormat === "text"
                                ? "bg-gray-700 text-white"
                                : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
                            }`}
                          >
                            <FileText className="w-3 h-3" />
                            <span>Text</span>
                          </button>
                        </div>
                      </div>

                      <div className="pt-2 space-y-2">
                        <Button
                          onClick={downloadExportData}
                          className="w-full flex items-center justify-center space-x-2"
                          style={{
                            backgroundColor: activeTheme.colors.primary,
                            color: "#ffffff",
                          }}
                        >
                          <Download className="w-4 h-4" />
                          <span>Download {exportFormat.toUpperCase()}</span>
                        </Button>

                        <Button
                          onClick={copyToClipboard}
                          variant="outline"
                          className="w-full flex items-center justify-center space-x-2"
                          style={{
                            borderColor: activeTheme.colors.border,
                            color: activeTheme.colors.text,
                          }}
                        >
                          {copiedToClipboard ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          <span>{copiedToClipboard ? "Copied!" : "Copy to Clipboard"}</span>
                        </Button>
                      </div>

                      {exportSuccess && (
                        <div
                          className="text-xs py-1 px-2 rounded text-center animate-pulse"
                          style={{ backgroundColor: activeTheme.colors.primary + "40" }}
                        >
                          Export successful!
                        </div>
                      )}

                      <div className="text-xs text-gray-500 pt-2">
                        <p>
                          Exports {neurons.length} neurons, {synapses.length} connections, and {learningPatterns.length}{" "}
                          patterns
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Selector */}
            <div className="relative">
              <button
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className="p-2 rounded-lg transition-colors flex items-center space-x-1"
                style={{
                  backgroundColor: themeMenuOpen ? activeTheme.colors.primary : `${activeTheme.colors.primary}30`,
                  color: themeMenuOpen ? "#ffffff" : activeTheme.colors.primary,
                }}
                title="Change Theme"
              >
                <Palette className="w-4 h-4" />
                <span className="text-xs">{activeTheme.name}</span>
              </button>

              {/* Theme Menu */}
              {themeMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg overflow-hidden z-50 backdrop-blur-md border"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    borderColor: activeTheme.colors.border,
                  }}
                >
                  <div className="p-2">
                    <h3 className="text-xs font-semibold text-gray-400 mb-2 px-2">SELECT THEME</h3>
                    {Object.values(themes).map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => {
                          changeTheme(theme.id)
                          setThemeMenuOpen(false)
                        }}
                        className={`w-full text-left p-2 rounded-md flex items-center space-x-2 transition-colors ${
                          currentTheme === theme.id ? "bg-gray-700/50" : "hover:bg-gray-700/30"
                        }`}
                      >
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: theme.colors.primary }}
                        >
                          {theme.icon}
                        </div>
                        <div>
                          <div className="text-sm">{theme.name}</div>
                          <div className="text-xs text-gray-400 truncate">{theme.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Learning Mode Toggle */}
            <button
              onClick={() => setLearningMode(!learningMode)}
              className={`p-2 rounded transition-colors ${
                learningMode ? "bg-green-500 text-white" : "bg-gray-700 text-gray-400"
              }`}
              title="Toggle Learning Mode"
            >
              <TrendingUp className="w-4 h-4" />
            </button>

            {/* View Mode Toggle */}
            <div
              className="flex items-center space-x-1 rounded-lg p-1"
              style={{ backgroundColor: `${activeTheme.colors.border}50` }}
            >
              <button
                onClick={() => setViewMode("overview")}
                className={`p-2 rounded transition-colors ${
                  viewMode === "overview" ? "text-white" : "text-gray-400 hover:text-white"
                }`}
                style={{
                  backgroundColor: viewMode === "overview" ? activeTheme.colors.primary : "transparent",
                }}
                title="Overview Mode"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("normal")}
                className={`p-2 rounded transition-colors ${
                  viewMode === "normal" ? "text-white" : "text-gray-400 hover:text-white"
                }`}
                style={{
                  backgroundColor: viewMode === "normal" ? activeTheme.colors.primary : "transparent",
                }}
                title="Normal Mode"
              >
                <Brain className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("focus")}
                className={`p-2 rounded transition-colors ${
                  viewMode === "focus" ? "text-white" : "text-gray-400 hover:text-white"
                }`}
                style={{
                  backgroundColor: viewMode === "focus" ? activeTheme.colors.primary : "transparent",
                }}
                title="Focus Mode"
              >
                <Zap className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setShowConnections(!showConnections)}
              className={`p-2 rounded transition-colors ${showConnections ? "text-white" : "text-gray-400"}`}
              style={{
                backgroundColor: showConnections ? activeTheme.colors.primary : `${activeTheme.colors.border}50`,
              }}
              title="Toggle Connections"
            >
              <Network className="w-4 h-4" />
            </button>

            <Button
              variant="outline"
              size="sm"
              onClick={resetLearning}
              className="transition-all duration-300"
              style={{
                borderColor: activeTheme.colors.border,
                color: activeTheme.colors.text,
                "&:hover": {
                  borderColor: activeTheme.colors.primary,
                  color: activeTheme.colors.primary,
                },
              }}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Learning
            </Button>
          </div>
        </div>

        {/* Enhanced Stats Bar with Theme-Aware Styling */}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <div className="flex space-x-6">
            <span>Neurons: {totalNeurons}</span>
            <span>Active Connections: {activeSynapses}</span>
            <span>Interactions: {totalInteractions}</span>
            <span>Patterns: {learningPatterns.length}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span>Network Strength:</span>
              <div
                className="w-20 h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: `${activeTheme.colors.border}50` }}
              >
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${averageStrength * 100}%`,
                    backgroundImage: `linear-gradient(to right, ${activeTheme.colors.primary}, ${activeTheme.colors.secondary})`,
                  }}
                />
              </div>
              <span>{(averageStrength * 100).toFixed(0)}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Session:</span>
              <span>
                {Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-160px)]">
        {/* Enhanced Neural Network Visualization with Theme-Aware Styling */}
        <div className="flex-1 relative overflow-hidden">
          <div className={`w-full h-full ${getViewModeClass()}`}>
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
              {showConnections &&
                synapses.map((synapse, index) => {
                  const fromNeuron = neurons.find((n) => n.id === synapse.from)
                  const toNeuron = neurons.find((n) => n.id === synapse.to)

                  if (!fromNeuron || !toNeuron) return null

                  const isAdaptive = fromNeuron.adaptiveConnections.includes(toNeuron.id)
                  const strokeWidth = synapse.active ? 3 + synapse.efficiency * 2 : 1 + synapse.adaptiveStrength

                  return (
                    <g key={index}>
                      <line
                        x1={fromNeuron.x}
                        y1={fromNeuron.y}
                        x2={toNeuron.x}
                        y2={toNeuron.y}
                        stroke={
                          isAdaptive
                            ? activeTheme.colors.accent
                            : synapse.active
                              ? activeTheme.colors.primary
                              : `${activeTheme.colors.border}${Math.round((0.3 + synapse.adaptiveStrength * 0.4) * 255)
                                  .toString(16)
                                  .padStart(2, "0")}`
                        }
                        strokeWidth={strokeWidth}
                        opacity={
                          synapse.active ? synapse.strength * synapse.efficiency : 0.3 + synapse.adaptiveStrength * 0.3
                        }
                        className={synapse.active ? "animate-pulse" : ""}
                        strokeDasharray={isAdaptive ? "8,4" : synapse.active ? "none" : "5,5"}
                      />

                      {synapse.active && (
                        <circle r="3" fill={activeTheme.colors.secondary} opacity="0.8" className="animate-pulse">
                          <animateMotion
                            dur={`${2 / synapse.efficiency}s`}
                            repeatCount="indefinite"
                            path={`M${fromNeuron.x},${fromNeuron.y} L${toNeuron.x},${toNeuron.y}`}
                          />
                        </circle>
                      )}
                    </g>
                  )
                })}
            </svg>

            {/* Enhanced neurons with theme-aware styling */}
            {neurons.map((neuron) => (
              <button
                key={neuron.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{
                  left: neuron.x,
                  top: neuron.y,
                  zIndex: 2,
                }}
                onClick={() => activateNeuron(neuron.id)}
              >
                {/* Adaptive glow ring based on experience and theme */}
                <div
                  className={`absolute inset-0 rounded-full -translate-x-1/2 -translate-y-1/2 ${
                    neuron.active ? "animate-ping" : ""
                  }`}
                  style={{
                    width: `${16 + neuron.experienceLevel * 4}px`,
                    height: `${16 + neuron.experienceLevel * 4}px`,
                    backgroundColor: getNeuronColor(neuron.content.type, neuron.active, 0.2, neuron.strength),
                    left: "50%",
                    top: "50%",
                  }}
                />

                {/* Main neuron with adaptive sizing and theme-aware styling */}
                <div
                  className="rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 relative z-10"
                  style={{
                    width: `${56 + neuron.experienceLevel * 2}px`,
                    height: `${56 + neuron.experienceLevel * 2}px`,
                    backgroundColor: getNeuronColor(
                      neuron.content.type,
                      neuron.active,
                      neuron.pulseIntensity,
                      neuron.strength,
                    ),
                    borderColor: neuron.active ? activeTheme.colors.primary : activeTheme.colors.border,
                    boxShadow: neuron.active
                      ? `0 0 ${20 + neuron.strength * 10}px ${getNeuronColor(neuron.content.type, true, 0.8, neuron.strength)}`
                      : "none",
                  }}
                >
                  {neuron.content.type === "memory" && <Brain className="w-6 h-6" />}
                  {neuron.content.type === "processing" && <Cpu className="w-6 h-6" />}
                  {neuron.content.type === "creative" && <Sparkles className="w-6 h-6" />}
                  {neuron.content.type === "analytical" && <Network className="w-6 h-6" />}
                  {neuron.content.type === "emotional" && <Zap className="w-6 h-6" />}
                </div>

                {/* Enhanced neuron label with theme-aware styling */}
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105">
                  <div
                    className="px-3 py-2 rounded-lg text-xs whitespace-nowrap backdrop-blur-sm"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      borderColor: activeTheme.colors.border,
                      borderWidth: "1px",
                      borderStyle: "solid",
                    }}
                  >
                    <div className="font-semibold">{neuron.content.title}</div>
                    <div className="text-gray-400 capitalize">{neuron.content.type}</div>
                    <div style={{ color: activeTheme.colors.primary }}>
                      Lvl {neuron.experienceLevel} • {(neuron.strength * 100).toFixed(0)}% strength
                    </div>
                    <div style={{ color: activeTheme.colors.secondary }}>{neuron.activationCount} activations</div>
                  </div>
                </div>

                {/* Experience level indicator with theme-aware styling */}
                <div
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${activeTheme.colors.primary}, ${activeTheme.colors.secondary})`,
                  }}
                >
                  {neuron.experienceLevel}
                </div>

                {/* Adaptive connections indicator with theme-aware styling */}
                {neuron.adaptiveConnections.length > 0 && (
                  <div
                    className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full flex items-center justify-center text-xs"
                    style={{ backgroundColor: activeTheme.colors.accent }}
                  >
                    ⚡
                  </div>
                )}
              </button>
            ))}

            {/* Enhanced thinking indicator with theme-aware styling */}
            {isThinking && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 backdrop-blur-sm">
                <div className="text-center">
                  <div className="relative">
                    <div
                      className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                      style={{ borderColor: activeTheme.colors.primary }}
                    />
                    <div
                      className="absolute inset-0 w-16 h-16 border-4 border-b-transparent rounded-full animate-spin animate-reverse mx-auto"
                      style={{ borderColor: activeTheme.colors.secondary }}
                    />
                  </div>
                  <p className="font-semibold animate-pulse" style={{ color: activeTheme.colors.primary }}>
                    {learningMode ? "Learning and adapting..." : "Processing..."}
                  </p>
                  <div className="flex justify-center space-x-1 mt-2">
                    <div
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ backgroundColor: activeTheme.colors.primary }}
                    />
                    <div
                      className="w-2 h-2 rounded-full animate-bounce delay-100"
                      style={{ backgroundColor: activeTheme.colors.secondary }}
                    />
                    <div
                      className="w-2 h-2 rounded-full animate-bounce delay-200"
                      style={{ backgroundColor: activeTheme.colors.accent }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Content Panel with Theme-Aware Styling */}
        <div
          className="w-96 backdrop-blur-sm transition-colors duration-500"
          style={{
            borderLeftColor: `${activeTheme.colors.border}50`,
            borderLeftWidth: "1px",
            borderLeftStyle: "solid",
            background: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7))`,
          }}
        >
          {activeNeuronData && (
            <div
              className="h-full rounded-none transition-colors duration-500"
              style={{
                backgroundColor: "transparent",
                border: "none",
              }}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center relative"
                      style={{
                        backgroundColor: getNeuronColor(
                          activeNeuronData.content.type,
                          true,
                          0.8,
                          activeNeuronData.strength,
                        ),
                        boxShadow: `0 0 20px ${getNeuronColor(activeNeuronData.content.type, true, 0.5, activeNeuronData.strength)}`,
                      }}
                    >
                      {activeNeuronData.content.type === "memory" && <Brain className="w-6 h-6" />}
                      {activeNeuronData.content.type === "processing" && <Cpu className="w-6 h-6" />}
                      {activeNeuronData.content.type === "creative" && <Sparkles className="w-6 h-6" />}
                      {activeNeuronData.content.type === "analytical" && <Network className="w-6 h-6" />}
                      {activeNeuronData.content.type === "emotional" && <Zap className="w-6 h-6" />}

                      <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{activeNeuronData.content.title}</h2>
                      <p className="text-sm text-gray-400 capitalize">{activeNeuronData.content.type} Node</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: activeTheme.colors.secondary }}
                        />
                        <span className="text-xs" style={{ color: activeTheme.colors.secondary }}>
                          LEVEL {activeNeuronData.experienceLevel} • {learningMode ? "LEARNING" : "STATIC"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-6">{activeNeuronData.content.description}</p>

                  {/* Learning Progress with theme-aware styling */}
                  <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: `${activeTheme.colors.border}30` }}>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">ADAPTIVE METRICS</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Strength:</span>
                        <span>{(activeNeuronData.strength * 100).toFixed(0)}%</span>
                      </div>
                      <div
                        className="w-full h-1 rounded-full overflow-hidden"
                        style={{ backgroundColor: `${activeTheme.colors.border}50` }}
                      >
                        <div
                          className="h-full transition-all duration-500"
                          style={{
                            width: `${activeNeuronData.strength * 100}%`,
                            backgroundImage: `linear-gradient(to right, ${activeTheme.colors.primary}, ${activeTheme.colors.secondary})`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Learning Rate:</span>
                        <span>{(activeNeuronData.learningRate * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Activations:</span>
                        <span>{activeNeuronData.activationCount}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-400 mb-3">NEURAL CONNECTIONS</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {[...activeNeuronData.connections, ...activeNeuronData.adaptiveConnections].map((connectionId) => {
                      const connectedNeuron = neurons.find((n) => n.id === connectionId)
                      if (!connectedNeuron) return null

                      const isAdaptive = activeNeuronData.adaptiveConnections.includes(connectionId)

                      return (
                        <button
                          key={connectionId}
                          onClick={() => activateNeuron(connectionId)}
                          className="w-full text-left p-3 rounded-lg transition-all duration-300 hover:shadow-lg group"
                          style={{
                            backgroundColor: `${activeTheme.colors.border}30`,
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: isAdaptive ? activeTheme.colors.accent : `${activeTheme.colors.border}30`,
                            boxShadow: `0 0 10px ${getNeuronColor(connectedNeuron.content.type, false, 0.2, connectedNeuron.strength)}`,
                          }}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform relative"
                              style={{
                                backgroundColor: getNeuronColor(
                                  connectedNeuron.content.type,
                                  false,
                                  0.5,
                                  connectedNeuron.strength,
                                ),
                              }}
                            >
                              {connectedNeuron.content.type === "memory" && <Brain className="w-4 h-4" />}
                              {connectedNeuron.content.type === "processing" && <Cpu className="w-4 h-4" />}
                              {connectedNeuron.content.type === "creative" && <Sparkles className="w-4 h-4" />}
                              {connectedNeuron.content.type === "analytical" && <Network className="w-4 h-4" />}
                              {connectedNeuron.content.type === "emotional" && <Zap className="w-4 h-4" />}

                              {isAdaptive && (
                                <div
                                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center text-xs"
                                  style={{ backgroundColor: activeTheme.colors.accent }}
                                >
                                  ⚡
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-white group-hover:text-opacity-90">
                                {connectedNeuron.content.title}
                              </div>
                              <div className="text-xs text-gray-400 capitalize">
                                {connectedNeuron.content.type} • Lvl {connectedNeuron.experienceLevel}
                                {isAdaptive && (
                                  <span
                                    className="ml-2 px-1 py-0.5 rounded text-xs"
                                    style={{
                                      backgroundColor: activeTheme.colors.accent,
                                      color: "#ffffff",
                                    }}
                                  >
                                    ADAPTIVE
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">{(connectedNeuron.strength * 100).toFixed(0)}%</div>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  {/* Learning Patterns Section */}
                  {learningPatterns.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        DISCOVERED PATTERNS
                      </h3>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {learningPatterns
                          .sort((a, b) => b.strength - a.strength)
                          .slice(0, 5)
                          .map((pattern) => (
                            <div
                              key={pattern.id}
                              className="p-2 rounded-lg"
                              style={{ backgroundColor: `${activeTheme.colors.border}20` }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="text-xs font-medium text-white truncate">{pattern.name}</div>
                                <div
                                  className="text-xs px-2 py-1 rounded"
                                  style={{
                                    backgroundColor: activeTheme.colors.primary,
                                    color: "#ffffff",
                                  }}
                                >
                                  {(pattern.strength * 100).toFixed(0)}%
                                </div>
                              </div>
                              <div className="text-xs text-gray-400 mt-1">{pattern.description}</div>
                              <div
                                className="w-full h-1 rounded-full mt-2 overflow-hidden"
                                style={{ backgroundColor: `${activeTheme.colors.border}50` }}
                              >
                                <div
                                  className="h-full transition-all duration-500"
                                  style={{
                                    width: `${pattern.strength * 100}%`,
                                    backgroundImage: `linear-gradient(to right, ${activeTheme.colors.primary}, ${activeTheme.colors.secondary})`,
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Network Analytics */}
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center">
                      <Activity className="w-4 h-4 mr-2" />
                      NETWORK ANALYTICS
                    </h3>
                    <div
                      className="p-3 rounded-lg space-y-3"
                      style={{ backgroundColor: `${activeTheme.colors.border}20` }}
                    >
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <div className="text-gray-400">Total Neurons</div>
                          <div className="text-lg font-bold" style={{ color: activeTheme.colors.primary }}>
                            {totalNeurons}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-400">Active Synapses</div>
                          <div className="text-lg font-bold" style={{ color: activeTheme.colors.secondary }}>
                            {activeSynapses}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-400">Interactions</div>
                          <div className="text-lg font-bold" style={{ color: activeTheme.colors.accent }}>
                            {totalInteractions}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-400">Experience</div>
                          <div className="text-lg font-bold" style={{ color: activeTheme.colors.primary }}>
                            {totalExperience}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Network Efficiency</span>
                          <span style={{ color: activeTheme.colors.primary }}>
                            {(averageStrength * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div
                          className="w-full h-2 rounded-full overflow-hidden"
                          style={{ backgroundColor: `${activeTheme.colors.border}50` }}
                        >
                          <div
                            className="h-full transition-all duration-500"
                            style={{
                              width: `${averageStrength * 100}%`,
                              backgroundImage: `linear-gradient(to right, ${activeTheme.colors.primary}, ${activeTheme.colors.secondary})`,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Learning Progress</span>
                          <span style={{ color: activeTheme.colors.secondary }}>
                            {Math.min(100, learningPatterns.length * 10).toFixed(0)}%
                          </span>
                        </div>
                        <div
                          className="w-full h-2 rounded-full overflow-hidden"
                          style={{ backgroundColor: `${activeTheme.colors.border}50` }}
                        >
                          <div
                            className="h-full transition-all duration-500"
                            style={{
                              width: `${Math.min(100, learningPatterns.length * 10)}%`,
                              backgroundImage: `linear-gradient(to right, ${activeTheme.colors.secondary}, ${activeTheme.colors.accent})`,
                            }}
                          />
                        </div>
                      </div>

                      {currentTheme === "adaptive" && (
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-400">Theme Adaptation</span>
                            <span style={{ color: activeTheme.colors.accent }}>
                              {dominantNeuronType.charAt(0).toUpperCase() + dominantNeuronType.slice(1)}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">Network adapting to {dominantNeuronType} patterns</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Session Info */}
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Session Duration</span>
                      <span>
                        {Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Theme</span>
                      <span>{activeTheme.name}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Learning Mode</span>
                      <span className={learningMode ? "text-green-400" : "text-red-400"}>
                        {learningMode ? "Active" : "Paused"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close menus */}
      {(themeMenuOpen || exportMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setThemeMenuOpen(false)
            setExportMenuOpen(false)
          }}
        />
      )}
    </div>
  )
}

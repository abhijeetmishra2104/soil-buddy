"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { ArrowLeft, Search, Play, BookOpen, Beaker, Sprout, Users, Volume2 } from "lucide-react"

export default function LearnPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const categories = [
    { id: "all", name: "All Topics", icon: <BookOpen className="h-5 w-5" /> },
    { id: "basics", name: "Soil Basics", icon: <Sprout className="h-5 w-5" /> },
    { id: "science", name: "Soil Science", icon: <Beaker className="h-5 w-5" /> },
    { id: "kids", name: "For Kids", icon: <Users className="h-5 w-5" /> },
  ]

  const learningCards = [
    {
      id: 1,
      category: "basics",
      title: "What is Soil Made Of? 🌍",
      description: "Discover the amazing ingredients that make up healthy soil!",
      content:
        "Soil is made of four main parts: minerals (45%), organic matter (5%), water (25%), and air (25%). It's like a recipe for plant happiness!",
      difficulty: "Easy",
      time: "3 min read",
      hasAudio: true,
      hasVideo: false,
    },
    {
      id: 2,
      category: "basics",
      title: "Types of Soil 🏖️🏔️",
      description: "Learn about sandy, clay, and loamy soils and what makes each special.",
      content:
        "There are three main types: Sandy soil (drains fast, like a beach), Clay soil (holds water, like pottery clay), and Loamy soil (the perfect mix - plants love it most!).",
      difficulty: "Easy",
      time: "4 min read",
      hasAudio: true,
      hasVideo: true,
    },
    {
      id: 3,
      category: "science",
      title: "Understanding pH Levels 🧪",
      description: "What does pH mean and why do plants care about it?",
      content:
        "pH measures how acidic or basic soil is, from 0-14. Most plants prefer pH 6.0-7.0. Think of it like the soil's mood - not too sour, not too bitter!",
      difficulty: "Medium",
      time: "5 min read",
      hasAudio: true,
      hasVideo: false,
    },
    {
      id: 4,
      category: "kids",
      title: "Soil Superheroes: Worms! 🪱",
      description: "Meet the amazing earthworms that help make soil healthy!",
      content:
        "Earthworms are like tiny soil engineers! They eat dead leaves and create nutrient-rich castings (fancy word for worm poop) that plants absolutely love!",
      difficulty: "Easy",
      time: "3 min read",
      hasAudio: true,
      hasVideo: true,
    },
    {
      id: 5,
      category: "basics",
      title: "How to Make Compost 🗑️➡️🌱",
      description: "Turn your kitchen scraps into plant superfood!",
      content:
        "Composting is like cooking for your soil! Mix 'browns' (dry leaves, paper) with 'greens' (food scraps, grass). Add water and air, wait a few months, and voilà - plant food!",
      difficulty: "Medium",
      time: "6 min read",
      hasAudio: true,
      hasVideo: true,
    },
    {
      id: 6,
      category: "science",
      title: "Nutrients Plants Need 🍎",
      description: "The essential vitamins and minerals that keep plants healthy.",
      content:
        "Plants need three main nutrients: Nitrogen (N) for green growth, Phosphorus (P) for roots and flowers, and Potassium (K) for overall health. Think NPK!",
      difficulty: "Medium",
      time: "5 min read",
      hasAudio: true,
      hasVideo: false,
    },
  ]

  const filteredCards = learningCards.filter((card) => {
    const matchesCategory = selectedCategory === "all" || card.category === selectedCategory
    const matchesSearch =
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handlePlayAudio = (cardId: number) => {
    // Mock audio play functionality
    console.log(`Playing audio for card ${cardId}`)
  }

  const handlePlayVideo = (cardId: number) => {
    // Mock video play functionality
    console.log(`Playing video for card ${cardId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-6 w-6 text-green-600" />
              <span className="text-lg font-medium text-green-800">Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">Learn About Soil Health 📚</h1>
          <p className="text-xl text-green-700 leading-relaxed max-w-3xl mx-auto mb-8">
            🌱 Discover the amazing world of soil! From tiny microbes to mighty earthworms, there's so much to explore!
            🪴 🌍
          </p>
        </div>

        {/* Search and Filter */}
        <div
          className={`mb-8 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for topics... 🔍"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-full border-green-300 focus:border-green-500 text-lg py-3"
                aria-label="Search learning topics"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`rounded-full px-4 py-2 text-sm ${
                    selectedCategory === category.id
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "border-green-300 text-green-700 hover:bg-green-50"
                  }`}
                  aria-label={`Filter by ${category.name}`}
                >
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCards.map((card, index) => (
            <Card
              key={card.id}
              className={`bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 delay-${500 + index * 100} transform hover:scale-105 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <CardContent className="p-6">
                {/* Card Header */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        card.difficulty === "Easy" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {card.difficulty}
                    </span>
                    <span className="text-green-600 text-sm">{card.time}</span>
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">{card.title}</h3>
                  <p className="text-green-700 text-sm leading-relaxed">{card.description}</p>
                </div>

                {/* Card Content Preview */}
                <div className="mb-4">
                  <p className="text-green-700 text-sm leading-relaxed line-clamp-3">{card.content}</p>
                </div>

                {/* Media Options */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {card.hasAudio && (
                      <Button
                        variant="outline"
                        onClick={() => handlePlayAudio(card.id)}
                        className="border-green-300 text-green-700 hover:bg-green-50 rounded-full px-3 py-1"
                        aria-label={`Play audio for ${card.title}`}
                      >
                        <Volume2 className="h-4 w-4 mr-1" />
                        Audio
                      </Button>
                    )}
                    {card.hasVideo && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePlayVideo(card.id)}
                        className="border-green-300 text-green-700 hover:bg-green-50 rounded-full px-3 py-1"
                        aria-label={`Play video for ${card.title}`}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Video
                      </Button>
                    )}
                  </div>
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-1"
                    aria-label={`Read more about ${card.title}`}
                  >
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredCards.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">No topics found</h3>
            <p className="text-green-700 text-lg">Try searching for something else or browse all topics!</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-2"
            >
              Show All Topics
            </Button>
          </div>
        )}

        {/* Interactive Fun Section */}
        <Card
          className={`mt-12 bg-gradient-to-r from-green-400 to-green-600 rounded-3xl shadow-xl overflow-hidden transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <CardContent className="p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Test Your Knowledge? 🧠</h2>
            <p className="text-xl mb-6 opacity-90">Take our fun soil health quiz and become a soil expert! 🏆</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                aria-label="Take the soil health quiz"
              >
                <BookOpen className="mr-3 h-6 w-6" />
                Take Quiz
              </Button>
              <Link href="/chat">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg rounded-full bg-transparent"
                  aria-label="Ask SoilBot questions"
                >
                  Ask SoilBot
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

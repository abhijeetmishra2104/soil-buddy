"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { ArrowLeft, Camera, MessageCircle, CheckCircle, Droplets, Thermometer, Leaf } from "lucide-react"

export default function ResultsPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Mock soil analysis results
  const soilData = {
    type: "Loamy Soil",
    description:
      "Your soil is loamy - That&apos;s fantastic! Loamy soil is considered the best type for most plants because it has a perfect balance of sand, silt, and clay.",
    ph: 6.8,
    moisture: "Good",
    nutrients: "Rich",
    color: "#8B4513",
  }

  const recommendations = [
    {
      icon: <Droplets className="h-6 w-6 text-blue-500" />,
      title: "Watering",
      tip: "Water deeply but less frequently. Your loamy soil holds moisture well!",
    },
    {
      icon: <Leaf className="h-6 w-6 text-green-500" />,
      title: "Composting",
      tip: "Add compost once a season to keep nutrients rich and soil structure healthy.",
    },
    {
      icon: <Thermometer className="h-6 w-6 text-orange-500" />,
      title: "pH Balance",
      tip: "Your pH is perfect! Most plants love soil between 6.0-7.0.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/upload" className="flex items-center space-x-2">
              <ArrowLeft className="h-6 w-6 text-green-600" />
              <span className="text-lg font-medium text-green-800">Back to Upload</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">Here's What We Found! 🎉</h1>
          <p className="text-xl text-green-700 leading-relaxed">
            Great news! We've analyzed your soil and have some exciting results to share with you! 🌱
          </p>
        </div>

        {/* Soil Analysis Results */}
        <Card
          className={`bg-white rounded-3xl shadow-xl overflow-hidden mb-8 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Soil Type Info */}
              <div>
                <div className="flex items-center mb-4">
                  <div
                    className="w-12 h-12 rounded-full mr-4 border-4 border-green-200"
                    style={{ backgroundColor: soilData.color }}
                    aria-label={`Soil color representation for ${soilData.type}`}
                  ></div>
                  <div>
                    <h2 className="text-3xl font-bold text-green-800">{soilData.type}</h2>
                    <p className="text-green-600 text-lg">Perfect for gardening! 🌿</p>
                  </div>
                </div>
                <p className="text-green-700 text-lg leading-relaxed mb-6">{soilData.description}</p>

                {/* Soil Properties */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-xl p-4">
                    <h3 className="font-bold text-green-800 mb-1">pH Level</h3>
                    <p className="text-2xl font-bold text-green-600">{soilData.ph}</p>
                    <p className="text-sm text-green-600">Slightly acidic (Perfect!)</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h3 className="font-bold text-blue-800 mb-1">Moisture</h3>
                    <p className="text-2xl font-bold text-blue-600">{soilData.moisture}</p>
                    <p className="text-sm text-blue-600">Well-balanced</p>
                  </div>
                </div>
              </div>

              {/* Soil Illustration */}
              <div className="text-center">
                <div className="bg-gradient-to-b from-green-200 to-amber-200 rounded-3xl p-8 shadow-inner">
                  <div className="text-6xl mb-4">🌱</div>
                  <div className="text-4xl mb-4">🪴</div>
                  <p className="text-green-800 font-bold text-lg">Healthy Soil Ecosystem</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card
          className={`bg-white rounded-3xl shadow-xl overflow-hidden mb-8 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <CardContent className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">💡 Tips to Keep Your Soil Healthy</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="bg-green-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex justify-center mb-4">
                    <div className="bg-white rounded-full p-3 shadow-md">{rec.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-3">{rec.title}</h3>
                  <p className="text-green-700 leading-relaxed">{rec.tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-8 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Link href="/chat">
            <Button
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              aria-label="Ask SoilBot for more help about your soil"
            >
              <MessageCircle className="mr-3 h-6 w-6" />
              Ask SoilBot for More Help
            </Button>
          </Link>

          <Link href="/upload">
            <Button
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-50 px-8 py-4 text-lg rounded-full bg-transparent"
              aria-label="Analyze another soil photo"
            >
              <Camera className="mr-3 h-6 w-6" />
              Analyze Another Photo
            </Button>
          </Link>
        </div>

        {/* Educational CTA */}
        <Card
          className={`bg-gradient-to-r from-green-400 to-green-600 rounded-3xl shadow-xl overflow-hidden transition-all duration-1000 delay-900 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <CardContent className="p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Want to Learn More? 📚</h2>
            <p className="text-xl mb-6 opacity-90">
              Discover more about soil health, gardening tips, and how to care for your plants!
            </p>
            <Link href="/learn">
              <Button
                variant="secondary"
                className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                aria-label="Learn more about soil health"
              >
                <Leaf className="mr-3 h-6 w-6" />
                Explore Learning Resources
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

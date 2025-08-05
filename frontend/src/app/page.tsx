"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Camera, MessageCircle, Leaf, Sprout, TreePine, Users } from "lucide-react"
import { NavBar } from "../components/NavBar"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Navigation */}
      <NavBar/>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6 leading-tight">Check Your Soil Health</h1>
          <p className="text-xl md:text-2xl text-green-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            🌱 Learn, Grow, and Sustain with our easy-to-use soil monitoring tool designed for everyone! 🌍
          </p>
          <Link href="/upload">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              aria-label="Upload or take a photo of soil to analyze"
            >
              <Camera className="mr-3 h-6 w-6" />
              Upload or Take a Photo of Soil
            </Button>
          </Link>
        </div>
      </section>

      {/* Healthy Soil Illustration Section */}
      <section className="py-16 px-4">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 rounded-full p-6">
                <Sprout className="h-16 w-16 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-green-800 mb-4">Healthy Soil = Happy Plants! 🌿</h2>
            <p className="text-lg text-green-700 leading-relaxed">
              Good soil is full of nutrients, has the right pH balance, and helps plants grow strong. Let's discover
              what makes your garden soil special!
            </p>
          </div>
        </div>
      </section>

      {/* Educational Tips Section */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-3xl md:text-4xl font-bold text-green-800 text-center mb-12 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            🌱 Soil Health Tips for Everyone
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <TreePine className="h-8 w-8 text-green-600" />,
                title: "For Kids 👶",
                tips: [
                  "Soil is like food for plants! 🍎",
                  "Worms help make soil healthy 🪱",
                  "Different colors mean different soil types 🎨",
                  "Plants need water, air, and good soil to grow 💧",
                ],
              },
              {
                icon: <Leaf className="h-8 w-8 text-green-600" />,
                title: "For Everyone 🌍",
                tips: [
                  "Test your soil's pH level regularly",
                  "Add compost to improve soil health",
                  "Avoid overwatering your plants",
                  "Rotate crops to keep soil nutrients balanced",
                ],
              },
              {
                icon: <Users className="h-8 w-8 text-green-600" />,
                title: "For Seniors 👴👵",
                tips: [
                  "Use raised beds for easier gardening",
                  "Mulch helps retain soil moisture",
                  "Choose native plants for your area",
                  "Start small and expand your garden gradually",
                ],
              },
            ].map((section, index) => (
              <Card
                key={index}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 delay-${700 + index * 200} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {section.icon}
                    <h3 className="text-xl font-bold text-green-800 ml-3">{section.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {section.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="text-green-700 text-lg leading-relaxed flex items-start">
                        <span className="text-green-500 mr-2 text-xl">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Chatbot Section */}
      <section className="py-16 px-4">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-3xl shadow-xl p-8 md:p-12 text-white">
            <MessageCircle className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Need Help? Ask SoilBot! 🤖</h2>
            <p className="text-xl mb-8 opacity-90">
              Our friendly chatbot is here to answer all your soil health questions!
            </p>
            <Link href="/chat">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                aria-label="Chat with SoilBot about soil health"
              >
                <MessageCircle className="mr-3 h-6 w-6" />
                Chat with SoilBot
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-8 w-8" />
                <span className="text-xl font-bold">SoilCare</span>
              </div>
              <p className="text-green-200 text-lg leading-relaxed">
                Making soil health accessible and fun for everyone! 🌱
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-green-200 hover:text-white text-lg transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/learn" className="text-green-200 hover:text-white text-lg transition-colors">
                    Learn More
                  </Link>
                </li>
                <li>
                  <Link href="/chat" className="text-green-200 hover:text-white text-lg transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Get Started</h3>
              <Link href="/upload">
                <Button
                  variant="outline"
                  className="border-green-200 text-green-200 hover:bg-green-200 hover:text-green-800 text-lg px-6 py-3 rounded-full bg-transparent"
                  aria-label="Start analyzing your soil"
                >
                  Analyze Your Soil
                </Button>
              </Link>
            </div>
          </div>
          <div className="border-t border-green-700 mt-8 pt-8 text-center">
            <p className="text-green-200 text-lg">© 2025 SoilCare. Made with 💚 for our planet.</p>
          </div>
        </div>
      </footer>

      {/* Floating Chatbot Button */}
      <Link href="/chat">
        <Button
          className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
          aria-label="Open chatbot"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { ArrowLeft, Heart, Users, Target, MessageCircle, Mail, Leaf } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const teamMembers = [
    {
      name: "Dr. Sarah Green",
      role: "Soil Scientist",
      description: "Passionate about making soil science accessible to everyone!",
      avatar: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "Mike Earth",
      role: "Education Specialist",
      description: "Loves teaching kids and seniors about the wonders of nature.",
      avatar: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "Emma Bloom",
      role: "UX Designer",
      description: "Designs experiences that make learning fun and accessible.",
      avatar: "/placeholder.svg?height=120&width=120",
    },
  ]

  const timeline = [
    {
      year: "2023",
      title: "The Idea Sprouts 🌱",
      description: "We noticed that soil health information was too complex for many people to understand and use.",
    },
    {
      year: "2024",
      title: "Building Our Tool 🔨",
      description: "We developed an AI-powered tool that makes soil analysis simple and accessible for all ages.",
    },
    {
      year: "Today",
      title: "Growing Together 🌿",
      description: "Thousands of families are now growing healthier gardens with our help!",
    },
  ]

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
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">About SoilBuddy 🌍</h1>
          <p className="text-xl text-green-700 leading-relaxed max-w-4xl mx-auto">
            We believe everyone—young and old—can learn how to protect our soil and environment. Our mission is to make
            soil health accessible, fun, and meaningful for all! 🌱
          </p>
        </div>

        {/* Mission Statement */}
        <Card
          className={`bg-white rounded-3xl shadow-xl overflow-hidden mb-16 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="bg-green-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-3">Our Mission</h3>
                <p className="text-green-700 leading-relaxed">
                  To make soil health education accessible and enjoyable for people of all ages, fostering a deeper
                  connection with our environment.
                </p>
              </div>
              <div>
                <div className="bg-green-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-3">Our Community</h3>
                <p className="text-green-700 leading-relaxed">
                  We serve families, schools, and communities who want to learn about sustainable gardening and
                  environmental stewardship.
                </p>
              </div>
              <div>
                <div className="bg-green-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Target className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-3">Our Goal</h3>
                <p className="text-green-700 leading-relaxed">
                  To empower everyone with the knowledge and tools needed to grow healthy plants and contribute to a
                  sustainable future.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <div
          className={`mb-16 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-12">Meet Our Team 👥</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <CardContent className="p-8 text-center">
                  <Image
                    src={member.avatar || "/placeholder.svg"}
                    alt={`${member.name} - ${member.role}`}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-green-200"
                  />
                  <h3 className="text-xl font-bold text-green-800 mb-2">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-3">{member.role}</p>
                  <p className="text-green-700 leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div
          className={`mb-16 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-12">Our Story 📖</h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <Card key={index} className="bg-white rounded-3xl shadow-lg overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-green-600 text-white rounded-full px-4 py-2 font-bold text-lg min-w-fit">
                      {item.year}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-green-800 mb-3">{item.title}</h3>
                      <p className="text-green-700 text-lg leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card
          className={`bg-gradient-to-r from-green-400 to-green-600 rounded-3xl shadow-xl overflow-hidden transition-all duration-1000 delay-900 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <CardContent className="p-8 md:p-12 text-center text-white">
            <Leaf className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Join the Cause! 🌱</h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Ready to start your soil health journey? We'd love to hear from you and help you grow! Whether you have
              questions, feedback, or just want to share your gardening success stories, we're here for you! 💚
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/upload">
                <Button
                  variant="secondary"
                  className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  aria-label="Start analyzing your soil"
                >
                  <Leaf className="mr-3 h-6 w-6" />
                  Start Your Journey
                </Button>
              </Link>
              <Link href="/chat">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg rounded-full bg-transparent"
                  aria-label="Give feedback or ask questions"
                >
                  <MessageCircle className="mr-3 h-6 w-6" />
                  Give Feedback
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div
          className={`mt-12 text-center transition-all duration-1000 delay-1100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Card className="bg-white rounded-2xl shadow-lg inline-block">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Mail className="h-6 w-6 text-green-600" />
                <div>
                  <p className="text-green-800 font-medium">Questions or suggestions?</p>
                  <p className="text-green-600">hello@soilbuddy.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

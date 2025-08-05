"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { ArrowLeft, Send, Mic, Leaf, User, Bot } from "lucide-react"

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm SoilBot! 🌱 I'm here to help you learn about soil health. What would you like to know?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const quickReplies = [
    "How do I improve sandy soil?",
    "What is pH in soil?",
    "Why are worms good for soil?",
    "How often should I water my plants?",
    "What is compost?",
  ]

  const botResponses: { [key: string]: string } = {
    sandy:
      "Sandy soil drains quickly but doesn't hold nutrients well. Add compost or organic matter to help it retain water and nutrients! 🏖️➡️🌱",
    ph: "pH measures how acidic or basic your soil is! Most plants like soil between 6.0-7.0 pH. It's like the soil's mood - not too sour, not too bitter! 😊",
    worms:
      "Worms are soil superheroes! 🪱 They eat organic matter and create nutrient-rich castings (worm poop!) that plants love. They also create tunnels that help air and water reach plant roots!",
    water:
      "Most plants need water when the top inch of soil feels dry. Stick your finger into the soil - if it's dry, it's time to water! 💧",
    compost:
      "Compost is like a superfood smoothie for your soil! 🥤 It's made from decomposed organic materials like food scraps and leaves. It adds nutrients and helps soil hold water better!",
    default:
      "That&apos;s a great question! 🤔 Soil health involves many factors like nutrients, pH, moisture, and beneficial organisms. Would you like to know more about any specific aspect?",
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("sandy") || message.includes("sand")) return botResponses.sandy
    if (message.includes("ph")) return botResponses.ph
    if (message.includes("worm")) return botResponses.worms
    if (message.includes("water") || message.includes("watering")) return botResponses.water
    if (message.includes("compost")) return botResponses.compost
    if (message.includes("hello") || message.includes("hi"))
      return "Hello there! 👋 I'm excited to help you learn about soil! What's growing in your garden?"
    if (message.includes("thank")) return "You're so welcome! 😊 Keep asking questions - learning about soil is fun! 🌱"

    return botResponses.default
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputText),
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickReply = (reply: string) => {
    setInputText(reply)
    inputRef.current?.focus()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
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
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-green-800">SoilBot</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-4rem)] flex flex-col">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <div className="bg-green-100 rounded-full p-3">
                <Bot className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-green-800">Ask SoilBot! 🤖</h1>
            </div>
            <p className="text-green-700 text-lg">Your friendly soil health assistant is here to help! 🌱</p>
          </div>
        </div>

        {/* Quick Reply Suggestions */}
        <div className="mb-6">
          <p className="text-green-700 font-medium mb-3 text-center">💡 Try asking about:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {quickReplies.map((reply, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleQuickReply(reply)}
                className="border-green-300 text-green-700 hover:bg-green-50 text-sm rounded-full px-4 py-2"
                aria-label={`Quick question: ${reply}`}
              >
                {reply}
              </Button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <Card className="flex-1 bg-white rounded-3xl shadow-xl overflow-hidden mb-4">
          <CardContent className="p-0 h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"} animate-fade-in`}
                >
                  <div
                    className={`flex items-start space-x-3 max-w-xs md:max-w-md ${message.isBot ? "" : "flex-row-reverse space-x-reverse"}`}
                  >
                    <div className={`rounded-full p-2 ${message.isBot ? "bg-green-100" : "bg-blue-100"}`}>
                      {message.isBot ? (
                        <Bot className="h-5 w-5 text-green-600" />
                      ) : (
                        <User className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.isBot ? "bg-green-100 text-green-800" : "bg-blue-500 text-white"
                      }`}
                    >
                      <p className="text-sm md:text-base leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.isBot ? "text-green-600" : "text-blue-200"}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="flex items-start space-x-3 max-w-xs md:max-w-md">
                    <div className="rounded-full p-2 bg-green-100">
                      <Bot className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="bg-green-100 text-green-800 rounded-2xl px-4 py-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-green-100 p-4">
              <div className="flex space-x-3">
                <Input
                  ref={inputRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about soil health... 🌱"
                  className="flex-1 rounded-full border-green-300 focus:border-green-500 text-lg py-3 px-6"
                  aria-label="Type your question about soil health"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-full p-3 disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-50 rounded-full p-3 bg-transparent"
                  aria-label="Voice input (coming soon)"
                  disabled
                >
                  <Mic className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-xs text-green-600 mt-2 text-center">
                💬 SoilBot is here to help with all your soil questions!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

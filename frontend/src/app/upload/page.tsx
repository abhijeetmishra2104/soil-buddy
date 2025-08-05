"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Upload, Camera, ArrowLeft, ImageIcon, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleCameraClick = () => {
    cameraInputRef.current?.click()
  }

  const handleSubmit = async () => {
  if (!selectedFile) return

  setIsAnalyzing(true)

  const formData = new FormData()
  formData.append("file", selectedFile)

  try {
    const response = await fetch("http://localhost:3002/upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to upload image")
    }

    const data = await response.json()

    console.log("Image uploaded to Cloudinary:", data.url)

    // You can store the returned URL in DB or pass it to another page
    router.push("/results") // You can also pass data.url as a query param if needed
  } catch (error) {
    console.error("Upload error:", error)
    alert("Failed to analyze the soil. Please try again.")
  } finally {
    setIsAnalyzing(false)
  }
}


  const handleReset = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
    if (cameraInputRef.current) cameraInputRef.current.value = ""
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

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">Upload Your Soil Photo 📸</h1>
          <p className="text-xl text-green-700 leading-relaxed max-w-3xl mx-auto">
            Take a clear photo of your garden soil to get started! Make sure the soil is visible and well-lit for the
            best results. 🌱
          </p>
        </div>

        {/* Upload Section */}
        <Card className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <CardContent className="p-8 md:p-12">
            {!selectedFile ? (
              <div className="space-y-8">
                {/* Upload Instructions */}
                <div className="text-center">
                  <ImageIcon className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-green-800 mb-4">Choose how to add your soil photo:</h2>
                </div>

                {/* Upload Buttons */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Button
                    onClick={handleUploadClick}
                    className="h-32 bg-green-100 hover:bg-green-200 text-green-800 border-2 border-green-300 hover:border-green-400 rounded-2xl text-lg font-medium transition-all duration-300 transform hover:scale-105"
                    aria-label="Upload a photo from your device"
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <Upload className="h-8 w-8" />
                      <span>Upload from Device</span>
                      <span className="text-sm opacity-75">Choose from gallery</span>
                    </div>
                  </Button>

                  <Button
                    onClick={handleCameraClick}
                    className="h-32 bg-green-100 hover:bg-green-200 text-green-800 border-2 border-green-300 hover:border-green-400 rounded-2xl text-lg font-medium transition-all duration-300 transform hover:scale-105"
                    aria-label="Take a photo with your camera"
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <Camera className="h-8 w-8" />
                      <span>Take Photo</span>
                      <span className="text-sm opacity-75">Use camera</span>
                    </div>
                  </Button>
                </div>

                {/* Hidden file inputs */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  aria-label="File input for uploading soil photos"
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileSelect}
                  className="hidden"
                  aria-label="Camera input for taking soil photos"
                />

                {/* Tips */}
                <div className="bg-green-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-green-800 mb-3">📝 Tips for the best photo:</h3>
                  <ul className="space-y-2 text-green-700">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Make sure the soil is clearly visible
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Take the photo in good lighting (natural light works best!)
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Remove any leaves or debris from the soil surface
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Hold your camera steady for a clear image
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Preview */}
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-green-800 mb-4">Great! Here's your soil photo:</h2>
                </div>

                <div className="relative">
                  <Image
                    src={previewUrl! || "/placeholder.svg"}
                    alt="Soil sample preview"
                    className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleSubmit}
                    disabled={isAnalyzing}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Analyze the uploaded soil photo"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Analyzing Soil...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-3 h-6 w-6" />
                        Analyze My Soil
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="border-green-300 text-green-700 hover:bg-green-50 px-8 py-4 text-lg rounded-full bg-transparent"
                    aria-label="Choose a different photo"
                  >
                    Choose Different Photo
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <p className="text-green-700 text-lg mb-4">Need help or have questions? 🤔</p>
          <Link href="/chat">
            <Button
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-50 px-6 py-3 text-lg rounded-full bg-transparent"
              aria-label="Get help from SoilBot"
            >
              Ask SoilBot for Help
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

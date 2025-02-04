import React from 'react'
import { 
  Navigation, 
  ShieldCheck, 
  MapPin, 
  AlertTriangle, 
  Zap 
} from 'lucide-react'


function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4">
          DriveEase
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your Intelligent Highway Companion Ensuring Safe and Smooth Travels Across Kerala
        </p>
        
        {/* CTA Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition flex items-center">
            <Zap className="mr-2" /> Get Started
          </button>
          <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50 transition flex items-center">
            <ShieldCheck className="mr-2" /> Learn More
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
          How DriveEase Keeps You Safe
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition">
            <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Instant Alerts</h3>
            <p className="text-gray-600">
              Real-time notifications about road conditions, accidents, and potential hazards
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition">
            <Navigation className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Navigation</h3>
            <p className="text-gray-600">
              Optimized routes avoiding traffic congestion and high-risk zones
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition">
            <MapPin className="mx-auto h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Emergency Locator</h3>
            <p className="text-gray-600">
              Precise location sharing and quick emergency service connection
            </p>
          </div>
        </div>
      </div>

      {/* Kerala Highways Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Designed for Kerala's Highways
          </h2>
          <p className="max-w-2xl mx-auto text-lg mb-8">
            Our solution is specifically tailored to address the unique challenges of Kerala's diverse and dynamic highway system
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50 transition">
            Explore Our Technology
          </button>
        </div>
      </div>

      {/* Footer-like Call to Action */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold text-blue-900 mb-6">
          Stay Safe, Travel Smart
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Download DriveEase and transform your highway experience
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition">
            iOS Download
          </button>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition">
            Android Download
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
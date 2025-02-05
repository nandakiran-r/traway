import React, { useState } from 'react';
import { Car, Map, Clock, Bell, BarChart3, Shield, Phone, Mail, MapPin, Users, Building2, Trophy, History } from 'lucide-react';
import { useNavigate } from 'react-router';
import logo from '@/assets/logo.png';

function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header id="home" className="relative h-[600px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80"
            alt="Traffic background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <nav className="relative z-10 container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Traway" className="h-8 w-8" />
              {/* <Car className="h-8 w-8 text-white" /> */}
              <span className="text-2xl font-bold text-white">Traway</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-white hover:text-gray-200">Home</a>
              <a href="#features" className="text-white hover:text-gray-200">Features</a>
              <a href="#about" className="text-white hover:text-gray-200">About</a>
              <a href="#contact" className="text-white hover:text-gray-200">Contact</a>
            </div>
          </div>
        </nav>

        <div className="relative z-10 container mx-auto px-6 pt-32">
          <h1 className="text-5xl md:text-6xl font-bold text-white max-w-3xl">
            Navigate Smart, Drive Better with Real-time Traffic Solutions
          </h1>
          <p className="mt-6 text-xl text-gray-200 max-w-2xl">
            Get real-time traffic updates, optimal route planning, and smart navigation assistance for a smoother commute.
          </p>
          <button className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={()=> {
            navigate('/app')
          }}
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Why Choose Traway?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Map className="h-8 w-8 text-blue-600" />}
              title="Travel Together"
              description="Share your route, find a ride"
            />
            <FeatureCard 
              icon={<Clock className="h-8 w-8 text-blue-600" />}
              title="Relocated Shops"
              description="Track down your favorite relocated shops "
            />
            <FeatureCard 
              icon={<Bell className="h-8 w-8 text-blue-600" />}
              title="Incident Report"
              description="Swift reporting for rapid emergency response"
            />
            <FeatureCard 
              icon={<BarChart3 className="h-8 w-8 text-blue-600" />}
              title="Breach Report"
              description="Report traffic breaches with ease!"
            />
            <FeatureCard 
              icon={<Shield className="h-8 w-8 text-blue-600" />}
              title="Petition Hub"
              description="Raise your voice—submit petitions for highway improvements!"
            />
            <FeatureCard 
              icon={<Car className="h-8 w-8 text-blue-600" />}
              title="Restroom Finder"
              description=" Quickly locate restrooms for a smooth, comfortable journey!"
            />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Traway</h2>
            <p className="text-lg text-gray-600">
            Traway is a smart highway travel companion designed to make journeys safer and more convenient. Easily find relocated shops, nearby restrooms, and essential stops along your route. Report traffic violations, submit petitions for highway improvements, and stay informed about road conditions. With features that enhance security, comfort, and community, Traway ensures a smoother and more reliable travel experience for everyone on the road.            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <img
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80"
                alt="Office team"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-gray-600 mb-6">
              Traway aims to make highway travel safer, more convenient, and community-driven. We connect travelers with essential services, enable secure ride-sharing, and provide platforms for reporting issues and improving road conditions. Our goal is to ensure smoother, safer, and more reliable journeys for everyone.              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6 text-blue-600" />
                  <span className="font-semibold">50K+ Users</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Building2 className="h-6 w-6 text-blue-600" />
                  <span className="font-semibold">20+ Cities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Trophy className="h-6 w-6 text-blue-600" />
                  <span className="font-semibold">15+ Awards</span>
                </div>
                <div className="flex items-center space-x-3">
                  <History className="h-6 w-6 text-blue-600" />
                  <span className="font-semibold">3+ Years</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h4>
              <p className="text-gray-600">
              To revolutionize highway travel with safety, convenience, and community-driven solutions.              </p>
            </div>
            <div className="text-center p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Our Values</h4>
              <p className="text-gray-600">
              Safety, reliability, convenience, and community—driving better travel experiences for everyone.              </p>
            </div>
            <div className="text-center p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Our Impact</h4>
              <p className="text-gray-600">
              Enhancing highway travel by improving safety, accessibility, and connectivity for all travelers.              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Get in Touch</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Address</h4>
                      <p className="text-gray-600">123 Traffic Way, Tech City, TC 12345</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Phone</h4>
                      <p className="text-gray-600">+91 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <p className="text-gray-600">contact@traway.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to Transform Your Daily Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied users who have made their journey smoother with Traway.
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors">
            Download Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Car className="h-6 w-6" />
                <span className="text-xl font-bold">Traway</span>
              </div>
              <p className="text-sm">
                Making traffic navigation smarter and easier for everyone.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="hover:text-white">About Us</a></li>
                <li><a href="#careers" className="hover:text-white">Careers</a></li>
                <li><a href="#press" className="hover:text-white">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#blog" className="hover:text-white">Blog</a></li>
                <li><a href="#help" className="hover:text-white">Help Center</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#privacy" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#cookies" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            © {new Date().getFullYear()} Traway. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default Home;
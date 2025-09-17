"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Globe, Users, Award, Mail, Phone, MapPin, ChevronRight, Star, ArrowRight, CheckCircle, TrendingUp } from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white shadow-sm z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Globe className="h-8 w-8 text-[#377A00]" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#377A00] rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold text-[#377A00]">Earthib</span>
                <span className="text-xs text-gray-500 ml-1">.com</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection("home")} 
                className="text-gray-700 hover:text-[#377A00] transition-colors font-medium"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection("about")} 
                className="text-gray-700 hover:text-[#377A00] transition-colors font-medium"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection("services")} 
                className="text-gray-700 hover:text-[#377A00] transition-colors font-medium"
              >
                Offerings
              </button>
              <button 
                onClick={() => scrollToSection("contact")} 
                className="text-gray-700 hover:text-[#377A00] transition-colors font-medium"
              >
                Contact
              </button>
              <Button className="bg-[#377A00] hover:bg-[#2d6200] text-white shadow-md hover:shadow-lg transition-shadow">
                Acquire Domain
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </nav>

            {/* Mobile Navigation */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
                <nav className="flex flex-col space-y-4 mt-8">
                  <button 
                    onClick={() => scrollToSection("home")} 
                    className="text-left text-gray-700 hover:text-[#377A00] transition-colors py-3 px-4 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => scrollToSection("about")} 
                    className="text-left text-gray-700 hover:text-[#377A00] transition-colors py-3 px-4 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    About
                  </button>
                  <button 
                    onClick={() => scrollToSection("services")} 
                    className="text-left text-gray-700 hover:text-[#377A00] transition-colors py-3 px-4 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Offerings
                  </button>
                  <button 
                    onClick={() => scrollToSection("contact")} 
                    className="text-left text-gray-700 hover:text-[#377A00] transition-colors py-3 px-4 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Contact
                  </button>
                  <Button className="bg-[#377A00] hover:bg-[#2d6200] w-full mt-4 shadow-md">
                    Acquire Domain
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-24 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-6xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full shadow-sm mb-8">
              <Star className="h-4 w-4 text-[#377A00]" />
              <span className="text-sm font-semibold text-gray-700">Premium Domain Available</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="block">Unlock Your</span>
              <span className="block text-[#377A00]">Digital Potential</span>
              <span className="block text-gray-700">with Earthib.com</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto">
              Transform this premium domain into your unique digital destination. Establish a powerful online presence that stands out in today's competitive landscape.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button size="lg" className="bg-[#377A00] hover:bg-[#2d6200] text-white text-xl px-12 py-6 shadow-lg hover:shadow-xl transition-shadow">
                Acquire Domain
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button size="lg" variant="outline" className="text-xl px-12 py-6 rounded-full border-2 border-gray-200 hover:border-[#377A00] hover:bg-gray-50 transition-colors">
                Learn More
              </Button>
            </div>

            {/* Domain Value Proposition */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-[#377A00] mb-2">Premium</div>
                <div className="text-sm text-gray-600">Brandable Domain Name</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-[#377A00] mb-2">Global</div>
                <div className="text-sm text-gray-600">Worldwide Recognition</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-[#377A00] mb-2">Limited</div>
                <div className="text-sm text-gray-600">Exclusive Opportunity</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Founders */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Meet the Visionaries</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The founders behind Earthib.com's digital innovation
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            {/* Hridoy Varaby */}
            <div className="group h-full">
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
                <div className="relative h-80 overflow-hidden flex-shrink-0">
                  <img 
                    src="http://images.varabit.com/uploads/hridoyvaraby.jpg" 
                    alt="Hridoy Varaby"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-[#377A00]" />
                      <span className="text-sm font-medium">Founder & CEO</span>
                    </div>
                    <h3 className="text-3xl font-bold">Hridoy Varaby</h3>
                  </div>
                </div>
                <div className="p-8 flex-grow">
                  <div className="flex items-center space-x-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-[#377A00]" />
                    <span className="text-[#377A00] font-semibold">Digital Entrepreneur</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our mission at Earthib is to empower others to unleash their creativity and expand their digital footprint by providing a premium domain that embodies endless possibilities.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    My journey with Earthib began as a passion project, fueled by the desire to create a unique online presence that resonates with individuals and businesses alike.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Rihanoor Islam Protik */}
            <div className="group h-full">
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
                <div className="relative h-80 overflow-hidden flex-shrink-0">
                  <img 
                    src="http://images.varabit.com/uploads/protik.jpg" 
                    alt="Rihanoor Islam Protik"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center space-x-2 mb-2">
                      <Award className="h-5 w-5 text-[#377A00]" />
                      <span className="text-sm font-medium">Founder & CTO</span>
                    </div>
                    <h3 className="text-3xl font-bold">Rihanoor Islam Protik</h3>
                  </div>
                </div>
                <div className="p-8 flex-grow">
                  <div className="flex items-center space-x-2 mb-4">
                    <Star className="h-5 w-5 text-[#377A00]" />
                    <span className="text-[#377A00] font-semibold">Innovation Leader</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We envision Earthib as the gateway to a world of digital innovation, where every idea finds a home and every venture thrives in the online realm.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We are humbled to have received recognition for my work, including awards for creativity, innovation, and digital entrepreneurship.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-[#377A00] hover:bg-[#2d6200] text-white px-12 py-6 shadow-lg hover:shadow-xl transition-shadow">
              Connect with Us
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Our Story Behind Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Story Behind</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Crafting Digital Destinations with Earthib
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Domain Ownership</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  As the proud owner of Earthib.com, I am excited to offer this premium domain for sale to potential buyers looking to make their mark in the digital world.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Versatile Platform</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  With Earthib, my goal is to provide a versatile platform for individuals and businesses to create unique online identities and establish a strong presence.
                </p>
              </div>
              <Button variant="outline" className="text-[#377A00] border-[#377A00] hover:bg-gray-50 px-8 py-4 rounded-full text-lg">
                Read More
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="bg-[#377A00] rounded-3xl p-12 shadow-xl text-white">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">Empowering Digital Success</h3>
              </div>
              <p className="text-lg leading-relaxed mb-8">
                Having curated Earthib.com with endless branding possibilities, I aim to empower buyers to transform this domain into their own digital success story.
              </p>
              <Button className="bg-white text-[#377A00] hover:bg-gray-100 px-8 py-3 rounded-full font-semibold shadow-md">
                Let's Connect
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Premium Offerings</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions for your digital success
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="group">
              <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-[#377A00] rounded-2xl flex items-center justify-center shadow-md">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Branding Solutions</h3>
                    <p className="text-[#377A00] font-medium">Premium Domain Services</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  At Earthib, we specialize in helping businesses elevate their online presence through premium domain acquisition. Our expert team ensures a smooth transition for buyers to unlock the full potential of their digital ventures.
                </p>
                <Button variant="link" className="text-[#377A00] p-0 hover:text-[#2d6200] transition-colors">
                  Explore Solutions <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="group">
              <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-[#377A00] rounded-2xl flex items-center justify-center shadow-md">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Digital Presence</h3>
                    <p className="text-[#377A00] font-medium">Online Development</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  In addition to domain sales, Earthib provides personalized consultation services to guide buyers in leveraging their online assets effectively. We are committed to supporting our clients in maximizing their digital presence and achieving their business goals.
                </p>
                <Button variant="link" className="text-[#377A00] p-0 hover:text-[#2d6200] transition-colors">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-20">
            <div className="bg-[#377A00] rounded-3xl p-12 shadow-xl max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">Elevate Your Digital Presence</h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Take action now and transform your online identity with Earthib.com
              </p>
              <Button size="lg" className="bg-white text-[#377A00] hover:bg-gray-100 text-xl px-12 py-6 shadow-lg hover:shadow-xl transition-shadow">
                Acquire Domain
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Journey</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The story behind Earthib.com's evolution and vision
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-[#377A00] rounded-2xl flex items-center justify-center shadow-md">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Our Beginning</h3>
                    <p className="text-[#377A00] font-medium">Foundation Story</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Welcome to Earthib.com, a domain that was once the home of two ambitious entrepreneurs, Hridoy Varaby and Rihanoor Islam Protik. Originally acquired for a project, this domain now stands as a testament to our journey and growth in the world of business.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-[#377A00] rounded-2xl flex items-center justify-center shadow-md">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">New Horizons</h3>
                    <p className="text-[#377A00] font-medium">Future Vision</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  As we venture into new opportunities and projects, we have made the decision to offer Earthib.com for sale. While this chapter may be coming to a close, it marks the beginning of exciting ventures on the horizon.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-[#377A00] rounded-2xl flex items-center justify-center shadow-md">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Our Values</h3>
                    <p className="text-[#377A00] font-medium">Core Principles</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  We are grateful for the experiences and lessons learned during our time with Earthib.com. As we embark on new paths, we carry with us the spirit of innovation, determination, and collaboration that defined our time here.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-[#377A00] rounded-2xl flex items-center justify-center shadow-md">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Looking Forward</h3>
                    <p className="text-[#377A00] font-medium">Future Adventures</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Thank you for being part of our story. We invite you to explore what's next for us and stay tuned for more adventures ahead!
                </p>
              </div>
            </div>
            
            <div className="text-center mt-16">
              <Button className="bg-[#377A00] hover:bg-[#2d6200] text-white px-12 py-6 shadow-lg hover:shadow-xl transition-shadow">
                Connect with Us
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-[#377A00] text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <Star className="h-5 w-5 text-white" />
            <span className="text-lg font-semibold">Limited Time Opportunity</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Start Your Online Journey
            <span className="block text-3xl md:text-4xl font-light mt-4">with Earthib</span>
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-white/90">
            Don't miss this exclusive opportunity to own a premium domain that can elevate your brand to new heights in the digital landscape.
          </p>
          <Button size="lg" className="bg-white text-[#377A00] hover:bg-gray-100 text-xl px-12 py-6 shadow-lg hover:shadow-xl transition-shadow">
            Acquire Domain
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Connect with Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get in Touch for Inquiries
            </p>
            <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
              Contact Us for Further Assistance
            </p>
            <p className="text-lg text-gray-700 mt-2 max-w-2xl mx-auto">
              We are here to answer your questions and queries
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div className="space-y-8 h-full">
              <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 h-full flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-6 flex-grow">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-[#377A00] rounded-xl flex items-center justify-center">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-[#377A00]">+8801722895295</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-[#377A00] rounded-xl flex items-center justify-center">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-[#377A00]">varabitofficial@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-[#377A00] rounded-xl flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Location</p>
                      <p className="text-[#377A00]">Dhaka, Bangladesh</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Button size="lg" className="bg-[#377A00] hover:bg-[#2d6200] text-white px-12 py-6 shadow-lg hover:shadow-xl transition-shadow w-full">
                    Connect with Us
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="h-full">
              <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 h-full flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                <form className="space-y-6 flex-grow">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#377A00] focus:border-transparent transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#377A00] focus:border-transparent transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#377A00] focus:border-transparent transition-colors resize-none"
                      placeholder="Tell us about your interest in Earthib.com..."
                    ></textarea>
                  </div>
                  <div className="mt-auto">
                    <Button type="submit" className="w-full bg-[#377A00] hover:bg-[#2d6200] text-white py-4 shadow-lg hover:shadow-xl transition-shadow rounded-xl">
                      Send Message
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <Globe className="h-8 w-8 text-[#377A00]" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#377A00] rounded-full"></div>
                </div>
                <div>
                  <span className="text-xl font-bold">Earthib</span>
                  <span className="text-xs text-gray-400 ml-1">.com</span>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Premium domain for acquisition. Transform your online presence with Earthib.com.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-gray-200">Quick Links</h4>
              <ul className="space-y-3">
                <li><button onClick={() => scrollToSection("home")} className="text-gray-400 hover:text-white transition-colors">Home</button></li>
                <li><button onClick={() => scrollToSection("about")} className="text-gray-400 hover:text-white transition-colors">About</button></li>
                <li><button onClick={() => scrollToSection("services")} className="text-gray-400 hover:text-white transition-colors">Offerings</button></li>
                <li><button onClick={() => scrollToSection("contact")} className="text-gray-400 hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-gray-200">Services</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Domain Acquisition</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Branding Solutions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Online Presence</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Consultation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-gray-200">Get in Touch</h4>
              <div className="space-y-3">
                <p className="text-gray-400">varabitofficial@gmail.com</p>
                <p className="text-gray-400">+8801722895295</p>
                <p className="text-gray-400">Dhaka, Bangladesh</p>
                <div className="flex space-x-4 mt-6">
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#377A00] transition-colors">
                    <span className="sr-only">Twitter</span>
                    <div className="w-5 h-5 bg-current rounded"></div>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#377A00] transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <div className="w-5 h-5 bg-current rounded"></div>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#377A00] transition-colors">
                    <span className="sr-only">Instagram</span>
                    <div className="w-5 h-5 bg-current rounded"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">© 2024 Earthib. All right control and manage by Varabit Web Design & Development.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
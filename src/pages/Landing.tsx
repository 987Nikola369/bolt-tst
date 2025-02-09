import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Facebook, Instagram, Mail, MapPin, Phone, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import ApplicationForm from '../components/ApplicationForm';

const Hero = () => (
  <section className="py-20 bg-[#231F20] text-white">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">
            Rocket Football Academy
          </h1>
          <p className="text-gray-300 text-lg">
            Developing young talents into tomorrow's football stars. Join our elite program!
          </p>
          <Link to="/application">
            <button className="bg-[#E41E12] text-white py-3 px-6 rounded-md hover:bg-[#E41E12]/80 transition-colors">
              Apply Now <ArrowRight className="ml-2 inline-block" size={20} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Camp = () => (
  <section className="py-16 bg-gray-800 text-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Our Football Camp</h2>
      <p className="text-gray-300 text-center mb-12">
        Rocket Football Academy with the aim of developing young talents
      </p>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-2">Professional Training</h3>
          <p className="text-gray-300">Learn from experienced coaches and improve your skills.</p>
        </div>
        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-2">Modern Facilities</h3>
          <p className="text-gray-300">Train in state-of-the-art facilities with the latest equipment.</p>
        </div>
        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-2">Personalized Approach</h3>
          <p className="text-gray-300">Individual attention to help you reach your full potential.</p>
        </div>
      </div>
    </div>
  </section>
);

const Accommodation = () => (
  <section className="py-16 bg-gray-900 text-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Accommodation</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-2">Hotel Plaza Duće</h3>
          <p className="text-gray-300">Duće</p>
          <p className="text-[#E41E12] font-semibold">99€ per person</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-2">Hotel Plaza Omiš</h3>
          <p className="text-gray-300">Omiš centar</p>
          <p className="text-[#E41E12] font-semibold">99€ per person</p>
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section className="py-16 bg-gray-900 text-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="text-gray-300 mb-6">Contact us for more information.</p>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
              <input type="text" id="name" className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#E41E12] focus:ring focus:ring-[#E41E12] focus:ring-opacity-50" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
              <input type="email" id="email" className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#E41E12] focus:ring focus:ring-[#E41E12] focus:ring-opacity-50" />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
              <textarea id="message" rows={4} className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#E41E12] focus:ring focus:ring-[#E41E12] focus:ring-opacity-50"></textarea>
            </div>
            <button type="submit" className="w-full bg-[#E41E12] text-white py-3 px-6 rounded-md hover:bg-[#E41E12]/80 transition-colors">Send Message</button>
          </form>
        </div>
        <div>
          <p className="text-gray-300 mb-4">Our contact information:</p>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center space-x-4 mb-4">
              <Mail className="h-6 w-6 text-[#E41E12]" />
              <div>
                <p className="font-medium text-white">Email:</p>
                <p className="text-gray-300">info@rocketfootballacademy.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <MapPin className="h-6 w-6 text-[#E41E12]" />
              <div>
                <p className="font-medium text-white">Address:</p>
                <p className="text-gray-300">Split, Hrvatska</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="h-6 w-6 text-[#E41E12]" />
              <div>
                <p className="font-medium text-white">Phone:</p>
                <p className="text-gray-300">+385 XXX XXX XXXX</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-8 bg-gray-900 text-white">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <Rocket className="h-6 w-6 text-[#E41E12]" />
          <p className="font-bold">Rocket Football Academy</p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-[#E41E12] transition-colors"><Facebook className="h-6 w-6" /></a>
          <a href="#" className="text-gray-400 hover:text-[#E41E12] transition-colors"><Instagram className="h-6 w-6" /></a>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
        <p>© {new Date().getFullYear()} Rocket Football Academy. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const Landing: React.FC = () => {
  return (
    <div>
      <Hero />
      <Camp />
      <Accommodation />
      <ApplicationForm />
      <Contact />
      <Footer />
    </div>
  );
};

export default Landing;

"use client";
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer = ({ setCurrentPage }) => {
  const currentYear = new Date().getFullYear();

  const handleNavigation = (page) => {
    if (setCurrentPage) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const footerLinks = {
    company: [
      { name: 'About Us', page: 'about' },
      { name: 'Careers', page: null, message: 'Careers page coming soon!' },
      { name: 'Press', page: null, message: 'Press page coming soon!' },
      { name: 'Blog', page: null, message: 'Blog coming soon!' },
    ],
    support: [
      { name: 'Help Center', page: 'support' },
      { name: 'Contact Us', page: 'support' },
      { name: 'Return Policy', page: 'support' },
      { name: 'Warranty', page: 'support' },
    ],
    products: [
      { name: 'Smart Feeders', page: 'products' },
      { name: 'GPS Trackers', page: 'products' },
      { name: 'Health Monitors', page: 'products' },
      { name: 'Accessories', page: 'products' },
    ],
    legal: [
      { name: 'Privacy Policy', page: null, message: 'Privacy Policy - Coming Soon' },
      { name: 'Terms of Service', page: null, message: 'Terms of Service - Coming Soon' },
      { name: 'Cookie Policy', page: null, message: 'Cookie Policy - Coming Soon' },
    ],
  };

  const handleLinkClick = (link) => {
    if (link.page) {
      handleNavigation(link.page);
    } else if (link.message) {
      alert(link.message);
    }
  };

  return (
    <footer className="mt-20 bg-slate-900 border-t border-slate-800">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">
                <span className="text-white">Smart</span>
                <span className="text-blue-500">Paws</span>
              </h2>
              <p className="text-xs text-gray-500 tracking-widest mt-1">ADVANCED PET TECHNOLOGY</p>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Revolutionizing pet care with cutting-edge technology. Making pet ownership smarter, safer, and more connected.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-blue-500" />
                </div>
                <span>smartpaws@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-blue-500" />
                </div>
                <span>09123456789</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-blue-500" />
                </div>
                <span>Colombo, Sri Lanka</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => handleLinkClick(link)}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm text-left w-full"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => handleLinkClick(link)}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm text-left w-full"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => handleLinkClick(link)}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm text-left w-full"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              &copy; {currentYear} SmartPaws. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              {footerLinks.legal.map((link, index) => (
                <React.Fragment key={link.name}>
                  <button 
                    onClick={() => handleLinkClick(link)} 
                    className="hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </button>
                  {index < footerLinks.legal.length - 1 && <span>•</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
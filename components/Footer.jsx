// components/Footer.jsx
"use client";
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer = ({ setCurrentPage }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', action: () => setCurrentPage('about') },
      { name: 'Careers', action: () => alert('Careers page coming soon!') },
      { name: 'Press', action: () => alert('Press page coming soon!') },
      { name: 'Blog', action: () => alert('Blog coming soon!') },
    ],
    support: [
      { name: 'Help Center', action: () => setCurrentPage('support') },
      { name: 'Contact Us', action: () => setCurrentPage('support') },
      { name: 'Return Policy', action: () => setCurrentPage('support') },
      { name: 'Warranty', action: () => setCurrentPage('support') },
    ],
    products: [
      { name: 'Smart Feeders', action: () => setCurrentPage('products') },
      { name: 'GPS Trackers', action: () => setCurrentPage('products') },
      { name: 'Health Monitors', action: () => setCurrentPage('products') },
      { name: 'Accessories', action: () => setCurrentPage('products') },
    ],
    legal: [
      { name: 'Privacy Policy', action: () => alert('Privacy Policy - Coming Soon') },
      { name: 'Terms of Service', action: () => alert('Terms of Service - Coming Soon') },
      { name: 'Cookie Policy', action: () => alert('Cookie Policy - Coming Soon') },
    ],
  };

  return (
    <footer className="relative mt-20 bg-slate-900 border-t border-slate-800">
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
                <span>support@smartpaws.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-blue-500" />
                </div>
                <span>1-800-SMART-PAW</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-blue-500" />
                </div>
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
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
                  <a href={link.href} className="hover:text-blue-400 transition-colors">
                    {link.name}
                  </a>
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
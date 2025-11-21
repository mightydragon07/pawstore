// components/AboutPage.jsx
import React from 'react';
import { Heart, Shield, Zap, Users, Award, TrendingUp } from 'lucide-react';

export const AboutPage = () => {
  const features = [
    {
      icon: Zap,
      title: 'Cutting-Edge Technology',
      description: 'We deploy the latest IoT sensors to build devices that don\'t just work—they learn, optimize, and connect your entire pet care routine.',
    },
    {
      icon: Heart,
      title: 'Pet-Centric Design',
      description: 'Every product is designed with your pet\'s comfort, safety, and happiness as the top priority.',
    },
    {
      icon: Shield,
      title: 'Trusted & Secure',
      description: 'Bank-level encryption and secure data handling ensure your pet\'s information stays private.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join thousands of pet parents who trust SmartPaws to care for their furry family members.',
    },
  ];

  const stats = [
    { number: '1K+', label: 'Happy Pets' },
    { number: '4.9/5', label: 'Customer Rating' },
    { number: '10+', label: 'Smart Products' },
    { number: '24/7', label: 'Support' },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6">
            About <span className="text-blue-500">SmartPaws</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            SmartPaws is where innovation meets affection. We leverage powerful technology and IoT sensors with intuitive, beautiful design, giving you the peace of mind that your pet's health and happiness are always taken care of.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl text-center hover:border-blue-500/50 transition-all"
            >
              <div className="text-4xl font-bold text-blue-500 mb-2">{stat.number}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="mb-20 max-w-4xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 md:p-12">
            <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                SmartPaws began in 2025 with a clear vision: Elevate pet care. Founded by pet owners, engineers, and designers, we were motivated by the need to conquer the anxiety of separation and the challenges of pet wellness.
              </p>
              <p>
                We built the foundation with smart feeding technology, evolving quickly into a seamless ecosystem. By integrating IoT and mobile connectivity, SmartPaws gives over 50,000 pet parents the power to monitor health, manage schedules, and stay connected effortlessly. The future of pet care is now.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Why Choose SmartPaws?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl hover:border-blue-500/50 transition-all group"
              >
                <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-8 md:p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              To make advanced pet care technology accessible to every pet parent, 
              ensuring that every pet lives their healthiest, happiest, and longest life possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
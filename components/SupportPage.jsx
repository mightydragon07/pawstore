// components/SupportPage.jsx
import React, { useState } from 'react';
import { MessageCircle, Mail, Phone, Search, ChevronDown, HelpCircle } from 'lucide-react';

export const SupportPage = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      question: 'What if my GPS tracker loses signal?',
      answer: 'Our GPS trackers store the last known location. Once signal is restored, tracking resumes automatically. The device also has a built-in backup battery that lasts up to 5 days.'
    },
    {
      question: 'How accurate is the health monitoring?',
      answer: 'Our smart collars use veterinary-grade sensors with 95%+ accuracy for heart rate, temperature, and activity tracking. Data is analyzed by AI algorithms developed with veterinary input.'
    },
    {
      question: 'Can I use multiple devices for one pet?',
      answer: 'Absolutely! All SmartPaws devices sync seamlessly. You can use a GPS tracker, smart collar, and feeder together for comprehensive pet care monitoring.'
    },
    {
      question: 'What\'s your return policy?',
      answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied, return the product in original condition for a full refund. Shipping is free for returns.'
    },
    {
      question: 'Do products work without WiFi?',
      answer: 'Most features require WiFi for real-time updates. However, smart feeders can operate on schedule mode offline, and GPS trackers store location data until connection is restored.'
    },
    {
      question: 'How long do batteries last?',
      answer: 'Battery life varies by device: GPS trackers (5-7 days), smart collars (10-14 days), and cameras (when unplugged, 2-3 hours). All devices show battery status in the app.'
    },
    {
      question: 'Is my pet\'s data secure?',
      answer: 'Yes! We use bank-level 256-bit encryption. Your data is stored securely and never shared with third parties. You have full control over your information.'
    },
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team',
      action: 'Start Chat',
      available: '24/7',
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'smartpaws@gmail.com',
      action: 'Send Email',
      available: 'Response in 2-4 hours',
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: '091-234-5678',
      action: 'Call Now',
      available: 'Mon-Fri 9AM-6PM EST',
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <HelpCircle className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-white mb-4">
            How Can We Help?
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get support for your SmartPaws products or find answers to common questions
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {contactMethods.map((method, index) => (
            <div 
              key={index}
              className="p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl hover:border-blue-500/50 transition-all text-center group"
            >
              <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/20 transition-colors">
                <method.icon className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{method.description}</p>
              <p className="text-xs text-gray-500 mb-4">{method.available}</p>
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all">
                {method.action}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    expandedFaq === index 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Still Need Help Section */}
        <div className="mt-20 text-center">
          <div className="max-w-2xl mx-auto p-8 bg-blue-500/10 border border-blue-500/30 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Still Need Help?</h3>
            <p className="text-gray-400 mb-6">
              Our support team is available 24/7 to assist you with any questions or concerns.
            </p>
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/30">
              Contact Support Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
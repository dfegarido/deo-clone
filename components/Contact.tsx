import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ContactProps {
  onBack: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    website: '',
    budget: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="min-h-screen bg-[#0a0a0f] text-white pt-24 pb-20 px-6 md:px-12 relative overflow-hidden">
      {/* Purple/blue gradient glow behind heading */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#2a1f5e]/60 via-[#1a1040]/40 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-[400px] h-[300px] bg-[#3b2d7a]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-1/3 w-[400px] h-[300px] bg-[#1e3a5f]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-['Oswald'] font-bold tracking-tighter mb-6 leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#e8d5a3] via-[#7ec4a8] to-[#5db895] text-center"
        >
          Grow with Evolutra
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base text-gray-400 font-['Manrope'] max-w-2xl mx-auto mb-16 leading-relaxed text-center"
        >
          Evolutra is your paradigm-shifter, radically redefining the path from customer acquisition to retention.
        </motion.p>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl"
        >
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#2D5F52]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#2D5F52]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-['Oswald'] font-bold text-gray-900 mb-3">Thank You!</h3>
              <p className="text-gray-500 font-['Manrope'] text-base">
                We've received your inquiry and will get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: First Name + Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 font-['Manrope'] mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 font-['Manrope'] text-[15px] focus:border-[#2D5F52] focus:ring-2 focus:ring-[#2D5F52]/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 font-['Manrope'] mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 font-['Manrope'] text-[15px] focus:border-[#2D5F52] focus:ring-2 focus:ring-[#2D5F52]/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Email + Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 font-['Manrope'] mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 font-['Manrope'] text-[15px] focus:border-[#2D5F52] focus:ring-2 focus:ring-[#2D5F52]/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 font-['Manrope'] mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 font-['Manrope'] text-[15px] focus:border-[#2D5F52] focus:ring-2 focus:ring-[#2D5F52]/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Row 3: Website + Budget */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 font-['Manrope'] mb-2">
                    Website URL
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://yoursite.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 font-['Manrope'] text-[15px] focus:border-[#2D5F52] focus:ring-2 focus:ring-[#2D5F52]/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 font-['Manrope'] mb-2">
                    Monthly Budget
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 font-['Manrope'] text-[15px] focus:border-[#2D5F52] focus:ring-2 focus:ring-[#2D5F52]/20 outline-none transition-all appearance-auto bg-white"
                  >
                    <option value="" className="text-gray-400">Select budget range</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="100k+">$100,000+</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Service Interest */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 font-['Manrope'] mb-2">
                  Service of Interest <span className="text-red-500">*</span>
                </label>
                <select
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 font-['Manrope'] text-[15px] focus:border-[#2D5F52] focus:ring-2 focus:ring-[#2D5F52]/20 outline-none transition-all appearance-auto bg-white"
                >
                  <option value="" className="text-gray-400">Select a service</option>
                  <option value="paid-social">Paid Social</option>
                  <option value="paid-search">Paid Search</option>
                  <option value="creative">Creative</option>
                  <option value="lifecycle">Lifecycle Marketing</option>
                  <option value="web-design">Web Design & Development</option>
                  <option value="full-funnel">Full-Funnel Strategy</option>
                </select>
              </div>

              {/* Row 5: Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 font-['Manrope'] mb-2">
                  Tell us about your project
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share your goals, challenges, or anything you'd like us to know..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 font-['Manrope'] text-[15px] focus:border-[#2D5F52] focus:ring-2 focus:ring-[#2D5F52]/20 outline-none transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full md:w-auto px-10 py-4 bg-[#2D5F52] text-white font-['Manrope'] font-semibold text-sm rounded-lg hover:bg-[#245046] hover:shadow-lg hover:shadow-[#2D5F52]/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                Apply Now
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

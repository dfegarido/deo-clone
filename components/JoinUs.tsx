import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface JoinUsProps {
  onBack: () => void;
}

export const JoinUs: React.FC<JoinUsProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    linkedin: '',
    portfolio: '',
    coverLetter: '',
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
    <section className="min-h-screen bg-[#041814] text-white pt-24 pb-20 px-6 md:px-12 relative overflow-hidden">
      {/* Subtle green gradient glow behind heading */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#1B7E65]/20 via-[#0a2e1f]/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-['DM_Sans'] text-[1.8rem] sm:text-[2.2rem] md:text-[2.8rem] lg:text-[3.5rem] font-bold uppercase leading-[1.2em] mb-6 text-center text-white"
        >
          Join Our Team
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base text-white/80 font-['Manrope'] max-w-2xl mx-auto mb-16 leading-relaxed text-center"
        >
          Help us shape the future of digital marketing. We're always looking for talented individuals to join our growing team.
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
              <div className="w-16 h-16 bg-[#C4A24B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#C4A24B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-['Oswald'] font-bold text-gray-900 mb-3">Thank You for Applying!</h3>
              <p className="text-gray-500 font-['Manrope'] text-base">
                We've received your application and will review it shortly. We'll get back to you within 5-7 business days.
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 font-['Manrope'] text-[15px] focus:border-[#C4A24B] focus:ring-2 focus:ring-[#C4A24B]/20 outline-none transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 font-['Manrope'] text-[15px] focus:border-[#C4A24B] focus:ring-2 focus:ring-[#C4A24B]/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Email + Phone */}
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
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 font-['Manrope'] text-[15px] focus:border-[#C4A24B] focus:ring-2 focus:ring-[#C4A24B]/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 font-['Manrope'] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 font-['Manrope'] text-[15px] focus:border-[#C4A24B] focus:ring-2 focus:ring-[#C4A24B]/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Row 3: Position + Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 font-['Manrope'] mb-2">
                    Position Applying For <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="position"
                    required
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 font-['Manrope'] text-[15px] focus:border-[#C4A24B] focus:ring-2 focus:ring-[#C4A24B]/20 outline-none transition-all appearance-auto bg-white"
                  >
                    <option value="" className="text-gray-400">Select a position</option>
                    <option value="paid-social-specialist">Paid Social Specialist</option>
                    <option value="paid-search-specialist">Paid Search Specialist</option>
                    <option value="creative-designer">Creative Designer</option>
                    <option value="copywriter">Copywriter</option>
                    <option value="account-manager">Account Manager</option>
                    <option value="data-analyst">Data Analyst</option>
                    <option value="full-stack-developer">Full Stack Developer</option>
                    <option value="marketing-strategist">Marketing Strategist</option>
                    <option value="intern">Internship</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 font-['Manrope'] mb-2">
                    Years of Experience <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="experience"
                    required
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 font-['Manrope'] text-[15px] focus:border-[#C4A24B] focus:ring-2 focus:ring-[#C4A24B]/20 outline-none transition-all appearance-auto bg-white"
                  >
                    <option value="" className="text-gray-400">Select experience level</option>
                    <option value="entry">Entry Level (0-2 years)</option>
                    <option value="mid">Mid-Level (3-5 years)</option>
                    <option value="senior">Senior (6-8 years)</option>
                    <option value="lead">Lead/Principal (9+ years)</option>
                  </select>
                </div>
              </div>

              {/* Row 4: LinkedIn + Portfolio */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 font-['Manrope'] mb-2">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 font-['Manrope'] text-[15px] focus:border-[#C4A24B] focus:ring-2 focus:ring-[#C4A24B]/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 font-['Manrope'] mb-2">
                    Portfolio/Website
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    placeholder="https://yourportfolio.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 font-['Manrope'] text-[15px] focus:border-[#C4A24B] focus:ring-2 focus:ring-[#C4A24B]/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Row 5: Cover Letter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 font-['Manrope'] mb-2">
                  Cover Letter <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="coverLetter"
                  required
                  rows={6}
                  value={formData.coverLetter}
                  onChange={handleChange}
                  placeholder="Tell us why you're interested in this position, your relevant experience, and what makes you a great fit for Evolutra..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 font-['Manrope'] text-[15px] focus:border-[#C4A24B] focus:ring-2 focus:ring-[#C4A24B]/20 outline-none transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full md:w-auto transition-all duration-300 hover:opacity-90 hover:scale-105"
                style={{
                  width: '252px',
                  height: '52px',
                  background: '#C4A24B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 0,
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 500,
                  fontSize: '24px',
                  lineHeight: '110%',
                  letterSpacing: '0.04em',
                  color: '#000000',
                  textTransform: 'uppercase',
                }}
              >
                Submit Application
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

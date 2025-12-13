'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-8 sm:p-12 max-w-2xl mx-auto"
    >
      {submitted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-300"
        >
          ✓ Thank you for your message! I&apos;ll get back to you soon.
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-200 mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-dark-800 border border-primary-600/30 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-smooth"
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-dark-800 border border-primary-600/30 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-smooth"
            placeholder="you@example.com"
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-gray-200 mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-dark-800 border border-primary-600/30 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-smooth"
            placeholder="Project inquiry"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-200 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 bg-dark-800 border border-primary-600/30 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-smooth resize-none"
            placeholder="Tell me about your project..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 rounded-lg font-semibold transition-smooth"
        >
          Send Message
        </motion.button>
      </form>

      {/* Contact Info */}
      <div className="mt-12 pt-8 border-t border-primary-600/20 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-1">Email</p>
          <a href="mailto:contact@example.com" className="text-primary-400 font-semibold hover:text-primary-300">
            contact@example.com
          </a>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-1">Phone</p>
          <a href="tel:+1234567890" className="text-primary-400 font-semibold hover:text-primary-300">
            +1 (234) 567-890
          </a>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-1">Location</p>
          <p className="text-primary-400 font-semibold">Your City, Country</p>
        </div>
      </div>
    </motion.div>
  );
}

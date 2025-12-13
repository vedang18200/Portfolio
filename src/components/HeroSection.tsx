'use client';

import { motion } from 'framer-motion';
import { HiArrowRight, HiOutlineSparkles } from 'react-icons/hi2';
import Link from 'next/link';
import { Typewriter } from 'react-simple-typewriter';
import ParticleBackground from './ParticleBackground';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-dark-950 pt-20 relative overflow-hidden">
      {/* Particle Animation Background */}
      <ParticleBackground />
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-20 right-0 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-0 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Typing Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass">
            <HiOutlineSparkles className="w-5 h-5 text-primary-400" />
            <span className="text-sm text-gray-300">
              <Typewriter
                words={['AI/ML Engineer', 'Python Developer', 'Student', 'Open Source Enthusiast', 'Tech Explorer']}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
          <span className="block text-gray-200 mb-2 tracking-tight">Transforming Ideas into</span>
          <span className="block relative">
            <span className="gradient-text-pro font-extrabold animate-shimmer px-2 py-1 rounded-lg">
              Intelligent Solutions
            </span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-400 max-w-2xl mx-auto mb-8"
        >
          Specialized in building cutting-edge AI/ML systems and data-driven applications.
          Let&apos;s create something extraordinary together.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/projects"
            className="px-8 py-3 bg-primary-600 hover:bg-primary-500 rounded-lg font-semibold transition-smooth flex items-center space-x-2 group"
          >
            <span>View Projects</span>
            <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 border border-primary-600 hover:bg-primary-600/10 rounded-lg font-semibold transition-smooth"
          >
            Let&apos;s Talk
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="mt-16 grid grid-cols-3 gap-8">
          {[
            { number: '15+', label: 'Projects Completed' },
            { number: '5+', label: 'Years Experience' },
            { number: '100%', label: 'Client Satisfaction' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.number}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

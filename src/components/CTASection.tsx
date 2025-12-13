'use client';

import { motion } from 'framer-motion';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-100 mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            I&apos;m open to exciting opportunities and collaborations. Let&apos;s discuss how I can help bring your vision to life.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 rounded-lg font-semibold text-lg transition-smooth group"
          >
            <span>Start a Project</span>
            <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

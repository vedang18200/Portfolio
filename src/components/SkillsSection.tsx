'use client';

import { motion } from 'framer-motion';
import { HiOutlineCube } from 'react-icons/hi2';

const skills = [
  {
    category: 'Machine Learning',
    items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'XGBoost', 'Neural Networks', 'Deep Learning'],
  },
  {
    category: 'Data Science',
    items: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'SQL', 'Big Data'],
  },
  {
    category: 'Python Development',
    items: ['FastAPI', 'Flask', 'Django', 'Async Python', 'Web Scraping', 'Automation'],
  },
  {
    category: 'Tools & Platforms',
    items: ['Docker', 'AWS', 'Google Cloud', 'Git', 'Jupyter', 'Linux'],
  },
];

export default function SkillsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 bg-dark-950 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            Skills & Expertise
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit of technologies and frameworks I use to build intelligent solutions
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skills.map((skillGroup, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass p-6 rounded-xl hover:border-primary-500/50 transition-smooth group"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-primary-600/20">
                  <HiOutlineCube className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-100">{skillGroup.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm bg-primary-600/20 text-primary-300 rounded-full border border-primary-500/30 hover:border-primary-400 transition-smooth"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

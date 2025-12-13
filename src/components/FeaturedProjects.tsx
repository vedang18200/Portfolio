'use client';

import { motion } from 'framer-motion';
import { HiOutlineArrowTopRightOnSquare } from 'react-icons/hi2';
import Image from 'next/image';

const featuredProjects = [
  {
    title: 'AI-Powered Recommendation System',
    description: 'Built a scalable recommendation engine using collaborative filtering and deep learning',
    tech: ['PyTorch', 'Python', 'FastAPI', 'Redis'],
    image: '/projects/recommendation.jpg',
    link: '#',
  },
  {
    title: 'Sentiment Analysis Platform',
    description: 'Real-time sentiment analysis tool for social media monitoring with NLP',
    tech: ['TensorFlow', 'NLP', 'Docker', 'AWS'],
    image: '/projects/sentiment.jpg',
    link: '#',
  },
  {
    title: 'Time Series Forecasting Model',
    description: 'Advanced LSTM model for financial market prediction',
    tech: ['TensorFlow', 'LSTM', 'Pandas', 'Matplotlib'],
    image: '/projects/timeseries.jpg',
    link: '#',
  },
];

export default function FeaturedProjects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 bg-dark-900 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore some of my recent work in AI and machine learning
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="glass rounded-xl overflow-hidden hover:border-primary-400/50 transition-smooth h-full flex flex-col">
                {/* Project Image Placeholder */}
                <div className="w-full h-40 bg-gradient-to-br from-primary-600/20 to-accent-600/20 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                  <span className="text-gray-400 text-center text-sm px-4">Project Thumbnail</span>
                </div>

                {/* Project Info */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-primary-400 transition-smooth">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 flex-grow">{project.description}</p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded bg-primary-600/30 text-primary-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  <a
                    href={project.link}
                    className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-smooth"
                  >
                    <span>View Project</span>
                    <HiOutlineArrowTopRightOnSquare className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="/projects"
            className="inline-block px-8 py-3 border border-primary-600 hover:bg-primary-600/10 rounded-lg font-semibold transition-smooth"
          >
            View All Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
}

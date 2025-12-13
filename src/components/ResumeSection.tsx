'use client';

import { motion } from 'framer-motion';
import { HiOutlineCheckCircle } from 'react-icons/hi2';

const experiences = [
  {
    company: 'Tech Company Inc',
    position: 'Senior ML Engineer',
    period: '2022 - Present',
    description: 'Leading AI/ML initiatives and building scalable machine learning systems',
    achievements: [
      'Developed production ML models improving efficiency by 40%',
      'Led team of 5 engineers on critical AI projects',
      'Implemented MLOps pipeline reducing model deployment time by 60%',
    ],
  },
  {
    company: 'Data Analytics Startup',
    position: 'ML Engineer',
    period: '2020 - 2022',
    description: 'Built and deployed machine learning models for business intelligence',
    achievements: [
      'Created recommendation system serving 1M+ users',
      'Developed NLP models for text classification',
      'Optimized model inference reducing latency by 50%',
    ],
  },
  {
    company: 'Software Solutions Ltd',
    position: 'Python Developer',
    period: '2018 - 2020',
    description: 'Developed backend services and data processing pipelines',
    achievements: [
      'Built high-performance APIs using FastAPI',
      'Designed database schemas and optimization strategies',
      'Mentored junior developers',
    ],
  },
];

const education = [
  {
    school: 'University of Technology',
    degree: 'B.Tech in Computer Science',
    field: 'AI & Machine Learning',
    year: '2018',
  },
  {
    school: 'Online Courses',
    degree: 'Professional Certifications',
    field: 'AWS, TensorFlow, Advanced Python',
    year: '2019-2023',
  },
];

export default function ResumeSection() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold gradient-text mb-6">My Resume</h1>
        <p className="text-xl text-gray-400">
          Experience and qualifications in AI/ML and software development
        </p>
      </motion.div>

      {/* Experience Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-100 mb-8 pb-4 border-b border-primary-600/20">
          Work Experience
        </h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass p-6 rounded-xl hover:border-primary-500/50 transition-smooth"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-2xl font-bold text-gray-100">{exp.position}</h3>
                  <p className="text-primary-400 font-semibold">{exp.company}</p>
                </div>
                <span className="text-gray-400 text-sm whitespace-nowrap">{exp.period}</span>
              </div>
              <p className="text-gray-400 mb-4">{exp.description}</p>
              <ul className="space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start space-x-3 text-gray-300">
                    <HiOutlineCheckCircle className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Education Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-100 mb-8 pb-4 border-b border-primary-600/20">
          Education
        </h2>
        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass p-6 rounded-xl hover:border-primary-500/50 transition-smooth"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-100">{edu.degree}</h3>
                  <p className="text-primary-400 font-semibold">{edu.school}</p>
                  <p className="text-gray-400">{edu.field}</p>
                </div>
                <span className="text-gray-400 text-sm">{edu.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Download Resume */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <a
          href="/resume.pdf"
          download
          className="inline-block px-8 py-3 bg-primary-600 hover:bg-primary-500 rounded-lg font-semibold transition-smooth"
        >
          Download PDF Resume
        </a>
      </motion.div>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { HiOutlineStar } from 'react-icons/hi2';

const testimonials = [
  {
    name: 'John Doe',
    role: 'Tech Lead at DataCorp',
    content:
      'Working with Vedang was exceptional. The AI solution delivered exceeded our expectations and improved our processes significantly.',
    rating: 5,
  },
  {
    name: 'Sarah Smith',
    role: 'Product Manager at AIStartup',
    content:
      'Vedang demonstrated deep knowledge in ML and excellent communication. Highly recommended for any AI/ML project.',
    rating: 5,
  },
  {
    name: 'Mike Johnson',
    role: 'CTO at TechVentures',
    content:
      'Professional, reliable, and innovative. Vedang is the type of engineer every tech company needs.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 bg-dark-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            What People Say
          </h2>
          <p className="text-gray-400 text-lg">
            Testimonials from clients and colleagues
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass p-6 rounded-xl hover:border-primary-500/50 transition-smooth"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <HiOutlineStar key={i} className="w-5 h-5 text-accent-500 fill-accent-500" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 mb-6 italic">&quot;{testimonial.content}&quot;</p>

              {/* Author */}
              <div>
                <p className="font-bold text-gray-100">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: string;
  image_url?: string;
}

export default function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('projects').select('*').order('id', { ascending: false });
      if (error) setError(error.message);
      else setProjects(data || []);
      setLoading(false);
    };
    fetchProjects();
  }, []);
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

  if (loading) return <div className="text-center text-gray-400 py-8">Loading projects...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {projects.map((project) => (
        <motion.div
          key={project.id}
          variants={itemVariants}
          className="group"
        >
          <div className="glass rounded-xl p-6 h-full flex flex-col hover:border-primary-400/50 transition-smooth">
            {project.image_url && (
              <img src={project.image_url} alt={project.title} className="rounded-lg mb-3 w-full object-cover max-h-40 border border-dark-700" />
            )}
            <span className="text-xs px-3 py-1 rounded-full bg-primary-600/30 text-primary-300 w-fit mb-3">
              {project.category}
            </span>
            <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-primary-400 transition-smooth">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm mb-4 flex-grow">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded bg-primary-600/30 text-primary-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

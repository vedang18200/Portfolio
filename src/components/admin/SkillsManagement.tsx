'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'framer-motion';
import { HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi2';

interface Skill {
  id: string;
  category: string;
  items: string[];
}

export default function SkillsManagement() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch skills from Supabase on mount
  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('skills').select('*').order('id', { ascending: false });
      if (error) setError(error.message);
      else setSkills(data || []);
      setLoading(false);
    };
    fetchSkills();
  }, []);

  const [formData, setFormData] = useState({ category: '', items: '' });

  const handleAdd = async () => {
    if (formData.category && formData.items) {
      const { data, error } = await supabase.from('skills').insert([
        {
          category: formData.category,
          items: formData.items.split(',').map((item) => item.trim()),
        },
      ]).select();
      if (!error && data) {
        setSkills([data[0], ...skills]);
        setFormData({ category: '', items: '' });
      } else {
        setError(error?.message || 'Failed to add skill');
      }
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (!error) setSkills(skills.filter((s) => s.id !== id));
    else setError(error.message);
  };

  return (
    <div className="space-y-6">
      {loading && <div className="text-center text-gray-400">Loading skills...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      {/* Add Skill Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-6"
      >
        <h2 className="text-2xl font-bold text-gray-100 mb-6">Add Skill Category</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Category (e.g., Machine Learning)"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 bg-dark-800 border border-primary-600/30 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500"
          />
          <textarea
            placeholder="Skills (comma-separated)"
            value={formData.items}
            onChange={(e) => setFormData({ ...formData, items: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 bg-dark-800 border border-primary-600/30 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500 resize-none"
          />
          <button
            onClick={handleAdd}
            className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-500 rounded-lg font-semibold transition-smooth flex items-center justify-center space-x-2"
          >
            <HiOutlinePlus className="w-5 h-5" />
            <span>Add Skills</span>
          </button>
        </div>
      </motion.div>

      {/* Skills List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-xl p-6"
      >
        <h2 className="text-2xl font-bold text-gray-100 mb-6">Skill Categories ({skills.length})</h2>
        <div className="space-y-4">
          {skills.map((skillGroup) => (
            <motion.div
              key={skillGroup.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-4 bg-dark-800 rounded-lg border border-primary-600/20 hover:border-primary-500/50 transition-smooth"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-gray-100">{skillGroup.category}</h3>
                <button
                  onClick={() => handleDelete(skillGroup.id)}
                  className="p-2 hover:bg-red-600/20 rounded transition-smooth text-red-400"
                >
                  <HiOutlineTrash className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item, i) => (
                  <span key={i} className="text-sm px-3 py-1 rounded bg-primary-600/30 text-primary-300">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

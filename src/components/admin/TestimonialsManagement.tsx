'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'framer-motion';
import { HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi2';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch testimonials from Supabase on mount
  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('testimonials').select('*').order('id', { ascending: false });
      if (error) setError(error.message);
      else setTestimonials(data || []);
      setLoading(false);
    };
    fetchTestimonials();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5,
  });

  const handleAdd = async () => {
    if (formData.name && formData.content) {
      const { data, error } = await supabase.from('testimonials').insert([
        {
          name: formData.name,
          role: formData.role,
          content: formData.content,
          rating: formData.rating,
        },
      ]).select();
      if (!error && data) {
        setTestimonials([data[0], ...testimonials]);
        setFormData({ name: '', role: '', content: '', rating: 5 });
      } else {
        setError(error?.message || 'Failed to add testimonial');
      }
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (!error) setTestimonials(testimonials.filter((t) => t.id !== id));
    else setError(error.message);
  };

  return (
    <div className="space-y-6">
      {loading && <div className="text-center text-gray-400">Loading testimonials...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      {/* Add Testimonial Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-6"
      >
        <h2 className="text-2xl font-bold text-gray-100 mb-6">Add Testimonial</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-dark-800 border border-primary-600/30 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500"
          />
          <input
            type="text"
            placeholder="Role/Title"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-4 py-3 bg-dark-800 border border-primary-600/30 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500"
          />
          <textarea
            placeholder="Testimonial Content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 bg-dark-800 border border-primary-600/30 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500 resize-none"
          />
          <select
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
            className="w-full px-4 py-3 bg-dark-800 border border-primary-600/30 rounded-lg text-gray-100 focus:outline-none focus:border-primary-500"
          >
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
          </select>
          <button
            onClick={handleAdd}
            className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-500 rounded-lg font-semibold transition-smooth flex items-center justify-center space-x-2"
          >
            <HiOutlinePlus className="w-5 h-5" />
            <span>Add Testimonial</span>
          </button>
        </div>
      </motion.div>

      {/* Testimonials List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-xl p-6"
      >
        <h2 className="text-2xl font-bold text-gray-100 mb-6">Testimonials ({testimonials.length})</h2>
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-4 bg-dark-800 rounded-lg border border-primary-600/20 hover:border-primary-500/50 transition-smooth"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-100">{testimonial.name}</h3>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                  <p className="text-yellow-400 text-sm">{'⭐'.repeat(testimonial.rating)}</p>
                </div>
                <button
                  onClick={() => handleDelete(testimonial.id)}
                  className="p-2 hover:bg-red-600/20 rounded transition-smooth text-red-400"
                >
                  <HiOutlineTrash className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-300 italic">&quot;{testimonial.content}&quot;</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

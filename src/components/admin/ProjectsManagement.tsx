'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'framer-motion';
import { uploadProjectImage } from '@/lib/uploadProjectImage';
import { HiOutlineTrash, HiOutlinePencil, HiOutlinePlus } from 'react-icons/hi2';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: string;
  image_url?: string;
}

export default function ProjectsManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects from Supabase on mount
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

  const [formData, setFormData] = useState({ title: '', description: '', tech: '', category: '', image: undefined as File | undefined });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ title: '', description: '', tech: '', category: '' });

  const handleAdd = async () => {
    if (formData.title && formData.description) {
      let imageUrl = '';
      if (formData.image) {
        try {
          imageUrl = await uploadProjectImage(formData.image, Date.now().toString());
        } catch (e: any) {
          setError('Image upload failed: ' + e.message);
          return;
        }
      }
      const { data, error } = await supabase.from('projects').insert([
        {
          title: formData.title,
          description: formData.description,
          tech: formData.tech.split(',').map((t) => t.trim()),
          category: formData.category,
          image_url: imageUrl,
        },
      ]).select();
      if (!error && data) {
        setProjects([data[0], ...projects]);
        setFormData({ title: '', description: '', tech: '', category: '', image: undefined });
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setError(error?.message || 'Failed to add project');
      }
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setEditData({
      title: project.title,
      description: project.description,
      tech: project.tech.join(', '),
      category: project.category,
    });
  };

  const handleEditSave = async (id: string) => {
    const { data, error } = await supabase.from('projects').update({
      title: editData.title,
      description: editData.description,
      tech: editData.tech.split(',').map((t) => t.trim()),
      category: editData.category,
    }).eq('id', id).select();
    if (!error && data) {
      setProjects(projects.map((p) => (p.id === id ? data[0] : p)));
      setEditingId(null);
    } else {
      setError(error?.message || 'Failed to update project');
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) setProjects(projects.filter((p) => p.id !== id));
    else setError(error.message);
  };

  return (
    <div className="space-y-6">
      {loading && <div className="text-center text-gray-400">Loading projects...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      {/* Add Project Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-6"
      >
        <h2 className="text-2xl font-bold text-gray-100 mb-6">Add New Project</h2>
        <div className="space-y-4">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] })}
            className="w-full px-4 py-2 bg-dark-800 border border-primary-600/30 rounded-lg text-gray-100 focus:outline-none focus:border-primary-500"
          />
          <input
            type="text"
            placeholder="Project Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 bg-dark-800 border border-primary-600/30 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500"
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 bg-dark-800 border border-primary-600/30 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500 resize-none"
          />
          <input
            type="text"
            placeholder="Technologies (comma-separated)"
            value={formData.tech}
            onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
            className="w-full px-4 py-3 bg-dark-800 border border-primary-600/30 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500"
          />
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 bg-dark-800 border border-primary-600/30 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500"
          />
          <button
            onClick={handleAdd}
            className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-500 rounded-lg font-semibold transition-smooth flex items-center justify-center space-x-2"
          >
            <HiOutlinePlus className="w-5 h-5" />
            <span>Add Project</span>
          </button>
        </div>
      </motion.div>

      {/* Projects List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-xl p-6"
      >
        <h2 className="text-2xl font-bold text-gray-100 mb-6">Projects ({projects.length})</h2>
        <div className="space-y-4">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-4 bg-dark-800 rounded-lg border border-primary-600/20 hover:border-primary-500/50 transition-smooth"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex flex-col gap-2 w-full max-w-xs">
                  {project.image_url && (
                    <img src={project.image_url} alt="Project" className="rounded-lg mb-2 w-full object-cover max-h-32 border border-dark-700" />
                  )}
                  {editingId === project.id ? (
                    <>
                      <input
                        type="text"
                        value={editData.title}
                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                        className="mb-2 w-full px-2 py-1 rounded bg-dark-900 text-gray-100 border border-primary-600/30"
                      />
                      <textarea
                        value={editData.description}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        className="mb-2 w-full px-2 py-1 rounded bg-dark-900 text-gray-100 border border-primary-600/30"
                        rows={2}
                      />
                      <input
                        type="text"
                        value={editData.tech}
                        onChange={(e) => setEditData({ ...editData, tech: e.target.value })}
                        className="mb-2 w-full px-2 py-1 rounded bg-dark-900 text-gray-100 border border-primary-600/30"
                        placeholder="Technologies (comma-separated)"
                      />
                      <input
                        type="text"
                        value={editData.category}
                        onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                        className="mb-2 w-full px-2 py-1 rounded bg-dark-900 text-gray-100 border border-primary-600/30"
                        placeholder="Category"
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-bold text-gray-100">{project.title}</h3>
                      <p className="text-sm text-gray-400">{project.description}</p>
                    </>
                  )}
                </div>
                <div className="flex space-x-2">
                  {editingId === project.id ? (
                    <>
                      <button
                        onClick={() => handleEditSave(project.id)}
                        className="p-2 bg-primary-600/80 hover:bg-primary-500/80 rounded text-white transition-smooth"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="p-2 bg-gray-700/80 hover:bg-gray-600/80 rounded text-white transition-smooth"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-2 hover:bg-primary-600/20 rounded transition-smooth text-primary-400"
                      >
                        <HiOutlinePencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 hover:bg-red-600/20 rounded transition-smooth text-red-400"
                      >
                        <HiOutlineTrash className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {(editingId === project.id ? editData.tech.split(',').map((t) => t.trim()) : project.tech).map((tech, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded bg-primary-600/30 text-primary-300">
                    {tech}
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

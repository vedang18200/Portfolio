'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import AdminSidebar from '@/components/AdminSidebar';
import ProjectsManagement from '@/components/admin/ProjectsManagement';
import SkillsManagement from '@/components/admin/SkillsManagement';
import TestimonialsManagement from '@/components/admin/TestimonialsManagement';

type ActiveTab = 'projects' | 'skills' | 'testimonials' | 'settings';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ActiveTab>('projects');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-dark-950 flex">
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold gradient-text mb-2">Admin Dashboard</h1>
              <p className="text-gray-400">Manage your portfolio content and settings</p>
            </div>

            {/* Content */}
            <div>
              {activeTab === 'projects' && <ProjectsManagement />}
              {activeTab === 'skills' && <SkillsManagement />}
              {activeTab === 'testimonials' && <TestimonialsManagement />}
              {activeTab === 'settings' && (
                <div className="glass rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-100 mb-4">Settings</h2>
                  <p className="text-gray-400">Settings management coming soon...</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

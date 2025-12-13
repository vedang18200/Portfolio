'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  HiOutlineRectangleStack,
  HiOutlineCube,
  HiOutlineStar,
  HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle,
} from 'react-icons/hi2';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

const menuItems = [
  { id: 'projects', label: 'Projects', icon: HiOutlineRectangleStack },
  { id: 'skills', label: 'Skills', icon: HiOutlineCube },
  { id: 'testimonials', label: 'Testimonials', icon: HiOutlineStar },
  { id: 'settings', label: 'Settings', icon: HiOutlineCog6Tooth },
];

export default function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 bg-dark-900 border-r border-primary-600/20 h-screen flex flex-col sticky top-0"
    >
      {/* Logo */}
      <div className="p-6 border-b border-primary-600/20">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <span className="text-lg font-bold gradient-text">Admin</span>
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth ${
                  isActive
                    ? 'bg-primary-600/30 text-primary-400 border border-primary-500/50'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-dark-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-primary-600/20">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-smooth"
        >
          <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

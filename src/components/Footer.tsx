import Link from 'next/link';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 border-t border-primary-600/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center space-x-2 group mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <span className="text-lg font-bold gradient-text">Vedang</span>
            </Link>
            <p className="text-gray-400 text-sm">AI/ML Engineer & Python Developer</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-100 mb-4">Navigation</h3>
            <div className="space-y-2">
              <Link href="/" className="text-gray-400 hover:text-primary-400 transition-smooth text-sm">
                Home
              </Link>
              <Link href="/projects" className="text-gray-400 hover:text-primary-400 transition-smooth text-sm">
                Projects
              </Link>
              <Link href="/resume" className="text-gray-400 hover:text-primary-400 transition-smooth text-sm">
                Resume
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-primary-400 transition-smooth text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-gray-100 mb-4">Expertise</h3>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Machine Learning</p>
              <p className="text-gray-400 text-sm">Data Science</p>
              <p className="text-gray-400 text-sm">Python Development</p>
              <p className="text-gray-400 text-sm">AI Solutions</p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-bold text-gray-100 mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-600/20 hover:bg-primary-600/40 rounded-lg flex items-center justify-center transition-smooth"
              >
                <FaGithub className="w-5 h-5 text-primary-400" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-600/20 hover:bg-primary-600/40 rounded-lg flex items-center justify-center transition-smooth"
              >
                <FaLinkedin className="w-5 h-5 text-primary-400" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="w-10 h-10 bg-primary-600/20 hover:bg-primary-600/40 rounded-lg flex items-center justify-center transition-smooth"
              >
                <HiOutlineEnvelope className="w-5 h-5 text-primary-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-600/20 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © {currentYear} Vedang. All rights reserved. | Admin Panel
          </p>
        </div>
      </div>
    </footer>
  );
}

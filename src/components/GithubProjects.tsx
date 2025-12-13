"use client";
import React, { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  language: string;
  fork: boolean;
}

const GITHUB_USERNAME = 'vedang'; // Change to your GitHub username if needed

const GithubProjects: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`);
        if (!res.ok) throw new Error('Failed to fetch repos');
        const data = await res.json();
        setRepos(data.filter((repo: Repo) => !repo.fork));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  if (loading) return <div className="text-center py-8">Loading GitHub projects...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaGithub className="text-2xl" /> GitHub Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {repos.map((repo) => (
          <motion.a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, boxShadow: '0 4px 32px rgba(0,0,0,0.15)' }}
            className="bg-dark-900/80 border border-dark-700 rounded-xl p-5 flex flex-col gap-2 transition-colors hover:bg-dark-800/90 shadow-lg"
          >
            <div className="flex items-center gap-2">
              <FaGithub className="text-lg text-accent-500" />
              <span className="font-semibold text-lg text-primary-400">{repo.name}</span>
            </div>
            <p className="text-sm text-gray-300 flex-1">{repo.description || 'No description'}</p>
            <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
              <span>{repo.language || 'Unknown'}</span>
              <span>★ {repo.stargazers_count}</span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default GithubProjects;

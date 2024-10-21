import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { User, Settings, Camera } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [description, setDescription] = useState(user?.description || '');
  const [role, setRole] = useState(user?.role || 'user');
  const [score, setScore] = useState(user?.score || 0);
  const [profilePicture, setProfilePicture] = useState<string | null>(user?.profilePicture || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      updateUser({ ...user, name, email, description, role, score, profilePicture });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-morphism p-6 border-2 border-blue-500"
      >
        <h2 className="text-2xl font-bold mb-4 text-secondary flex items-center">
          <User className="w-6 h-6 mr-2" />
          Profile Information
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <img
                src={profilePicture || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-secondary text-white p-2 rounded-full"
              >
                <Camera className="w-4 h-4" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </div>
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md bg-surface border-transparent focus:border-secondary focus:ring-0 text-text"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md bg-surface border-transparent focus:border-secondary focus:ring-0 text-text"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-text">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md bg-surface border-transparent focus:border-secondary focus:ring-0 text-text"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-text">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as 'admin' | 'user')}
              className="mt-1 block w-full rounded-md bg-surface border-transparent focus:border-secondary focus:ring-0 text-text"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label htmlFor="score" className="block text-sm font-medium text-text">
              Score
            </label>
            <input
              type="number"
              id="score"
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              className="mt-1 block w-full rounded-md bg-surface border-transparent focus:border-secondary focus:ring-0 text-text"
            />
          </div>
          <button
            type="submit"
            className="bg-secondary text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update Profile
          </button>
        </form>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-morphism p-6 border-2 border-blue-500"
      >
        <h2 className="text-2xl font-bold mb-4 text-secondary flex items-center">
          <Settings className="w-6 h-6 mr-2" />
          Account Settings
        </h2>
        <div className="space-y-4">
          <p className="text-text">Role: {role}</p>
          <p className="text-text">Score: {score} points</p>
        </div>
      </motion.div>
    </div>
  );
};
import React from 'react';
import { motion } from 'framer-motion';
import { User } from '../types';
import { Trophy } from 'lucide-react';

interface LeaderBoardProps {
  users: User[];
}

export const LeaderBoard: React.FC<LeaderBoardProps> = ({ users }) => {
  const sortedUsers = [...users].sort((a, b) => b.score - a.score);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-morphism p-6"
    >
      <h2 className="text-2xl font-semibold mb-4 flex items-center text-secondary">
        <Trophy className="w-6 h-6 mr-2" />
        Leaderboard
      </h2>
      <ul className="space-y-2">
        {sortedUsers.map((user, index) => (
          <motion.li
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center justify-between text-text"
          >
            <span className="flex items-center">
              <span className="text-lg font-medium mr-2">{index + 1}.</span>
              {user.name}
            </span>
            <span className="font-semibold text-secondary">{user.score} pts</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};
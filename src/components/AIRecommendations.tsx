import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

interface AIRecommendationsProps {
  recommendations: string[];
}

export const AIRecommendations: React.FC<AIRecommendationsProps> = ({ recommendations }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-morphism p-6"
    >
      <h2 className="text-2xl font-semibold mb-4 flex items-center text-secondary">
        <Lightbulb className="w-6 h-6 mr-2" />
        AI Recommendations
      </h2>
      <ul className="space-y-2">
        {recommendations.map((recommendation, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-start text-text"
          >
            <span className="text-secondary mr-2">•</span>
            <span>{recommendation}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};
import React from 'react';
import { motion } from 'framer-motion';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

export const AnalyticsPage: React.FC = () => {
  const taskCompletionData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
      },
    ],
  };

  const productivityTrendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Productivity Score',
        data: [65, 59, 80, 81],
        fill: false,
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#e0e0e0',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#e0e0e0' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      y: {
        ticks: { color: '#e0e0e0' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-morphism p-6"
      >
        <h2 className="text-2xl font-bold mb-4 text-secondary">Task Completion</h2>
        <Bar data={taskCompletionData} options={chartOptions} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-morphism p-6"
      >
        <h2 className="text-2xl font-bold mb-4 text-secondary">Productivity Trend</h2>
        <Line data={productivityTrendData} options={chartOptions} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-morphism p-6 col-span-full"
      >
        <h2 className="text-2xl font-bold mb-4 text-secondary">Team Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface bg-opacity-50 rounded-lg p-4 text-center">
            <h3 className="text-lg font-semibold text-text">Tasks Completed</h3>
            <p className="text-3xl font-bold text-secondary">127</p>
          </div>
          <div className="bg-surface bg-opacity-50 rounded-lg p-4 text-center">
            <h3 className="text-lg font-semibold text-text">Average Time per Task</h3>
            <p className="text-3xl font-bold text-secondary">2.5 hours</p>
          </div>
          <div className="bg-surface bg-opacity-50 rounded-lg p-4 text-center">
            <h3 className="text-lg font-semibold text-text">Team Efficiency</h3>
            <p className="text-3xl font-bold text-secondary">85%</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="glass-morphism p-6 col-span-full"
      >
        <h3 className="text-xl font-semibold mb-4 text-secondary">Data-Driven Insights</h3>
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="Data analysis"
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <p className="text-text">Leverage data-driven insights to optimize your team's performance and make informed decisions.</p>
      </motion.div>
    </div>
  );
};
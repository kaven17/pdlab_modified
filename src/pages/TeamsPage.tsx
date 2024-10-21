import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Award } from 'lucide-react';

interface Team {
  id: number;
  name: string;
  members: string[];
  score: number;
}

export const TeamsPage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([
    { id: 1, name: 'Alpha Team', members: ['John Doe', 'Jane Smith'], score: 100 },
    { id: 2, name: 'Beta Team', members: ['Alice Johnson', 'Bob Williams'], score: 90 },
  ]);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamMembers, setNewTeamMembers] = useState('');

  const handleAddTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTeamName && newTeamMembers) {
      const newTeam: Team = {
        id: teams.length + 1,
        name: newTeamName,
        members: newTeamMembers.split(',').map(member => member.trim()),
        score: 0,
      };
      setTeams([...teams, newTeam]);
      setNewTeamName('');
      setNewTeamMembers('');
    }
  };

  const handleAddPoints = (teamId: number, points: number) => {
    setTeams(teams.map(team =>
      team.id === teamId ? { ...team, score: team.score + points } : team
    ));
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-4 text-secondary flex items-center">
          <Users className="w-8 h-8 mr-2" />
          Teams
        </h2>
        <div className="glass-morphism p-6 rounded-lg border-2 border-blue-500">
          <h3 className="text-xl font-semibold mb-4 text-text">Add New Team</h3>
          <form onSubmit={handleAddTeam} className="space-y-4">
            <div>
              <label htmlFor="teamName" className="block text-sm font-medium text-text">Team Name</label>
              <input
                type="text"
                id="teamName"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                className="mt-1 block w-full rounded-md bg-surface border-transparent focus:border-secondary focus:ring-0 text-text"
                required
              />
            </div>
            <div>
              <label htmlFor="teamMembers" className="block text-sm font-medium text-text">Team Members (comma-separated)</label>
              <input
                type="text"
                id="teamMembers"
                value={newTeamMembers}
                onChange={(e) => setNewTeamMembers(e.target.value)}
                className="mt-1 block w-full rounded-md bg-surface border-transparent focus:border-secondary focus:ring-0 text-text"
                required
              />
            </div>
            <button type="submit" className="bg-secondary text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Add Team
            </button>
          </form>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-2xl font-semibold mb-4 text-secondary flex items-center">
          <Award className="w-6 h-6 mr-2" />
          Team Leaderboard
        </h3>
        <div className="glass-morphism p-6 rounded-lg border-2 border-blue-500">
          <ul className="space-y-4">
            {teams.sort((a, b) => b.score - a.score).map((team) => (
              <li key={team.id} className="bg-surface bg-opacity-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-medium text-text">{team.name}</h4>
                    <p className="text-sm text-gray-400">Members: {team.members.join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-secondary">{team.score} points</p>
                    <div className="mt-2">
                      <button
                        onClick={() => handleAddPoints(team.id, 10)}
                        className="bg-green-500 text-white py-1 px-2 rounded-md text-sm mr-2"
                      >
                        +10
                      </button>
                      <button
                        onClick={() => handleAddPoints(team.id, 50)}
                        className="bg-green-700 text-white py-1 px-2 rounded-md text-sm"
                      >
                        +50
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};
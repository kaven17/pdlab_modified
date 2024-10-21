import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, AlarmClock } from 'lucide-react';

interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  attendees: string[];
}

export const MeetingsPage: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([
    { id: 1, title: 'Team Sync', date: '2023-04-15', time: '10:00 AM', attendees: ['John Doe', 'Jane Smith'] },
    { id: 2, title: 'Project Review', date: '2023-04-16', time: '2:00 PM', attendees: ['John Doe', 'Alice Johnson'] },
  ]);

  const [newMeeting, setNewMeeting] = useState<Omit<Meeting, 'id'>>({
    title: '',
    date: '',
    time: '',
    attendees: [],
  });

  const [nextMeetingCountdown, setNextMeetingCountdown] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMeeting({ ...newMeeting, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const meetingToAdd = { ...newMeeting, id: meetings.length + 1, attendees: newMeeting.attendees[0].split(',') };
    setMeetings([...meetings, meetingToAdd]);
    setNewMeeting({ title: '', date: '', time: '', attendees: [] });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const nextMeeting = meetings
        .map(meeting => ({ ...meeting, dateTime: new Date(`${meeting.date}T${meeting.time}`) }))
        .filter(meeting => meeting.dateTime > now)
        .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())[0];

      if (nextMeeting) {
        const timeDiff = nextMeeting.dateTime.getTime() - now.getTime();
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        setNextMeetingCountdown(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setNextMeetingCountdown('No upcoming meetings');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [meetings]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-morphism p-6 border-2 border-blue-500"
      >
        <h2 className="text-2xl font-bold mb-4 text-secondary flex items-center">
          <Calendar className="w-6 h-6 mr-2" />
          Schedule a Meeting
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-text">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newMeeting.title}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md bg-surface border-transparent focus:border-secondary focus:ring-0 text-text"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-text">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={newMeeting.date}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md bg-surface border-transparent focus:border-secondary focus:ring-0 text-text"
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-text">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={newMeeting.time}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md bg-surface border-transparent focus:border-secondary focus:ring-0 text-text"
            />
          </div>
          <div>
            <label htmlFor="attendees" className="block text-sm font-medium text-text">Attendees (comma-separated)</label>
            <input
              type="text"
              id="attendees"
              name="attendees"
              value={newMeeting.attendees}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md bg-surface border-transparent focus:border-secondary focus:ring-0 text-text"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Schedule Meeting
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
          <Clock className="w-6 h-6 mr-2" />
          Upcoming Meetings
        </h2>
        <div className="mb-4 p-4 bg-surface rounded-lg">
          <h3 className="text-lg font-semibold text-secondary flex items-center">
            <AlarmClock className="w-5 h-5 mr-2" />
            Next Meeting In:
          </h3>
          <p className="text-2xl font-bold text-text">{nextMeetingCountdown}</p>
        </div>
        <ul className="space-y-4">
          {meetings.map((meeting) => (
            <li key={meeting.id} className="bg-surface bg-opacity-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-text">{meeting.title}</h3>
              <p className="text-sm text-secondary"><Calendar className="inline w-4 h-4 mr-1" />{meeting.date}</p>
              <p className="text-sm text-secondary"><Clock className="inline w-4 h-4 mr-1" />{meeting.time}</p>
              <p className="text-sm text-secondary"><Users className="inline w-4 h-4 mr-1" />{meeting.attendees.join(', ')}</p>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};
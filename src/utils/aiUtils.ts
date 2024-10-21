import { Task, User } from '../types';

export function generateAIRecommendations(tasks: Task[], currentUser: User | null): string[] {
  // This is a placeholder for the AI recommendation logic
  // In a real application, this would be a more sophisticated algorithm
  // or an API call to an AI service
  const recommendations: string[] = [];

  if (currentUser) {
    const userTasks = tasks.filter(task => task.assignee === currentUser.name);
    const highPriorityTasks = userTasks.filter(task => task.priority === 'High');
    const upcomingDeadlines = userTasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      const diffTime = dueDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 3 && diffDays > 0;
    });

    if (highPriorityTasks.length > 0) {
      recommendations.push(`Focus on your ${highPriorityTasks.length} high-priority tasks first.`);
    }

    if (upcomingDeadlines.length > 0) {
      recommendations.push(`You have ${upcomingDeadlines.length} tasks due in the next 3 days.`);
    }

    if (userTasks.length > 5) {
      recommendations.push("Consider delegating some tasks to balance your workload.");
    }
  }

  if (recommendations.length === 0) {
    recommendations.push("Great job! You're on top of your tasks.");
  }

  return recommendations;
}
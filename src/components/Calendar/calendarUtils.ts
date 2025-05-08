
export const getEventTypeStyle = (type: string) => {
  switch (type) {
    case 'assignment':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'deadline':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'exam':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    default:
      return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  }
};

export const MOCK_ASSIGNMENTS = [
  {
    id: '1',
    title: 'Math Quiz - Algebra',
    description: 'Covering chapters 5-7 on polynomial expressions',
    date: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
    type: 'exam',
    assigned_by: 'Mrs. Johnson',
  },
  {
    id: '2',
    title: 'History Essay',
    description: 'Write a 1000-word essay on the Industrial Revolution',
    date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
    type: 'assignment',
    assigned_by: 'Mr. Smith',
  },
  {
    id: '3',
    title: 'Science Project Deadline',
    description: 'Final submission of the ecosystem model',
    date: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(),
    type: 'deadline',
    assigned_by: 'Dr. Williams',
  },
  {
    id: '4',
    title: 'Literature Analysis',
    description: 'Character study for "To Kill a Mockingbird"',
    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    type: 'assignment',
    assigned_by: 'Ms. Davis',
  },
  {
    id: '5',
    title: 'Mid-term Exams',
    description: 'All subjects - review study guides',
    date: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString(),
    type: 'exam',
    assigned_by: 'School Administration',
  },
];

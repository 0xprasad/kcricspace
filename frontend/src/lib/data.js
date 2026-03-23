export const dashboardStats = [
  { label: 'Live Tournaments', value: '12', helper: 'Across 7 cities' },
  { label: 'Registered Players', value: '8,450', helper: 'Growing 18% QoQ' },
  { label: 'Matches Today', value: '42', helper: '8 in live scoring' },
  { label: 'Monthly Revenue', value: '₹18.4L', helper: 'Razorpay settled' }
];

export const featuredTournaments = [
  { id: 1, name: 'Corporate Elite Cup', city: 'Bengaluru', format: 'T20', fee: '₹15,000', prize: '₹2,00,000', status: 'Open' },
  { id: 2, name: 'Founders Sprint', city: 'Hyderabad', format: 'T10', fee: '₹8,000', prize: '₹75,000', status: 'Live' },
  { id: 3, name: 'Sunday League', city: 'Mumbai', format: 'ODI', fee: 'Free', prize: '₹25,000', status: 'Completed' }
];

export const players = [
  { id: 7, name: 'Arjun Mehta', role: 'All-Rounder', team: 'Tech Titans', batting: 'RHB', bowling: 'RA Fast-Medium', runs: 4821, wickets: 118, average: 34.91, strikeRate: 158.4 },
  { id: 8, name: 'Sana Iyer', role: 'Wicket Keeper', team: 'Data Dynamos', batting: 'LHB', bowling: '—', runs: 3110, wickets: 0, average: 39.8, strikeRate: 142.1 }
];

export const teamRoster = [
  { name: 'Rohan Kulkarni', role: 'All-Rounder (C)', status: 'Available' },
  { name: 'Manish Singh', role: 'Opening Batsman', status: 'Available' },
  { name: 'Amit Das', role: 'Fast Bowler', status: 'On Leave' },
  { name: 'Vijay Patil', role: 'Wicketkeeper', status: 'Available' }
];

export const apiCatalog = [
  { method: 'POST', path: '/auth/register', description: 'Create a user account with JWT-ready credentials.' },
  { method: 'POST', path: '/auth/login', description: 'Authenticate a user and return bearer token payload.' },
  { method: 'GET', path: '/tournaments', description: 'List tournaments with registration counts.' },
  { method: 'POST', path: '/tournaments/:id/register', description: 'Register a team into a tournament.' },
  { method: 'GET', path: '/players/:id', description: 'Fetch detailed player profile and statistics.' },
  { method: 'POST', path: '/matches/:id/score', description: 'Record a ball event for live scoring.' },
  { method: 'GET', path: '/admin/overview', description: 'Load platform-level KPIs for the admin dashboard.' }
];

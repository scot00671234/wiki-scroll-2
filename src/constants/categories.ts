import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'philosophy',
    name: 'Philosophy',
    searchTerms: ['philosophy', 'philosopher', 'ethics', 'metaphysics', 'logic'],
    color: 'bg-purple-500'
  },
  {
    id: 'history',
    name: 'History',
    searchTerms: ['history', 'historical', 'ancient', 'medieval', 'war', 'battle'],
    color: 'bg-amber-500'
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    searchTerms: ['mathematics', 'math', 'algebra', 'geometry', 'calculus', 'theorem'],
    color: 'bg-blue-500'
  },
  {
    id: 'science',
    name: 'Science',
    searchTerms: ['science', 'physics', 'chemistry', 'biology', 'research', 'experiment'],
    color: 'bg-green-500'
  },
  {
    id: 'technology',
    name: 'Technology',
    searchTerms: ['technology', 'computer', 'software', 'internet', 'artificial intelligence'],
    color: 'bg-cyan-500'
  },
  {
    id: 'art',
    name: 'Art',
    searchTerms: ['art', 'painting', 'sculpture', 'artist', 'museum', 'gallery'],
    color: 'bg-pink-500'
  },
  {
    id: 'literature',
    name: 'Literature',
    searchTerms: ['literature', 'book', 'novel', 'poetry', 'author', 'writer'],
    color: 'bg-indigo-500'
  },
  {
    id: 'music',
    name: 'Music',
    searchTerms: ['music', 'song', 'composer', 'musician', 'band', 'concert'],
    color: 'bg-red-500'
  },
  {
    id: 'sports',
    name: 'Sports',
    searchTerms: ['sports', 'football', 'basketball', 'tennis', 'olympics', 'athlete'],
    color: 'bg-orange-500'
  },
  {
    id: 'geography',
    name: 'Geography',
    searchTerms: ['geography', 'country', 'city', 'mountain', 'river', 'ocean'],
    color: 'bg-teal-500'
  },
  {
    id: 'politics',
    name: 'Politics',
    searchTerms: ['politics', 'government', 'election', 'president', 'parliament'],
    color: 'bg-gray-500'
  },
  {
    id: 'religion',
    name: 'Religion',
    searchTerms: ['religion', 'god', 'church', 'temple', 'bible', 'quran'],
    color: 'bg-yellow-500'
  }
];

export const SORT_OPTIONS = [
  { value: 'alphabetical', label: 'Alphabetical' },
  { value: 'random', label: 'Random' }
] as const;

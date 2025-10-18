import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { CATEGORIES } from '../constants/categories';
import { Logo } from './Logo';

interface HeaderProps {
  onSearch: (query: string) => void;
  onCategorySearch: (category: string) => void;
  onHomeClick: () => void;
  isLoading: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  onCategorySearch,
  onHomeClick,
  isLoading
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
    onCategorySearch(category);
  };

  const handleCategoryClear = () => {
    setSelectedCategory(null);
    onHomeClick();
  };



  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onHomeClick}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200 cursor-pointer"
            >
              <Logo size="md" />
              <span 
                className="text-xl font-light text-gray-900 tracking-tight"
                style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                WikiScroll
              </span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all duration-200 bg-white hover:border-gray-300 text-gray-900 placeholder-gray-500 text-sm font-light"
                  style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
                  disabled={isLoading}
                />
                {isLoading && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600"></div>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Category Button */}
          <div className="relative" ref={categoryRef}>
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center space-x-2 px-4 py-2.5 bg-white hover:bg-gray-50 rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300 hover:shadow-sm"
            >
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700 font-light text-sm">
                {selectedCategory ? CATEGORIES.find(c => c.id === selectedCategory)?.name : 'Categories'}
              </span>
              {selectedCategory && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClear();
                  }}
                  className="ml-1 p-1 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <X className="w-3 h-3 text-gray-500" />
                </button>
              )}
            </button>

            {/* Category Dropdown */}
            {isCategoryOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-80 overflow-y-auto">
                <div className="p-3">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Browse Categories</h3>
                  <div className="grid grid-cols-1 gap-1">
                    {CATEGORIES.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`p-2.5 rounded-md text-left transition-all duration-150 hover:bg-gray-50 ${
                          selectedCategory === category.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${category.color}`}></div>
                          <span className="text-sm font-light">{category.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

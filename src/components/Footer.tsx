import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Brand Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900">Wiki Scroll</h3>
            <p className="text-gray-600 text-xs leading-relaxed">
              Discover Wikipedia articles with a modern, clean interface. 
              Browse random articles or search by category.
            </p>
          </div>

          {/* Features Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900">Features</h3>
            <ul className="space-y-1 text-xs text-gray-600">
              <li>Infinite scroll browsing</li>
              <li>Category-based search</li>
              <li>Responsive design</li>
              <li>Clean interface</li>
            </ul>
          </div>

          {/* About Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900">About</h3>
            <p className="text-gray-600 text-xs leading-relaxed">
              Built with React, TypeScript, and Tailwind CSS. 
              Powered by Wikipedia's API.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-xs text-gray-500">
              © {currentYear} Wiki Scroll. Content from Wikipedia.
            </p>
            <div className="text-xs text-gray-500">
              Made for knowledge seekers
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

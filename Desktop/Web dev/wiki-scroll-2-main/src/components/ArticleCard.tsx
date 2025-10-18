import React from 'react';
import { ExternalLink, User, MapPin } from 'lucide-react';
import { WikipediaArticle } from '../types';

interface ArticleCardProps {
  article: WikipediaArticle;
  index: number;
  onArticleClick?: (article: WikipediaArticle) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, index, onArticleClick }) => {
  const handleOpenArticle = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://en.wikipedia.org/wiki/${encodeURIComponent(article.title)}`, '_blank');
  };

  const handleCardClick = () => {
    if (onArticleClick) {
      onArticleClick(article);
    }
  };


  const truncateText = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <article
      className="group bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-100/50 hover:border-gray-200/80 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500 overflow-hidden hover:-translate-y-1 cursor-pointer"
      onClick={handleCardClick}
      style={{
        animationDelay: `${index * 50}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards'
      }}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Image */}
        {article.thumbnail && (
          <div className="lg:w-80 w-full h-56 lg:h-64 flex-shrink-0 overflow-hidden">
            <img
              src={article.thumbnail.source}
              alt={article.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out"
              loading="lazy"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-8">
          <div className="flex items-start justify-between mb-5">
            <h3 className="text-2xl font-light text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight pr-6"
                style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', letterSpacing: '-0.02em' }}>
              {article.title}
            </h3>
            <button
              onClick={handleOpenArticle}
              className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all duration-300 flex-shrink-0 group/btn"
              title="Open in Wikipedia"
            >
              <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
            </button>
          </div>

          {/* Extract */}
          {article.extract && (
            <p className="text-gray-600 text-base leading-relaxed mb-6 line-clamp-3 group-hover:text-gray-700 transition-colors duration-300"
               style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>
              {truncateText(article.extract, 180)}
            </p>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-6">
            {article.coordinates && article.coordinates.length > 0 && (
              <div className="flex items-center space-x-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg">
                <MapPin className="w-3 h-3" />
                <span className="font-medium">
                  {article.coordinates[0].lat.toFixed(2)}, {article.coordinates[0].lon.toFixed(2)}
                </span>
              </div>
            )}
            
            <div className="flex items-center space-x-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg">
              <User className="w-3 h-3" />
              <span className="font-medium">Wikipedia</span>
            </div>
          </div>

          {/* Categories */}
          {article.categories && article.categories.length > 0 && (
            <div className="flex flex-wrap gap-2.5">
              {article.categories.slice(0, 3).map((category, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-blue-50/50 text-blue-700 text-xs font-medium rounded-full border border-blue-100/50 hover:bg-blue-100/50 transition-colors duration-200"
                  style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
                >
                  {typeof category === 'string' ? category.replace('Category:', '') : String(category)}
                </span>
              ))}
              {article.categories.length > 3 && (
                <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full border border-gray-200/50"
                      style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  +{article.categories.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
document.head.appendChild(style);

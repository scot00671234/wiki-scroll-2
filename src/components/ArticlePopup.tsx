import React, { useEffect, useState } from 'react';
import { X, ExternalLink, User, MapPin } from 'lucide-react';
import { WikipediaArticle } from '../types';
import { wikipediaService } from '../services/wikipedia';

interface ArticlePopupProps {
  article: WikipediaArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArticlePopup: React.FC<ArticlePopupProps> = ({ article, isOpen, onClose }) => {
  const [fullArticle, setFullArticle] = useState<WikipediaArticle | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (article && isOpen) {
      setIsLoading(true);
      // Fetch full article content
      wikipediaService.getFullArticleContent(article.pageid)
        .then(response => {
          const fullArticleData = Object.values(response.query.pages)[0];
          setFullArticle(fullArticleData);
        })
        .catch(error => {
          console.error('Error fetching full article:', error);
          setFullArticle(article); // Fallback to original article
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [article, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !article) return null;

  const displayArticle = fullArticle || article;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleOpenWikipedia = () => {
    window.open(`https://en.wikipedia.org/wiki/${encodeURIComponent(article.title)}`, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h1 className="text-2xl font-light text-gray-900 pr-4" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>
            {displayArticle.title}
          </h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleOpenWikipedia}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              title="Open in Wikipedia"
            >
              <ExternalLink className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-blue-600"></div>
                <span className="text-gray-600">Loading full article...</span>
              </div>
            </div>
          ) : (
            <div className="p-6">
              {/* Image */}
              {displayArticle.thumbnail && (
                <div className="mb-6">
                  <img
                    src={displayArticle.thumbnail.source}
                    alt={displayArticle.title}
                    className="w-full h-64 object-cover object-center rounded-xl"
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-gray max-w-none">
                <div className="text-gray-700 leading-relaxed text-base" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  {displayArticle.extract}
                </div>
              </div>

              {/* Metadata */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  {displayArticle.coordinates && displayArticle.coordinates.length > 0 && (
                    <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium">
                        {displayArticle.coordinates[0].lat.toFixed(4)}, {displayArticle.coordinates[0].lon.toFixed(4)}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                    <User className="w-4 h-4" />
                    <span className="font-medium">Wikipedia</span>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

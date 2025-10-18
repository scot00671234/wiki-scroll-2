import React, { useState } from 'react';
import { ArticleCard } from './ArticleCard';
import { ArticlePopup } from './ArticlePopup';
import { BannerAd } from './AdSense';
import { WikipediaArticle } from '../types';

interface ArticleListProps {
  articles: WikipediaArticle[];
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore?: () => void;
}

export const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  isLoading,
  hasMore
}) => {
  const [selectedArticle, setSelectedArticle] = useState<WikipediaArticle | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Show ads every 6 articles
  const shouldShowAd = (index: number) => {
    return index > 0 && index % 6 === 0;
  };

  const handleArticleClick = (article: WikipediaArticle) => {
    setSelectedArticle(article);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedArticle(null);
  };


  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="space-y-8">
            {articles.map((article, index) => (
              <React.Fragment key={article.pageid}>
                <ArticleCard 
                  article={article} 
                  index={index} 
                  onArticleClick={handleArticleClick}
                />
                
                {/* Banner Ad every 6 articles */}
                {shouldShowAd(index) && (
                  <div className="my-12">
                    <BannerAd />
                  </div>
                )}
              </React.Fragment>
            ))}

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-xl px-6 py-4 shadow-lg border border-gray-200/50">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-blue-600"></div>
                  <span className="text-gray-700 text-sm font-medium">Loading articles...</span>
                </div>
              </div>
            )}

            {/* End of Results */}
            {!hasMore && articles.length > 0 && !isLoading && (
              <div className="text-center py-12">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 py-4 shadow-lg border border-gray-200/50 max-w-sm mx-auto">
                  <div className="text-gray-700 text-sm font-medium mb-1">
                    End of results
                  </div>
                  <div className="text-gray-600 text-xs">
                    Try a different search or category
                  </div>
                </div>
              </div>
            )}

            {/* No Results */}
            {articles.length === 0 && !isLoading && (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 py-4 shadow-lg border border-gray-200/50 max-w-sm">
                  <div className="text-gray-700 text-sm font-medium mb-1">
                    No articles found
                  </div>
                  <div className="text-gray-600 text-xs">
                    Try different search terms or categories
                  </div>
                </div>
              </div>
            )}
      </div>
      
      {/* Article Popup */}
      <ArticlePopup
        article={selectedArticle}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />
    </div>
  );
};

import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { ArticleList } from './components/ArticleList';
import { Footer } from './components/Footer';
import { ScrollBackground } from './components/ScrollBackground';
import { wikipediaService } from './services/wikipedia';
import { WikipediaArticle } from './types';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import { CATEGORIES } from './constants/categories';

const ARTICLES_PER_PAGE = 20;

function App() {
  const [articles, setArticles] = useState<WikipediaArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setIsMore] = useState(true);
  const [currentQuery, setCurrentQuery] = useState('');
  const [offset, setOffset] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const loadArticles = useCallback(async (
    query: string = '',
    reset: boolean = true
  ) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      let newArticles: WikipediaArticle[] = [];
      let newOffset = reset ? 0 : offset;

      if (query.trim()) {
        // Search articles
        const searchResponse = await wikipediaService.searchArticles(query, ARTICLES_PER_PAGE, newOffset);
        const pageIds = searchResponse.query.search.map(item => item.pageid);
        
        if (pageIds.length > 0) {
          const detailsResponse = await wikipediaService.getArticleDetails(pageIds);
          newArticles = Object.values(detailsResponse.query.pages);
        }
        setIsMore(newArticles.length === ARTICLES_PER_PAGE);
      } else {
        // Random/featured articles for home page
        console.log('Fetching random articles...');
        const randomResponse = await wikipediaService.getRandomArticles(ARTICLES_PER_PAGE);
        console.log('Random response:', randomResponse);
        newArticles = Object.values(randomResponse.query.pages || {});
        console.log('Random articles found:', newArticles.length);
        // For random articles, always allow more to be loaded
        setIsMore(true);
      }

      // Sort articles randomly
      newArticles.sort(() => Math.random() - 0.5);

      if (reset) {
        setArticles(newArticles);
        setOffset(ARTICLES_PER_PAGE);
      } else {
        setArticles(prev => [...prev, ...newArticles]);
        setOffset(prev => prev + ARTICLES_PER_PAGE);
      }
    } catch (error) {
      console.error('Error loading articles:', error);
      setIsMore(false);
    } finally {
      setIsLoading(false);
      setIsInitialLoad(false);
    }
  }, [isLoading, offset]);

  const handleSearch = useCallback((query: string) => {
    setCurrentQuery(query);
    loadArticles(query, true);
  }, [loadArticles]);

  const handleHomeClick = useCallback(() => {
    setCurrentQuery('');
    loadArticles('', true);
  }, [loadArticles]);

  const handleCategorySearch = useCallback((categoryId: string) => {
    const category = CATEGORIES.find(c => c.id === categoryId);
    if (category) {
      // Use the first search term from the category for the search
      const searchQuery = category.searchTerms[0];
      setCurrentQuery(searchQuery);
      loadArticles(searchQuery, true);
    }
  }, [loadArticles]);

  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      loadArticles(currentQuery, false);
    }
  }, [isLoading, hasMore, loadArticles, currentQuery]);

  // Infinite scroll hook
  useInfiniteScroll({
    hasMore,
    isLoading,
    onLoadMore: handleLoadMore
  });

  // Initial load
  useEffect(() => {
    if (isInitialLoad) {
      console.log('Initial load starting...');
      loadArticles('', true);
    }
  }, [isInitialLoad, loadArticles]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      <ScrollBackground />
      
      <Header
        onSearch={handleSearch}
        onCategorySearch={handleCategorySearch}
        onHomeClick={handleHomeClick}
        isLoading={isLoading}
      />
      
      <main className="flex-1 relative z-10">
        <ArticleList
          articles={articles}
          isLoading={isLoading}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
        />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;

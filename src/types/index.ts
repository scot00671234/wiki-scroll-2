export interface WikipediaArticle {
  pageid: number;
  ns: number;
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  original?: {
    source: string;
    width: number;
    height: number;
  };
  pageimage?: string;
  categories?: string[];
  coordinates?: Array<{
    lat: number;
    lon: number;
    primary: boolean;
    globe: string;
  }>;
}

export interface WikipediaSearchResult {
  query: {
    pages: Record<string, WikipediaArticle>;
  };
}

export interface WikipediaSearchResponse {
  query: {
    search: Array<{
      ns: number;
      title: string;
      pageid: number;
      size: number;
      wordcount: number;
      snippet: string;
      timestamp: string;
    }>;
    searchinfo: {
      totalhits: number;
    };
  };
}

export interface Category {
  id: string;
  name: string;
  searchTerms: string[];
  color: string;
}

export type SortOption = 'relevance' | 'alphabetical' | 'random';

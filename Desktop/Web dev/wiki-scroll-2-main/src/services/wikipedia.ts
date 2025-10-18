import { WikipediaSearchResponse, WikipediaSearchResult } from '../types';

const WIKIPEDIA_API_BASE = 'https://en.wikipedia.org/w/api.php';

export class WikipediaService {
  private static instance: WikipediaService;
  
  private constructor() {}
  
  public static getInstance(): WikipediaService {
    if (!WikipediaService.instance) {
      WikipediaService.instance = new WikipediaService();
    }
    return WikipediaService.instance;
  }

  async searchArticles(query: string, limit: number = 20, offset: number = 0): Promise<WikipediaSearchResponse> {
    const params = new URLSearchParams({
      action: 'query',
      format: 'json',
      list: 'search',
      srsearch: query,
      srlimit: limit.toString(),
      sroffset: offset.toString(),
      srprop: 'snippet|timestamp|wordcount',
      origin: '*'
    });

    const response = await fetch(`${WIKIPEDIA_API_BASE}?${params}`);
    if (!response.ok) {
      throw new Error(`Wikipedia API error: ${response.status}`);
    }
    
    return response.json();
  }

  async getArticleDetails(pageIds: number[]): Promise<WikipediaSearchResult> {
    const params = new URLSearchParams({
      action: 'query',
      format: 'json',
      pageids: pageIds.join('|'),
      prop: 'extracts|pageimages|pageprops|coordinates',
      exintro: 'true',
      explaintext: 'true',
      piprop: 'thumbnail|original',
      pithumbsize: '300',
      pilimit: 'max',
      origin: '*'
    });

    const response = await fetch(`${WIKIPEDIA_API_BASE}?${params}`);
    if (!response.ok) {
      throw new Error(`Wikipedia API error: ${response.status}`);
    }
    
    return response.json();
  }

  async getFullArticleContent(pageId: number): Promise<WikipediaSearchResult> {
    // First try to get the full article without limits
    const params = new URLSearchParams({
      action: 'query',
      format: 'json',
      pageids: pageId.toString(),
      prop: 'extracts|pageimages|pageprops|coordinates',
      exintro: 'false',
      explaintext: 'true',
      exsectionformat: 'plain',
      piprop: 'thumbnail|original',
      pithumbsize: '800',
      pilimit: 'max',
      origin: '*'
    });

    const response = await fetch(`${WIKIPEDIA_API_BASE}?${params}`);
    if (!response.ok) {
      throw new Error(`Wikipedia API error: ${response.status}`);
    }
    
    return response.json();
  }

  async getRandomArticles(limit: number = 20): Promise<WikipediaSearchResult> {
    // First get random page IDs
    const randomParams = new URLSearchParams({
      action: 'query',
      format: 'json',
      list: 'random',
      rnnamespace: '0',
      rnlimit: limit.toString(),
      origin: '*'
    });

    const randomResponse = await fetch(`${WIKIPEDIA_API_BASE}?${randomParams}`);
    if (!randomResponse.ok) {
      throw new Error(`Wikipedia API error: ${randomResponse.status}`);
    }
    
    const randomData = await randomResponse.json();
    const pageIds = randomData.query?.random?.map((item: any) => item.id) || [];
    
    if (pageIds.length === 0) {
      return { query: { pages: {} } };
    }

    // Then get article details
    const detailsParams = new URLSearchParams({
      action: 'query',
      format: 'json',
      pageids: pageIds.join('|'),
      prop: 'extracts|pageimages|pageprops',
      exintro: 'true',
      explaintext: 'true',
      piprop: 'thumbnail|original',
      pithumbsize: '300',
      pilimit: 'max',
      origin: '*'
    });

    const detailsResponse = await fetch(`${WIKIPEDIA_API_BASE}?${detailsParams}`);
    if (!detailsResponse.ok) {
      throw new Error(`Wikipedia API error: ${detailsResponse.status}`);
    }
    
    return detailsResponse.json();
  }

  async getCategoryArticles(category: string, limit: number = 20, offset: number = 0): Promise<WikipediaSearchResult> {
    // Use search with category terms for better results
    const searchTerms = this.getCategorySearchTerms(category);
    const searchQuery = searchTerms.join(' OR ');
    
    const searchParams = new URLSearchParams({
      action: 'query',
      format: 'json',
      list: 'search',
      srsearch: searchQuery,
      srlimit: limit.toString(),
      sroffset: offset.toString(),
      srprop: 'snippet|timestamp|wordcount',
      origin: '*'
    });

    const searchResponse = await fetch(`${WIKIPEDIA_API_BASE}?${searchParams}`);
    if (!searchResponse.ok) {
      throw new Error(`Wikipedia API error: ${searchResponse.status}`);
    }
    
    const searchData = await searchResponse.json();
    const pageIds = searchData.query?.search?.map((item: any) => item.pageid) || [];
    
    if (pageIds.length === 0) {
      return { query: { pages: {} } };
    }

    // Then get article details
    const detailsParams = new URLSearchParams({
      action: 'query',
      format: 'json',
      pageids: pageIds.join('|'),
      prop: 'extracts|pageimages|pageprops',
      exintro: 'true',
      explaintext: 'true',
      piprop: 'thumbnail|original',
      pithumbsize: '300',
      pilimit: 'max',
      origin: '*'
    });

    const detailsResponse = await fetch(`${WIKIPEDIA_API_BASE}?${detailsParams}`);
    if (!detailsResponse.ok) {
      throw new Error(`Wikipedia API error: ${detailsResponse.status}`);
    }
    
    return detailsResponse.json();
  }

  private getCategorySearchTerms(category: string): string[] {
    const categoryMap: { [key: string]: string[] } = {
      'Philosophy': ['philosophy', 'philosopher', 'ethics', 'metaphysics', 'logic', 'epistemology'],
      'History': ['history', 'historical', 'ancient', 'medieval', 'war', 'battle', 'civilization'],
      'Mathematics': ['mathematics', 'math', 'algebra', 'geometry', 'calculus', 'theorem', 'equation'],
      'Science': ['science', 'physics', 'chemistry', 'biology', 'research', 'experiment', 'discovery'],
      'Technology': ['technology', 'computer', 'software', 'internet', 'artificial intelligence', 'programming'],
      'Art': ['art', 'painting', 'sculpture', 'artist', 'museum', 'gallery', 'creative'],
      'Literature': ['literature', 'book', 'novel', 'poetry', 'author', 'writer', 'story'],
      'Music': ['music', 'song', 'composer', 'musician', 'band', 'concert', 'instrument'],
      'Sports': ['sports', 'football', 'basketball', 'tennis', 'olympics', 'athlete', 'game'],
      'Geography': ['geography', 'country', 'city', 'mountain', 'river', 'ocean', 'continent'],
      'Politics': ['politics', 'government', 'election', 'president', 'parliament', 'democracy'],
      'Religion': ['religion', 'god', 'church', 'temple', 'bible', 'quran', 'faith']
    };
    
    return categoryMap[category] || [category.toLowerCase()];
  }

  async getFeaturedArticles(limit: number = 20): Promise<WikipediaSearchResult> {
    const params = new URLSearchParams({
      action: 'query',
      format: 'json',
      list: 'featured',
      fllimit: limit.toString(),
      prop: 'extracts|pageimages|pageprops',
      exintro: 'true',
      explaintext: 'true',
      piprop: 'thumbnail|original',
      pithumbsize: '300',
      pilimit: 'max',
      origin: '*'
    });

    const response = await fetch(`${WIKIPEDIA_API_BASE}?${params}`);
    if (!response.ok) {
      throw new Error(`Wikipedia API error: ${response.status}`);
    }
    
    return response.json();
  }
}

export const wikipediaService = WikipediaService.getInstance();

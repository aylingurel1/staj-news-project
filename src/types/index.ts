export type NewsCategory = 
  | 'business'
  | 'entertainment'
  | 'general'
  | 'health'
  | 'science'
  | 'sports'
  | 'technology';

export type NewsLanguage = 
  | 'ar' | 'de' | 'en' | 'es' | 'fr' 
  | 'he' | 'it' | 'nl' | 'no' | 'pt' 
  | 'ru' | 'sv' | 'ud' | 'zh';

export type NewsSortBy = 'relevancy' | 'popularity' | 'publishedAt';

export type NewsSearchIn = 'title' | 'description' | 'content';

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
  code?: string;
  message?: string;
}

export interface NewsParams {
  country?: string;
  category?: NewsCategory;
  q?: string;
  page?: number;
  pageSize?: number;
}

export interface EverythingParams {
  q?: string;
  searchIn?: string;
  sources?: string;
  domains?: string;
  excludeDomains?: string;
  from?: string;
  to?: string;
  language?: NewsLanguage;
  sortBy?: NewsSortBy;
  page?: number;
  pageSize?: number;
}
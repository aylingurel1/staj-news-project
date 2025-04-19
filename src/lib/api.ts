import { NewsParams, NewsResponse, EverythingParams } from '@/types';
import axios from 'axios';

const NEWS_API_BASE_URL = process.env.NEXT_PUBLIC_NEWS_API_BASE_URL || 'https://newsapi.org/v2';
const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY || '676f017549224f488970f1835f9db971';

const newsApiClient = axios.create({
  baseURL: NEWS_API_BASE_URL,
  params: {
    apiKey: NEWS_API_KEY,
  },
});

/**
 * Get top headlines (limited filtering options)
 */
export async function getTopHeadlines(params: NewsParams = {}): Promise<NewsResponse> {
  try {
    const defaultParams: NewsParams = {
      country: 'us',
      pageSize: 20,
      page: 1,
      ...params,
    };
    
    const response = await newsApiClient.get<NewsResponse>('/top-headlines', {
      params: defaultParams,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    if (axios.isAxiosError(error)) {
      console.error('API Error details:', error.response?.data);
    }
    return {
      status: 'error',
      totalResults: 0,
      articles: [],
    };
  }
}

/**
 * Get everything (advanced filtering options)
 */
export async function getEverything(params: EverythingParams): Promise<NewsResponse> {
  try {
    const defaultParams: EverythingParams = {
      q: params.q || 'news',
      pageSize: params.pageSize || 20,
      page: params.page || 1,
      sortBy: params.sortBy || 'publishedAt',
      language: params.language || 'en',
      ...params,
    };
    
    const response = await newsApiClient.get<NewsResponse>('/everything', {
      params: defaultParams,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching everything:', error);
    if (axios.isAxiosError(error)) {
      console.error('API Error details:', error.response?.data);
    }
    return {
      status: 'error',
      totalResults: 0,
      articles: [],
    };
  }
}

/**
 * Basic search (uses top-headlines with q parameter)
 */
export async function searchNews(query: string, params: NewsParams = {}): Promise<NewsResponse> {
  try {
    const searchParams: NewsParams = {
      country: 'us',
      q: query,
      pageSize: 20,
      page: 1,
      ...params,
    };

    const response = await newsApiClient.get<NewsResponse>('/top-headlines', {
      params: searchParams,
    });

    return response.data;
  } catch (error) {
    console.error('Error searching news:', error);
    return {
      status: 'error',
      totalResults: 0,
      articles: [],
    };
  }
}

/**
 * Advanced search (uses everything endpoint)
 */
export async function advancedSearch(params: EverythingParams): Promise<NewsResponse> {
  return getEverything(params);
}

// Helper function to calculate total pages
export function calculateTotalPages(totalResults: number, pageSize: number = 20): number {
  return Math.ceil(totalResults / pageSize);
}

// Utility function for date formatting
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

// Get available languages for filtering
export function getAvailableLanguages() {
  return [
    { code: 'ar', name: 'Arabic' },
    { code: 'de', name: 'German' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'he', name: 'Hebrew' },
    { code: 'it', name: 'Italian' },
    { code: 'nl', name: 'Dutch' },
    { code: 'no', name: 'Norwegian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'sv', name: 'Swedish' },
    { code: 'ud', name: 'Urdu' },
    { code: 'zh', name: 'Chinese' }
  ];
}
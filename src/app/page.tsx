import { Suspense } from 'react';
import { getTopHeadlines, calculateTotalPages } from '@/lib/api';
import NewsSlider from '@/components/news/news-slider';
import Pagination from '@/components/news/pagination';
import EditorsPick from '@/components/sections/editors-pick';

interface HomePageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function HomePage({ searchParams }: HomePageProps) {

  const pageParam = typeof searchParams.page === 'string' ? searchParams.page : '1';
  const currentPage = Number(pageParam);
  const pageSize = 20;

  const newsData = await getTopHeadlines({
    page: currentPage,
    pageSize,
  });

  console.log("News data received:", {
    status: newsData.status,
    totalResults: newsData.totalResults,
    articlesCount: newsData.articles?.length || 0
  });

  const totalPages = calculateTotalPages(newsData.totalResults, pageSize);

  const featuredArticles = newsData.articles.slice(0, 3);
  const editorsPicks = newsData.articles.slice(3, 7);

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>Loading featured news...</div>}>
        {featuredArticles.length > 0 ? (
          <NewsSlider articles={featuredArticles} />
        ) : (
          <div className="bg-yellow-50 p-6 rounded-lg mb-8">
            <h2 className="text-lg font-bold text-yellow-800 mb-2">No Articles Found</h2>
            <p className="text-yellow-700">
              We couldn't retrieve any articles. This might be because:
            </p>
            <ul className="list-disc list-inside mt-2 text-yellow-700">
              <li>The API key might be invalid or missing</li>
              <li>There might be network connectivity issues</li>
              <li>The NewsAPI service might be temporarily unavailable</li>
              <li>You might have exceeded your API request limits</li>
            </ul>
          </div>
        )}
      </Suspense>

      <div className="mb-8">
        <Suspense fallback={<div>Loading editor's picks...</div>}>
          <EditorsPick articles={editorsPicks} />
        </Suspense>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
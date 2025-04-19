import { Suspense } from 'react';
import { searchNews, calculateTotalPages } from '@/lib/api';
import NewsGrid from '@/components/news/news-grid';
import Pagination from '@/components/news/pagination';

interface SearchPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
    const q = typeof searchParams.q === 'string' ? searchParams.q : '';

    return {
        title: q ? `Search results for "${q}" | Aylin News` : 'Search | Aylin News',
        description: q ? `Browse search results for "${q}" on Aylin News.` : 'Search for news on Aylin News.',
    };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const q = typeof searchParams.q === 'string' ? searchParams.q : '';
    const pageParam = typeof searchParams.page === 'string' ? searchParams.page : '1';

    const currentPage = Number(pageParam);
    const pageSize = 20;

    const searchResults = q
        ? await searchNews(q, { page: currentPage, pageSize })
        : { status: 'ok', totalResults: 0, articles: [] };

    const totalPages = calculateTotalPages(searchResults.totalResults, pageSize);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                {q ? (
                    <h1 className="text-3xl font-bold">
                        Search results for: <span className="text-blue-600">"{q}"</span>
                    </h1>
                ) : (
                    <h1 className="text-3xl font-bold">Search</h1>
                )}

                <p className="text-gray-500 mt-2">
                    {searchResults.totalResults > 0
                        ? `Found ${searchResults.totalResults} results`
                        : q
                            ? 'No results found. Try a different search term.'
                            : 'Enter a search term to find news articles.'}
                </p>
            </div>

            <Suspense fallback={<div>Loading search results...</div>}>
                {searchResults.articles.length > 0 ? (
                    <>
                        <NewsGrid articles={searchResults.articles} />
                        <Pagination currentPage={currentPage} totalPages={totalPages} />
                    </>
                ) : q ? (
                    <div className="bg-white p-8 text-center rounded-lg shadow-sm">
                        <p className="text-gray-500">
                            No articles found for "{q}". Try using different keywords.
                        </p>
                    </div>
                ) : (
                    <div className="bg-white p-8 text-center rounded-lg shadow-sm">
                        <p className="text-gray-500">
                            Enter a search term in the search box above to find news articles.
                        </p>
                    </div>
                )}
            </Suspense>
        </div>
    );
}
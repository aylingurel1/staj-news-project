import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getEverything, getTopHeadlines, calculateTotalPages } from '@/lib/api';
import { formatCategoryName, getCategories } from '@/lib/utils';
import { NewsCategory, EverythingParams } from '@/types';
import NewsGrid from '@/components/news/news-grid';
import Pagination from '@/components/news/pagination';
import CategoryFilter from '@/components/category/category-filter';

interface CategoryPageProps {
    params: {
        category: string;
    };
    searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateStaticParams() {
    const categories = getCategories();
    return categories.map((category) => ({
        category,
    }));
}

export async function generateMetadata({ params }: { params: { category: string } }) {
    const { category } = params;
    const formattedCategory = formatCategoryName(category);

    return {
        title: `${formattedCategory} News | Meranda`,
        description: `Latest ${formattedCategory} news and updates from around the world.`,
    };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const { category } = params;
    const categories = getCategories();

    if (!categories.includes(category as NewsCategory)) {
        notFound();
    }

    const pageParam = typeof searchParams.page === 'string' ? searchParams.page : '1';
    const q = typeof searchParams.q === 'string' ? searchParams.q : '';
    const sortBy = typeof searchParams.sortBy === 'string' ? searchParams.sortBy : 'publishedAt';
    const order = typeof searchParams.order === 'string' ? searchParams.order : 'desc';
    const fromDate = typeof searchParams.from === 'string' ? searchParams.from : '';
    const toDate = typeof searchParams.to === 'string' ? searchParams.to : '';
    const language = typeof searchParams.language === 'string' ? searchParams.language : 'en';
    const domains = typeof searchParams.domains === 'string' ? searchParams.domains : '';
    const sources = typeof searchParams.sources === 'string' ? searchParams.sources : '';

    const currentPage = Number(pageParam);
    const pageSize = 20;

    let queryString = category;
    if (q) {
        queryString = `${queryString} AND ${q}`;
    }

    const useEverythingAPI = !!(domains || sources || fromDate || toDate || language !== 'en');

    let articles = [];
    let totalResults = 0;

    if (useEverythingAPI) {
        const everythingParams: EverythingParams = {
            q: queryString,
            page: currentPage,
            pageSize,
            sortBy: sortBy as any,
            language: language as any,
        };

        if (fromDate) everythingParams.from = fromDate;
        if (toDate) everythingParams.to = toDate;
        if (domains) everythingParams.domains = domains;
        if (sources) everythingParams.sources = sources;

        const newsData = await getEverything(everythingParams);
        articles = newsData.articles;
        totalResults = newsData.totalResults;
    } else {
        const newsData = await getTopHeadlines({
            category: category as NewsCategory,
            q: q || undefined,
            page: currentPage,
            pageSize,
        });
        articles = newsData.articles;
        totalResults = newsData.totalResults;
    }

    if (order === 'asc') {
        articles = [...articles].sort((a, b) => {
            if (sortBy === 'publishedAt') {
                return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
            }
            return 0;
        });
    }

    const totalPages = calculateTotalPages(totalResults, pageSize);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">
                {formatCategoryName(category)} News
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                    <Suspense fallback={<div>Loading filters...</div>}>
                        <CategoryFilter currentCategory={category} />
                    </Suspense>
                </div>

                <div className="lg:col-span-3">
                    {(q || domains || sources || fromDate || toDate || language !== 'en') && (
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <h2 className="text-lg font-medium mb-2">Active Filters:</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                {q && <div><span className="font-medium">Keywords:</span> {q}</div>}
                                {domains && <div><span className="font-medium">Domains:</span> {domains}</div>}
                                {sources && <div><span className="font-medium">Sources:</span> {sources}</div>}
                                {language !== 'en' && <div><span className="font-medium">Language:</span> {language.toUpperCase()}</div>}
                                {fromDate && <div><span className="font-medium">From:</span> {fromDate}</div>}
                                {toDate && <div><span className="font-medium">To:</span> {toDate}</div>}
                                <div><span className="font-medium">Sort by:</span> {sortBy} ({order})</div>
                            </div>
                        </div>
                    )}

                    <Suspense fallback={<div>Loading news...</div>}>
                        {articles.length > 0 ? (
                            <NewsGrid articles={articles} />
                        ) : (
                            <div className="bg-white p-8 text-center rounded-lg shadow-sm">
                                <p className="text-gray-500">
                                    No articles found with the current filters. Try changing your filter criteria.
                                </p>
                            </div>
                        )}
                    </Suspense>

                    <Pagination currentPage={currentPage} totalPages={totalPages} />
                </div>
            </div>
        </div>
    );
}
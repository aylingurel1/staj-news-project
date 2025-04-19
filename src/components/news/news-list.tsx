import NewsCard from './news-card';
import { NewsArticle } from '@/types';

interface NewsListProps {
    articles: NewsArticle[];
    title?: string;
    showViewAll?: boolean;
    viewAllLink?: string;
    variant?: 'small' | 'medium';
}

export default function NewsList({
    articles,
    title,
    showViewAll = false,
    viewAllLink = '#',
    variant = 'medium'
}: NewsListProps) {
    if (!articles || articles.length === 0) {
        return (
            <div className="w-full py-8 text-center">
                <p className="text-gray-500">No articles found</p>
            </div>
        );
    }

    return (
        <div className="py-4">
            {title && (
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">{title}</h2>
                    {showViewAll && (
                        <a
                            href={viewAllLink}
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            See All Trends
                        </a>
                    )}
                </div>
            )}

            <div className="divide-y divide-gray-100">
                {articles.map((article, index) => (
                    <div key={`${article.title}-${index}`} className="py-4 first:pt-0 last:pb-0">
                        <NewsCard
                            article={article}
                            variant={variant}
                            showDescription={variant !== 'small'}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
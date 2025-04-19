import NewsCard from './news-card';
import { NewsArticle } from '@/types';

interface NewsGridProps {
    articles: NewsArticle[];
    title?: string;
}

export default function NewsGrid({ articles, title }: NewsGridProps) {
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
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold">{title}</h2>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                    <div key={`${article.title}-${index}`} className="h-full flex flex-col">
                        <NewsCard
                            article={article}
                            variant={index === 0 ? 'large' : 'medium'}
                            showDescription={true}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
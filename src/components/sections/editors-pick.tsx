import Link from 'next/link';
import { NewsArticle } from '@/types';
import NewsCard from '@/components/news/news-card';

interface EditorsPickProps {
    articles: NewsArticle[];
}

export default function EditorsPick({ articles }: EditorsPickProps) {
    if (!articles || articles.length === 0) {
        return null;
    }

    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Editor's Pick</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                    <div key={`editor-pick-${index}`} className="h-full flex flex-col">
                        <Link href={article.url} target="_blank" className="no-underline h-full">
                            <NewsCard
                                article={article}
                                variant="medium"
                                showDescription={true}
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
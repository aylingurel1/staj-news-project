import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatDate } from '@/lib/api';
import { truncateText, getImageUrl } from '@/lib/utils';
import { NewsArticle } from '@/types';

interface NewsCardProps {
    article: NewsArticle;
    variant?: 'small' | 'medium' | 'large' | 'featured';
    showDescription?: boolean;
}

export default function NewsCard({
    article,
    variant = 'medium',
    showDescription = true
}: NewsCardProps) {
    const { title, description, urlToImage, publishedAt, author, source, url } = article;

    const getImageSize = () => {
        switch (variant) {
            case 'small':
                return { width: 120, height: 80 };
            case 'medium':
                return { width: 400, height: 240 };
            case 'large':
            case 'featured':
                return { width: 600, height: 400 };
            default:
                return { width: 400, height: 240 };
        }
    };

    const getTitleLength = () => {
        switch (variant) {
            case 'small':
                return 60;
            case 'medium':
                return 80;
            case 'large':
                return 100;
            case 'featured':
                return 120;
            default:
                return 80;
        }
    };

    const imageDimensions = getImageSize();
    const titleLength = getTitleLength();

    return (
        <Card className={`h-full overflow-hidden border-0 shadow-none ${variant === 'small' ? 'flex items-start' : ''}`}>
            <div className={variant === 'small' ? 'flex-shrink-0 mr-4' : ''}>
                <div className={`relative overflow-hidden rounded ${variant !== 'small' ? 'aspect-[4/3]' : ''}`}>
                    <Image
                        src={getImageUrl(urlToImage)}
                        alt={title || 'News image'}
                        width={imageDimensions.width}
                        height={imageDimensions.height}
                        className="object-cover w-full h-auto"
                    />
                </div>
            </div>

            <CardContent className={`p-0 flex-grow flex flex-col ${variant === 'small' ? 'pt-0' : 'pt-4'}`}>
                <div>
                    {source?.name && (
                        <div className="text-xs text-gray-500 mb-1">
                            {source.name}
                        </div>
                    )}

                    <Link href={url} target="_blank" className="no-underline">
                        <h3 className={`font-semibold text-gray-900 hover:text-blue-600 ${variant === 'featured' ? 'text-2xl' :
                            variant === 'large' ? 'text-xl' :
                                variant === 'small' ? 'text-base' :
                                    'text-lg'
                            }`}>
                            {truncateText(title, titleLength)}
                        </h3>
                    </Link>

                    {showDescription && description && variant !== 'small' && (
                        <p className="text-gray-600 mt-2 text-sm">
                            {truncateText(description, variant === 'featured' ? 180 : 120)}
                        </p>
                    )}
                </div>

                <CardFooter className={`px-0 mt-auto text-xs text-gray-500 ${variant === 'small' ? 'pt-1' : 'pt-2'}`}>
                    <div className="flex items-center">
                        {author && <span className="mr-2">{author}</span>}
                        <time dateTime={publishedAt}>
                            {formatDate(publishedAt)}
                        </time>
                    </div>
                </CardFooter>
            </CardContent>
        </Card>
    );
}
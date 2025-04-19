"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/api';
import { getImageUrl, truncateText } from '@/lib/utils';
import { NewsArticle } from '@/types';

interface NewsSliderProps {
    articles: NewsArticle[];
}

export default function NewsSlider({ articles }: NewsSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const featuredArticles = articles.slice(0, 3);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isAutoPlaying) {
            interval = setInterval(() => {
                setCurrentIndex((prevIndex) =>
                    prevIndex === featuredArticles.length - 1 ? 0 : prevIndex + 1
                );
            }, 5000);
        }

        return () => clearInterval(interval);
    }, [isAutoPlaying, featuredArticles.length]);

    const handlePrev = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? featuredArticles.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prevIndex) =>
            prevIndex === featuredArticles.length - 1 ? 0 : prevIndex + 1
        );
    };

    if (featuredArticles.length === 0) {
        return null;
    }

    const currentArticle = featuredArticles[currentIndex];

    return (
        <div className="relative overflow-hidden bg-white rounded-lg mb-8">
            <div className="flex md:h-96 h-80">
                <div className="w-full md:w-1/2 h-full relative">
                    {currentArticle.urlToImage ? (
                        <Image
                            src={getImageUrl(currentArticle.urlToImage)}
                            alt={currentArticle.title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">No image available</span>
                        </div>
                    )}
                </div>

                <div className="hidden md:flex md:w-1/2 p-8 flex-col justify-center">
                    {currentArticle.source?.name && (
                        <div className="text-sm text-gray-500 mb-2">
                            {currentArticle.source.name} | {formatDate(currentArticle.publishedAt)}
                        </div>
                    )}

                    <Link
                        href={currentArticle.url}
                        target="_blank"
                        className="no-underline"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                            {currentArticle.title}
                        </h2>
                    </Link>

                    {currentArticle.description && (
                        <p className="text-gray-600 mb-4">
                            {truncateText(currentArticle.description, 150)}
                        </p>
                    )}

                    <div className="flex items-center text-sm text-gray-500">
                        <span>
                            {currentArticle.author ? currentArticle.author : 'Unknown Author'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Mobile content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-90 md:hidden">
                {currentArticle.source?.name && (
                    <div className="text-xs text-gray-500 mb-1">
                        {currentArticle.source.name}
                    </div>
                )}

                <Link
                    href={currentArticle.url}
                    target="_blank"
                    className="no-underline"
                >
                    <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                        {truncateText(currentArticle.title, 80)}
                    </h2>
                </Link>

                <div className="flex items-center text-xs text-gray-500">
                    <span>
                        {formatDate(currentArticle.publishedAt)} | {currentArticle.author ? currentArticle.author : 'Unknown Author'}
                    </span>
                </div>
            </div>

            {/* Navigation buttons */}
            <div className="absolute top-1/2 transform -translate-y-1/2 left-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-white bg-opacity-60 hover:bg-opacity-100 text-gray-800"
                    onClick={handlePrev}
                >
                    <ChevronLeft className="h-6 w-6" />
                </Button>
            </div>

            <div className="absolute top-1/2 transform -translate-y-1/2 right-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-white bg-opacity-60 hover:bg-opacity-100 text-gray-800"
                    onClick={handleNext}
                >
                    <ChevronRight className="h-6 w-6" />
                </Button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-0 right-0 p-4 flex space-x-2">
                {featuredArticles.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setIsAutoPlaying(false);
                            setCurrentIndex(index);
                        }}
                        className={`h-2 w-6 rounded-full transition-colors ${index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
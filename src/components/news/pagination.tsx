"use client";

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
}

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    if (totalPages <= 1) {
        return null;
    }

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const getPageNumbers = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        let l;

        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                i === currentPage ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push(-1);
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    };

    return (
        <div className="flex justify-center items-center space-x-2 my-8">
            <Button
                variant="outline"
                size="icon"
                disabled={currentPage <= 1}
                onClick={() => {
                    if (currentPage > 1) {
                        router.push(createPageURL(currentPage - 1));
                    }
                }}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {getPageNumbers().map((page, index) => {
                if (page === -1) {
                    return (
                        <span key={`dots-${index}`} className="px-3 py-2">
                            ...
                        </span>
                    );
                }

                return (
                    <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        className={`w-10 h-10 ${currentPage === page ? "bg-blue-600" : ""}`}
                        onClick={() => router.push(createPageURL(page as number))}
                    >
                        {page}
                    </Button>
                );
            })}

            <Button
                variant="outline"
                size="icon"
                disabled={currentPage >= totalPages}
                onClick={() => {
                    if (currentPage < totalPages) {
                        router.push(createPageURL(currentPage + 1));
                    }
                }}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
    onClose?: () => void;
}

export default function SearchBar({ onClose }: SearchBarProps) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
            if (onClose) onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center w-full">
            <div className="relative w-full">
                <Input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-8 focus:ring-2 focus:ring-blue-500"
                />
                <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                >
                    <Search size={18} />
                </Button>
            </div>
            {onClose && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="ml-1"
                >
                    <X size={18} />
                </Button>
            )}
        </form>
    );
}
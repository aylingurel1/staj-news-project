"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Facebook, Twitter, Instagram, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn, isActivePage } from '@/lib/utils';
import SearchBar from './search-bar';
import Navbar from './navbar';

export default function Header() {
    const pathname = usePathname();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                {/* Top bar with socials and search */}
                <div className="flex justify-between items-center py-3">
                    <div className="flex items-center space-x-4">
                        <Link href="https://facebook.com" className="text-gray-500 hover:text-gray-700">
                            <Facebook size={16} />
                        </Link>
                        <Link href="https://twitter.com" className="text-gray-500 hover:text-gray-700">
                            <Twitter size={16} />
                        </Link>
                        <Link href="https://instagram.com" className="text-gray-500 hover:text-gray-700">
                            <Instagram size={16} />
                        </Link>
                    </div>

                    <Link href="/" className="flex-1 md:flex-none text-center md:text-left">
                        <h1 className="text-2xl font-bold text-gray-900">Aylin News</h1>
                    </Link>

                    <div className="flex items-center space-x-2">
                        {showSearch ? (
                            <div className="hidden md:block w-48">
                                <SearchBar onClose={() => setShowSearch(false)} />
                            </div>
                        ) : (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hidden md:flex"
                                onClick={() => setShowSearch(true)}
                            >
                                <Search size={20} />
                            </Button>
                        )}

                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                        >
                            {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
                        </Button>
                    </div>
                </div>

                {/* Navigation bar */}
                <Navbar
                    isActive={isActivePage}
                    pathname={pathname}
                    showMobileMenu={showMobileMenu}
                />

                {/* Mobile search */}
                {showMobileMenu && (
                    <div className="mb-4 md:hidden">
                        <SearchBar />
                    </div>
                )}
            </div>
        </header>
    );
}
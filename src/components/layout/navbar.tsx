"use client";

import Link from 'next/link';
import { cn, getCategories, formatCategoryName } from '@/lib/utils';

interface NavbarProps {
    isActive: (currentPath: string, linkPath: string) => boolean;
    pathname: string;
    showMobileMenu?: boolean;
}

export default function Navbar({ isActive, pathname, showMobileMenu = false }: NavbarProps) {
    const categories = getCategories();

    const navItems = [
        { href: '/', label: 'HOME' },
        ...categories.map(category => ({
            href: `/category/${category}`,
            label: formatCategoryName(category).toUpperCase(),
        })),
        { href: '/about', label: 'ABOUT' }
    ];

    return (
        <nav className={cn(
            "hidden md:flex py-4 space-x-6 overflow-x-auto",
            showMobileMenu && "flex flex-col space-x-0 space-y-2 py-2"
        )}>
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        "text-sm font-medium whitespace-nowrap transition-colors hover:text-gray-900",
                        isActive(pathname, item.href)
                            ? "text-gray-900 font-bold"
                            : "text-gray-500"
                    )}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    );
}
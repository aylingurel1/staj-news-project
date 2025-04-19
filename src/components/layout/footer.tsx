import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { getCategories, formatCategoryName } from '@/lib/utils';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const categories = getCategories();

    return (
        <footer className="bg-white border-t border-gray-100 pt-12 pb-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">About Us</h3>
                        <p className="text-gray-600 mb-4">
                            Aylin News is a modern news platform bringing you the latest updates across various categories.
                            Our mission is to provide accurate, timely, and relevant news to our readers.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="https://facebook.com" className="text-gray-500 hover:text-gray-900">
                                <Facebook size={20} />
                            </Link>
                            <Link href="https://twitter.com" className="text-gray-500 hover:text-gray-900">
                                <Twitter size={20} />
                            </Link>
                            <Link href="https://instagram.com" className="text-gray-500 hover:text-gray-900">
                                <Instagram size={20} />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Categories</h3>
                        <ul className="space-y-2">
                            {categories.map((category) => (
                                <li key={category}>
                                    <Link
                                        href={`/category/${category}`}
                                        className="text-gray-600 hover:text-gray-900"
                                    >
                                        {formatCategoryName(category)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-6 text-center">
                    <p className="text-gray-600 text-sm">
                        Copyright &copy; {currentYear} All rights reserved | Made with ❤️ by Aylin Gürel
                    </p>
                </div>
            </div>
        </footer>
    );
}
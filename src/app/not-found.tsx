import Link from 'next/link';
import { HomeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-8">Page Not Found</h2>
            <p className="text-gray-500 max-w-md mb-8">
                The page you are looking for doesn't exist or has been moved.
            </p>
            <Button asChild>
                <Link href="/" className="flex items-center gap-2">
                    <HomeIcon size={16} />
                    <span>Back to Home</span>
                </Link>
            </Button>
        </div>
    );
}

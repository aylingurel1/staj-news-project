"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowUp, ArrowDown, Calendar, Filter, Globe, Server, Link } from 'lucide-react';
import { 
  Card, 
  CardHeader,
  CardTitle, 
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getCategories, formatCategoryName, getAvailableLanguages } from '@/lib/utils';
import { NewsSortBy } from '@/types';

interface CategoryFilterProps {
  currentCategory: string;
}

export default function CategoryFilter({ currentCategory }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categories = getCategories();
  const languages = getAvailableLanguages();
  
  const [isOpen, setIsOpen] = useState(false);
  
  const q = searchParams.get('q') || '';
  const sortBy = searchParams.get('sortBy') || 'publishedAt';
  const order = searchParams.get('order') || 'desc';
  const fromDate = searchParams.get('from') || '';
  const toDate = searchParams.get('to') || '';
  const language = searchParams.get('language') || 'en';
  const domains = searchParams.get('domains') || '';
  const sources = searchParams.get('sources') || '';
  
  const [searchQuery, setSearchQuery] = useState(q);
  const [selectedSortBy, setSelectedSortBy] = useState<NewsSortBy>(sortBy as NewsSortBy);
  const [selectedOrder, setSelectedOrder] = useState(order);
  const [startDate, setStartDate] = useState(fromDate);
  const [endDate, setEndDate] = useState(toDate);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [domainsList, setDomainsList] = useState(domains);
  const [sourcesList, setSourcesList] = useState(sources);
  
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim());
    } else {
      params.delete('q');
    }
    
    if (selectedSortBy) params.set('sortBy', selectedSortBy);
    if (selectedOrder) params.set('order', selectedOrder);
    
    if (startDate) params.set('from', startDate);
    else params.delete('from');
    
    if (endDate) params.set('to', endDate);
    else params.delete('to');
    
    if (selectedLanguage) params.set('language', selectedLanguage);
    else params.delete('language');
    
    if (domainsList) params.set('domains', domainsList);
    else params.delete('domains');
    
    if (sourcesList) params.set('sources', sourcesList);
    else params.delete('sources');
    
    params.set('page', '1');
    
    router.push(`/category/${currentCategory}?${params.toString()}`);
  };
  
  const resetFilters = () => {
    router.push(`/category/${currentCategory}`);
  };
  
  const toggleOrder = () => {
    const newOrder = selectedOrder === 'desc' ? 'asc' : 'desc';
    setSelectedOrder(newOrder);
  };

  return (
    <>
      {/* Mobile filter toggle */}
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            <Filter size={16} />
            <span>Filters</span>
          </div>
          {isOpen ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
        </Button>
      </div>
      
      <Card className={`md:block ${isOpen ? 'block' : 'hidden'}`}>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Keyword search */}
          <div className="space-y-2">
            <Label htmlFor="keyword">Keywords</Label>
            <Input
              id="keyword"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search within this category..."
            />
            <p className="text-xs text-gray-500">
              Use quotes for exact match, + for required words, - for excluded words
            </p>
          </div>
          
          {/* Categories */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Category</Label>
            <Select
              value={currentCategory}
              onValueChange={(value) => {
                router.push(`/category/${value}`);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {formatCategoryName(category)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Sort by */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Sort by</Label>
            <div className="flex items-center gap-2">
              <Select
                value={selectedSortBy}
                onValueChange={(value) => setSelectedSortBy(value as NewsSortBy)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="publishedAt">Date</SelectItem>
                  <SelectItem value="relevancy">Relevance</SelectItem>
                  <SelectItem value="popularity">Popularity</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="icon"
                onClick={toggleOrder}
                className="flex-shrink-0"
              >
                {selectedOrder === 'desc' ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
              </Button>
            </div>
          </div>
          
          <Accordion type="single" collapsible>
            <AccordionItem value="advanced">
              <AccordionTrigger>Advanced Filters</AccordionTrigger>
              <AccordionContent>
                {/* Date range */}
                <div className="space-y-2 mt-4">
                  <Label className="text-sm font-medium">Date range</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-500" />
                      <Input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full"
                        placeholder="From date"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-500" />
                      <Input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full"
                        placeholder="To date"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Language */}
                <div className="space-y-2 mt-4">
                  <Label className="text-sm font-medium">Language</Label>
                  <div className="flex items-center gap-2">
                    <Globe size={16} className="text-gray-500" />
                    <Select
                      value={selectedLanguage}
                      onValueChange={setSelectedLanguage}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Sources */}
                <div className="space-y-2 mt-4">
                  <Label className="text-sm font-medium">News Sources</Label>
                  <div className="flex items-center gap-2">
                    <Server size={16} className="text-gray-500" />
                    <Input
                      value={sourcesList}
                      onChange={(e) => setSourcesList(e.target.value)}
                      className="w-full"
                      placeholder="e.g., bbc-news,cnn (comma-separated)"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Comma-separated list of source IDs (max 20)
                  </p>
                </div>
                
                {/* Domains */}
                <div className="space-y-2 mt-4">
                  <Label className="text-sm font-medium">Domains</Label>
                  <div className="flex items-center gap-2">
                    <Link size={16} className="text-gray-500" />
                    <Input
                      value={domainsList}
                      onChange={(e) => setDomainsList(e.target.value)}
                      className="w-full"
                      placeholder="e.g., bbc.co.uk,cnn.com (comma-separated)"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          {/* Reset button */}
          <Button
            variant="outline"
            onClick={resetFilters}
          >
            Reset Filters
          </Button>
          
          <Button onClick={applyFilters}>
            Apply Filters
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { categories, type SiteCategory } from '../data/sites';

interface FilterBarProps {
  activeCategory: SiteCategory | 'all';
  onCategoryChange: (category: SiteCategory | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount: number;
}

export default function FilterBar({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  resultCount,
}: FilterBarProps) {
  return (
    <div className="sticky top-16 z-40 bg-base/80 backdrop-blur-md border-b border-border-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Category filters */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => onCategoryChange(cat.key)}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
                    isActive
                      ? 'text-accent border-accent bg-accent/10'
                      : 'text-secondary border-border-default bg-card hover:border-border-hover hover:text-primary'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 rounded-full bg-accent/10 border border-accent"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                  <span
                    className={`relative z-10 ml-1.5 text-xs ${
                      isActive ? 'text-accent/70' : 'text-muted'
                    }`}
                  >
                    {cat.key === 'all' ? resultCount : ''}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search input */}
          <div className="relative w-full sm:w-64 sm:ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="搜索平台..."
              className="w-full h-10 pl-10 pr-4 bg-input border border-border-default rounded-lg text-sm text-primary placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

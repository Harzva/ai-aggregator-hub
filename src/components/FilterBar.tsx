import { Search, ArrowUpDown, Flame, Star } from 'lucide-react';
import { categories, type SiteCategory } from '../data/sites';

type SortKey = 'rating' | 'installs' | 'name';

interface FilterBarProps {
  activeCategory: SiteCategory | 'all';
  onCategoryChange: (category: SiteCategory | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount: number;
  totalCount: number;
  activeSort: SortKey;
  onSortChange: (sort: SortKey) => void;
}

const sortOptions: { key: SortKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'rating', label: '评分', icon: Star },
  { key: 'installs', label: '热度', icon: Flame },
  { key: 'name', label: '名称', icon: ArrowUpDown },
];

export default function FilterBar({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  resultCount,
  totalCount,
  activeSort,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Sub-category pills */}
        <div className="flex items-center gap-2 mb-3 overflow-x-auto scrollbar-hide pb-1">
          <span className="text-xs text-muted font-medium whitespace-nowrap mr-1">子分类:</span>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => onCategoryChange(cat.key)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition-all duration-200 ${
                  isActive
                    ? 'bg-accent text-white border-accent shadow-sm'
                    : 'bg-surface text-secondary border-border hover:border-border-hover hover:bg-bg'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search + Stats + Sort */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20">
              {resultCount} / {totalCount} 平台
            </span>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="搜索平台..."
                className="w-48 h-9 pl-9 pr-4 bg-bg border border-border rounded-full text-sm text-primary placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {sortOptions.map((opt) => {
              const isActive = activeSort === opt.key;
              return (
                <button
                  key={opt.key}
                  onClick={() => onSortChange(opt.key)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    isActive
                      ? 'bg-accent/10 text-accent border-accent/30'
                      : 'bg-surface text-secondary border-border hover:border-border-hover'
                  }`}
                >
                  <opt.icon className="w-3.5 h-3.5" />
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

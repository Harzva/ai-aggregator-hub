import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Zap } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const topNavItems = [
  { label: 'AI中转站', color: '#f97316', bg: '#fff7ed' },
  { label: '聚合平台', color: '#22c55e', bg: '#f0fdf4' },
  { label: '纯度检测', color: '#3b82f6', bg: '#eff6ff' },
  { label: '开源工具', color: '#ec4899', bg: '#fdf2f8' },
  { label: 'API教程', color: '#a855f7', bg: '#faf5ff' },
];

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50">
      {/* Top colorful nav bar */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {topNavItems.map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap cursor-default"
                style={{ color: item.color, backgroundColor: item.bg }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className={`bg-surface/95 backdrop-blur-md border-b border-border transition-shadow ${scrolled ? 'shadow-sm' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-sm">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="text-lg font-bold text-primary tracking-tight">AI Hub</span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium text-white bg-accent">
              <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
              热榜
            </span>
          </div>

          <div className="flex items-center gap-2">
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      placeholder="搜索平台..."
                      className="w-full h-9 pl-9 pr-8 bg-bg border border-border rounded-full text-sm text-primary placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
                      autoFocus
                    />
                    {searchQuery && (
                      <button onClick={() => onSearchChange('')} className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-border transition-colors">
                        <X className="w-3.5 h-3.5 text-muted" />
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button onClick={() => setIsExpanded(!isExpanded)} className="p-2 rounded-full hover:bg-border/50 transition-colors">
              <Search className="w-5 h-5 text-secondary" />
            </button>

            <a
              href="https://github.com/harzva/ai-aggregator-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 h-9 px-4 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors shadow-sm"
            >
              <span className="text-base leading-none">+</span>
              提交
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}

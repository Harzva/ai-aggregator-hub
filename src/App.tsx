import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchX } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import SiteCard from './components/SiteCard';
import SiteModal from './components/SiteModal';
import Footer from './components/Footer';
import { sites, getSitesByCategory, searchSites, type SiteCategory, type Site } from './data/sites';

type SortKey = 'rating' | 'installs' | 'name';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<SiteCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSort, setActiveSort] = useState<SortKey>('rating');
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);

  const filteredSites = useMemo(() => {
    let result = sites;
    if (activeCategory !== 'all') {
      result = getSitesByCategory(activeCategory);
    }
    if (searchQuery.trim()) {
      result = searchSites(searchQuery);
      if (activeCategory !== 'all') {
        result = result.filter((s) => s.category === activeCategory);
      }
    }
    // Sort
    result = [...result].sort((a, b) => {
      if (activeSort === 'rating') return b.rating - a.rating;
      if (activeSort === 'installs') {
        const parse = (s: string) => parseFloat(s.replace('K', '000')) || 0;
        return parse(b.installs) - parse(a.installs);
      }
      return a.name.localeCompare(b.name, 'zh-CN');
    });
    return result;
  }, [activeCategory, searchQuery, activeSort]);

  return (
    <div className="min-h-[100dvh] bg-bg text-primary">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <Hero />

      <FilterBar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        resultCount={filteredSites.length}
        totalCount={sites.length}
        activeSort={activeSort}
        onSortChange={setActiveSort}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AnimatePresence mode="wait">
          {filteredSites.length > 0 ? (
            <motion.div
              key={`${activeCategory}-${searchQuery}-${activeSort}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              <AnimatePresence>
                {filteredSites.map((site, index) => (
                  <SiteCard
                    key={site.id}
                    site={site}
                    index={index}
                    onClick={() => setSelectedSite(site)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center mb-4">
                <SearchX className="w-8 h-8 text-muted" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">未找到匹配平台</h3>
              <p className="text-sm text-muted max-w-md">尝试更换关键词或切换分类，看看其他平台是否有你需要的。</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
      <SiteModal site={selectedSite} onClose={() => setSelectedSite(null)} />
    </div>
  );
}

import { motion } from 'framer-motion';
import { Star, ExternalLink, Copy, Download } from 'lucide-react';
import type { Site } from '../data/sites';
import { getThumbnailUrl } from '../data/sites';

const categoryTagStyles: Record<string, string> = {
  detector: 'bg-green-50 text-green-600 border-green-200',
  aggregator: 'bg-amber-50 text-amber-600 border-amber-200',
  relay: 'bg-blue-50 text-blue-600 border-blue-200',
  opensource: 'bg-purple-50 text-purple-600 border-purple-200',
};

const categoryLabels: Record<string, string> = {
  detector: '纯度检测',
  aggregator: '聚合平台',
  relay: '中转站',
  opensource: '开源工具',
};

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      <span className="text-sm font-bold text-primary">{rating}</span>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < fullStars
                ? 'text-yellow-400 fill-yellow-400'
                : i === fullStars && hasHalf
                ? 'text-yellow-400 fill-yellow-400/50'
                : 'text-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

interface SiteCardProps {
  site: Site;
  index: number;
  onClick: () => void;
}

export default function SiteCard({ site, index, onClick }: SiteCardProps) {
  const thumbnailUrl = getThumbnailUrl(site.url);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, delay: index * 0.02, ease: 'easeOut' }}
      layout
      onClick={onClick}
      className="group relative bg-surface border border-border rounded-2xl cursor-pointer overflow-hidden
        transition-all duration-200 ease-out
        hover:shadow-lg hover:shadow-black/5 hover:border-border-hover hover:-translate-y-0.5
        focus:outline-none focus:ring-2 focus:ring-accent/30"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {/* Website thumbnail image - just-ddl style */}
      <div className="relative shrink-0 overflow-hidden border-b border-border bg-slate-900 block h-40 w-full">
        <img
          src={thumbnailUrl}
          alt={site.name}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // Fallback to gradient on error
            (e.target as HTMLImageElement).style.display = 'none';
            const parent = (e.target as HTMLImageElement).parentElement;
            if (parent) {
              parent.style.background = site.bannerColor;
              parent.style.display = 'flex';
              parent.style.alignItems = 'center';
              parent.style.justifyContent = 'center';
            }
          }}
        />
        {/* Category badge on image */}
        <div className="absolute top-2.5 left-2.5">
          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${categoryTagStyles[site.category]}`}>
            {categoryLabels[site.category]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-base font-bold text-primary mb-1 group-hover:text-accent transition-colors">
          {site.name}
        </h3>

        {/* URL hint */}
        <p className="text-xs text-muted mb-2 truncate">
          {site.url.replace(/^https?:\/\//, '')}
        </p>

        {/* Description */}
        <p className="text-xs text-secondary leading-relaxed line-clamp-2 mb-3">
          {site.description}
        </p>

        {/* Divider */}
        <div className="border-t border-border/60 mb-2" />

        {/* Bottom: rating + installs */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StarRating rating={site.rating} />
            <span className="text-xs text-muted">
              ({Math.round(parseFloat(site.installs.replace('K', '')) * 10)})
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="flex items-center gap-0.5">
              <Download className="w-3 h-3" />
              {site.installs}
            </span>
          </div>
        </div>

        {/* Hover action buttons */}
        <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium hover:bg-accent hover:text-white transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            访问
          </a>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(site.url);
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-bg text-secondary text-xs font-medium hover:bg-border transition-colors"
          >
            <Copy className="w-3 h-3" />
            复制
          </button>
        </div>
      </div>
    </motion.div>
  );
}

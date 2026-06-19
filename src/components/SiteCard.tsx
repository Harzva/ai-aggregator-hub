import { motion } from 'framer-motion';
import { Star, ExternalLink, Copy, Download } from 'lucide-react';
import { useState } from 'react';
import type { Site } from '../data/sites';

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

function getAvatarColor(id: string): { bg: string; text: string } {
  const colors = [
    { bg: 'bg-orange-100', text: 'text-orange-600' },
    { bg: 'bg-blue-100', text: 'text-blue-600' },
    { bg: 'bg-green-100', text: 'text-green-600' },
    { bg: 'bg-purple-100', text: 'text-purple-600' },
    { bg: 'bg-pink-100', text: 'text-pink-600' },
    { bg: 'bg-teal-100', text: 'text-teal-600' },
    { bg: 'bg-indigo-100', text: 'text-indigo-600' },
    { bg: 'bg-red-100', text: 'text-red-600' },
    { bg: 'bg-yellow-100', text: 'text-yellow-600' },
    { bg: 'bg-cyan-100', text: 'text-cyan-600' },
    { bg: 'bg-lime-100', text: 'text-lime-600' },
    { bg: 'bg-sky-100', text: 'text-sky-600' },
  ];
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

function getScreenshotUrl(url: string): string {
  return `https://image.thum.io/get/width/400/crop/600/${encodeURIComponent(url)}`;
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      <span className="text-sm font-bold text-slate-900">{rating}</span>
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

function CardBanner({ site }: { site: Site }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const avatarColor = getAvatarColor(site.id);
  const firstChar = site.name[0] || '?';
  const screenshotUrl = getScreenshotUrl(site.url);

  // If screenshot failed, show letter avatar
  if (imgError) {
    return (
      <div className={`relative h-36 w-full flex items-center justify-center ${avatarColor.bg}`}>
        <span className={`text-5xl font-black ${avatarColor.text} select-none`}>
          {firstChar}
        </span>
        <div className="absolute top-2.5 left-2.5">
          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm bg-white/80 backdrop-blur-sm ${categoryTagStyles[site.category]}`}>
            {categoryLabels[site.category]}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-36 w-full overflow-hidden bg-slate-100">
      {/* Letter avatar as fallback (shown behind screenshot) */}
      <div className={`absolute inset-0 flex items-center justify-center ${avatarColor.bg}`}>
        <span className={`text-5xl font-black ${avatarColor.text} select-none`}>
          {firstChar}
        </span>
      </div>

      {/* Screenshot image */}
      <img
        src={screenshotUrl}
        alt={site.name}
        loading="lazy"
        className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 ${
          imgLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setImgLoaded(true)}
        onError={() => setImgError(true)}
      />

      {/* Category badge */}
      <div className="absolute top-2.5 left-2.5 z-10">
        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm bg-white/80 backdrop-blur-sm ${categoryTagStyles[site.category]}`}>
          {categoryLabels[site.category]}
        </span>
      </div>
    </div>
  );
}

export default function SiteCard({ site, index, onClick }: SiteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, delay: index * 0.015, ease: 'easeOut' }}
      layout
      onClick={onClick}
      className="group relative bg-white border border-slate-200 rounded-2xl cursor-pointer overflow-hidden
        transition-all duration-200 ease-out
        hover:shadow-lg hover:shadow-black/5 hover:border-slate-300 hover:-translate-y-0.5
        focus:outline-none focus:ring-2 focus:ring-orange-400/30"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <CardBanner site={site} />

      {/* Content */}
      <div className="p-4">
        <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-orange-500 transition-colors">
          {site.name}
        </h3>
        <p className="text-xs text-slate-400 mb-2 truncate">{site.url.replace(/^https?:\/\//, '')}</p>
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-3">
          {site.description}
        </p>
        <div className="border-t border-slate-100 mb-2" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StarRating rating={site.rating} />
            <span className="text-xs text-slate-400">({Math.round(parseFloat(site.installs.replace('K', '')) * 10)})</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-0.5">
              <Download className="w-3 h-3" />
              {site.installs}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 text-orange-500 text-xs font-medium hover:bg-orange-500 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            访问
          </a>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(site.url);
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-50 text-slate-500 text-xs font-medium hover:bg-slate-200 transition-colors"
          >
            <Copy className="w-3 h-3" />
            复制
          </button>
        </div>
      </div>
    </motion.div>
  );
}

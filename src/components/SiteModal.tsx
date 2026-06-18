import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Copy, Check, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Site } from '../data/sites';

const categoryLabels: Record<string, string> = {
  detector: '纯度检测',
  aggregator: '聚合平台',
  relay: '中转站',
  opensource: '开源工具',
};

const categoryColors: Record<string, string> = {
  detector: '#22c55e',
  aggregator: '#f59e0b',
  relay: '#3b82f6',
  opensource: '#a855f7',
};

interface SiteModalProps {
  site: Site | null;
  onClose: () => void;
}

export default function SiteModal({ site, onClose }: SiteModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (site) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [site]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleCopy = async () => {
    if (!site) return;
    await navigator.clipboard.writeText(site.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {site && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-overlay backdrop-blur-sm" />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-card border border-border-default rounded-2xl p-6 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-card-hover transition-colors"
            >
              <X className="w-5 h-5 text-muted" />
            </button>

            {/* Header */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs px-2.5 py-0.5 rounded-full border"
                  style={{
                    color: categoryColors[site.category],
                    borderColor: `${categoryColors[site.category]}30`,
                    backgroundColor: `${categoryColors[site.category]}15`,
                  }}
                >
                  {categoryLabels[site.category]}
                </span>
                <span className={`w-2 h-2 rounded-full ${site.status === 'online' ? 'bg-status-online' : site.status === 'warning' ? 'bg-status-warn' : 'bg-status-danger'}`} />
              </div>
              <h2 className="text-2xl font-bold text-primary">{site.name}</h2>
            </div>

            {/* URL */}
            <div className="mb-4 p-3 bg-input rounded-lg">
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-num text-sm text-accent hover:underline break-all"
              >
                {site.url}
              </a>
            </div>

            {/* Description */}
            <p className="text-sm text-secondary leading-relaxed mb-4">
              {site.description}
            </p>

            {/* Tags */}
            <div className="mb-6">
              <div className="flex items-center gap-1.5 mb-2">
                <Tag className="w-3.5 h-3.5 text-muted" />
                <span className="text-xs text-muted uppercase tracking-wider">标签</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {site.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-input text-secondary border border-border-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-gradient-to-r from-accent to-accent-orange text-white font-medium text-sm hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="w-4 h-4" />
                访问网站
              </a>
              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-input border border-border-default text-secondary font-medium text-sm hover:bg-card-hover transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-status-online" />
                    <span className="text-status-online">已复制</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    复制URL
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

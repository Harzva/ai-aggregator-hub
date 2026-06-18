import { motion } from 'framer-motion';
import {
  Activity, BarChart3, Radar, Stethoscope, Trophy, CheckCircle, Gauge, MapPin,
  Globe, Layers, Building2, Zap, Grid3x3, GitBranch, Workflow, Cloud, Wallet,
  Shuffle, Box, Sparkles, Cpu, Flame, Coins, Crown, CloudFog, Database, Receipt,
  Terminal, MessageCircle, Hexagon, Phone, Rocket, Link, Star, Paintbrush, Bot,
  Bone, DollarSign, Server, Shield, Code2, GitCommit, BookOpen, Store, TrendingDown,
  Car, Target, Gift,
} from 'lucide-react';
import type { Site } from '../data/sites';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Activity, BarChart3, Radar, Stethoscope, Trophy, CheckCircle, Gauge, MapPin,
  Globe, Layers, Building2, Zap, Grid3x3, GitBranch, Workflow, Cloud, Wallet,
  Shuffle, Box, Sparkles, Cpu, Flame, Coins, Crown, CloudFog, Database, Receipt,
  Terminal, MessageCircle, Hexagon, Phone, Rocket, Link, Star, Paintbrush, Bot,
  Bone, DollarSign, Server, Shield, Code2, GitCommit, BookOpen, Store, TrendingDown,
  Car, Target, Gift,
};

const categoryTagStyles: Record<string, string> = {
  detector: 'bg-green-500/10 text-green-400 border-green-500/20',
  aggregator: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  relay: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  opensource: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

const categoryLabels: Record<string, string> = {
  detector: '纯度检测',
  aggregator: '聚合平台',
  relay: '中转站',
  opensource: '开源工具',
};

interface SiteCardProps {
  site: Site;
  index: number;
  onClick: () => void;
}

export default function SiteCard({ site, index, onClick }: SiteCardProps) {
  const IconComponent = iconMap[site.icon] || Globe;
  const statusColor = site.status === 'online' ? 'bg-status-online' : site.status === 'warning' ? 'bg-status-warn' : 'bg-status-danger';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.03, ease: 'easeOut' }}
      layout
      onClick={onClick}
      className="group relative h-40 bg-card border border-border-default rounded-xl p-5 cursor-pointer
        transition-all duration-300 ease-out
        hover:bg-card-hover hover:border-border-hover hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20
        focus:outline-none focus:ring-2 focus:ring-accent/50"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {/* Top row: name + status */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-primary truncate pr-2 group-hover:text-accent transition-colors">
          {site.name}
        </h3>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className={`w-2.5 h-2.5 rounded-full ${statusColor} ${site.status === 'online' ? 'animate-pulse-slow' : ''}`} />
          <span className="text-xs text-muted capitalize">{site.status}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-secondary leading-relaxed line-clamp-2 mb-3">
        {site.description}
      </p>

      {/* Bottom: tags + icon */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`text-xs px-2 py-0.5 rounded-full border ${categoryTagStyles[site.category]}`}>
            {categoryLabels[site.category]}
          </span>
          {site.tags.slice(0, 1).map((tag) => (
            <span key={tag} className="text-xs text-muted px-1.5 py-0.5 rounded bg-input">
              {tag}
            </span>
          ))}
        </div>
        <div className="w-8 h-8 rounded-lg bg-input flex items-center justify-center group-hover:bg-accent/10 transition-colors">
          <IconComponent className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
        </div>
      </div>
    </motion.div>
  );
}

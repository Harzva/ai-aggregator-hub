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

// 基于 id 生成稳定颜色（HSL -> 低饱和度暖色）
function getColorFromId(id: string): { bg: string; border: string } {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  const bg = `hsl(${hue} 40% 18%)`;
  const border = `hsl(${hue} 50% 30%)`;
  return { bg, border };
}

interface SiteCardProps {
  site: Site;
  index: number;
  onClick: () => void;
}

export default function SiteCard({ site, index, onClick }: SiteCardProps) {
  const IconComponent = iconMap[site.icon] || Globe;
  const statusColor = site.status === 'online' ? 'bg-status-online' : site.status === 'warning' ? 'bg-status-warn' : 'bg-status-danger';
  const colors = getColorFromId(site.id);
  const firstChar = site.name[0] || '?';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.03, ease: 'easeOut' }}
      layout
      onClick={onClick}
      className="group relative bg-card border border-border-default rounded-xl cursor-pointer overflow-hidden
        transition-all duration-300 ease-out
        hover:bg-card-hover hover:border-border-hover hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20
        focus:outline-none focus:ring-2 focus:ring-accent/50"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {/* Color thumbnail bar */}
      <div
        className="h-10 flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: colors.bg, borderBottom: `1px solid ${colors.border}` }}
      >
        <span className="text-xl font-bold text-white/80 font-mono-num tracking-tight">
          {firstChar}
        </span>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Top row: name + status */}
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="text-sm font-semibold text-primary truncate pr-2 group-hover:text-accent transition-colors">
            {site.name}
          </h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className={`w-2 h-2 rounded-full ${statusColor} ${site.status === 'online' ? 'animate-pulse-slow' : ''}`} />
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-secondary leading-relaxed line-clamp-2 mb-3">
          {site.description}
        </p>

        {/* Bottom: tags + icon */}
        <div className="flex items-center justify-between">
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
          <div className="w-7 h-7 rounded-md bg-input flex items-center justify-center group-hover:bg-accent/10 transition-colors">
            <IconComponent className="w-3.5 h-3.5 text-muted group-hover:text-accent transition-colors" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

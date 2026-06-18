import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Globe, Zap, Clock, ChevronDown } from 'lucide-react';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-mono-num text-2xl font-bold text-accent">
      {count}{suffix}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative bg-teal-50/60 border-b border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex items-center gap-2 text-sm text-secondary mb-3 cursor-pointer hover:text-primary transition-colors"
          >
            <span className="text-lg">←</span>
            <span>返回首页</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-surface border-2 border-border flex items-center justify-center shadow-sm">
              <Globe className="w-7 h-7 text-accent" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
                AI聚合平台导航
              </h1>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm text-secondary leading-relaxed mb-3 max-w-xl"
          >
            「AI聚合平台」领域汇集中转站纯度检测、聚合平台、国内中转站与开源工具。帮你找到最适合的AI API接入方案。
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center gap-1 text-sm text-accent font-medium hover:text-accent-hover transition-colors"
          >
            展开更多
            <ChevronDown className="w-4 h-4" />
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {[
              { icon: Globe, value: 50, suffix: '+', label: '收录平台' },
              { icon: Zap, value: 4, suffix: '', label: '大分类' },
              { icon: Clock, value: 24, suffix: '/7', label: '持续更新' },
              { icon: Globe, value: 100, suffix: '%', label: '免费导航' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.25 + index * 0.08 }}
                className="flex flex-col items-center gap-1 p-3 rounded-xl bg-surface border border-border"
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <span className="text-xs text-muted">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

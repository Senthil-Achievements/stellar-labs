import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type HoverImageRevealProps = {
  children: React.ReactNode;
  revealContent: React.ReactNode;
  className?: string;
  revealClassName?: string;
};

export default function HoverImageReveal({
  children,
  revealContent,
  className = "",
  revealClassName = "",
}: HoverImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: (e.clientX - r.left) / r.width,
      y: (e.clientY - r.top) / r.height,
    });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMove}
      className={`group relative overflow-hidden ${className}`}
    >
      {children}

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ clipPath: "inset(100% 100% 100% 100% at 50% 50%)" }}
            animate={{ clipPath: "inset(-20% -20% -20% -20% at 50% 50%)" }}
            exit={{ clipPath: "inset(100% 100% 100% 100% at 50% 50%)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute inset-0 z-10 ${revealClassName}`}
            style={{
              transformOrigin: `${pos.x * 100}% ${pos.y * 100}%`,
            }}
          >
            {revealContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   SERVICE-SPECIFIC REVEAL VISUALS
   ============================================================ */

const SERVICE_VISUALS: Record<string, React.ReactNode> = {
  "AI Websites": (
    <div className="relative h-full w-full bg-gradient-to-br from-[#F5C76A]/20 via-[#1a1508] to-[#0a0a0a] p-5 flex flex-col justify-end">
      <div className="absolute inset-0 opacity-30">
        <svg viewBox="0 0 400 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="web-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F5C76A" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#F5C76A" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.rect x="40" y="30" width="140" height="90" rx="6" fill="url(#web-grad)" stroke="#F5C76A" strokeWidth="0.5" strokeOpacity="0.3"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} />
          <motion.rect x="220" y="30" width="140" height="40" rx="6" fill="url(#web-grad)" stroke="#F5C76A" strokeWidth="0.5" strokeOpacity="0.3"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} />
          <motion.rect x="220" y="80" width="140" height="40" rx="6" fill="url(#web-grad)" stroke="#F5C76A" strokeWidth="0.5" strokeOpacity="0.3"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} />
          <motion.rect x="40" y="140" width="320" height="50" rx="6" fill="url(#web-grad)" stroke="#F5C76A" strokeWidth="0.5" strokeOpacity="0.3"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} />
          <motion.rect x="40" y="210" width="100" height="30" rx="15" fill="#F5C76A" fillOpacity="0.15"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} />
        </svg>
      </div>
      <div className="relative z-10">
        <div className="text-[10px] uppercase tracking-wider text-[#F5C76A]/60 mb-1">Preview</div>
        <div className="text-xs text-white/40">Conversion-focused design</div>
      </div>
    </div>
  ),

  "Custom Web Apps": (
    <div className="relative h-full w-full bg-gradient-to-br from-[#F5C76A]/20 via-[#1a1508] to-[#0a0a0a] p-5 flex flex-col justify-end">
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <pre className="font-mono text-[9px] leading-[1.4] text-[#F5C76A]/50 p-4 select-none">
{`const app = createApp({
  router: tanstackRouter(),
  queryClient,
  modules: [auth, api, db],
});

app.mount("#root");`}
        </pre>
      </div>
      <div className="relative z-10">
        <div className="text-[10px] uppercase tracking-wider text-[#F5C76A]/60 mb-1">Stack</div>
        <div className="text-xs text-white/40">React · Next.js · TypeScript</div>
      </div>
    </div>
  ),

  "Flutter Mobile Apps": (
    <div className="relative h-full w-full bg-gradient-to-br from-[#F5C76A]/20 via-[#1a1508] to-[#0a0a0a] p-5 flex flex-col justify-end">
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <svg viewBox="0 0 120 200" className="h-36 w-auto" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="120" height="200" rx="16" fill="none" stroke="#F5C76A" strokeWidth="1" strokeOpacity="0.4" />
          <rect x="4" y="8" width="112" height="176" rx="12" fill="#F5C76A" fillOpacity="0.05" />
          <motion.circle cx="60" cy="192" r="4" fill="#F5C76A" fillOpacity="0.3"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} />
          <motion.rect x="16" y="24" width="88" height="12" rx="3" fill="#F5C76A" fillOpacity="0.12"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} />
          <motion.rect x="16" y="44" width="56" height="8" rx="2" fill="#F5C76A" fillOpacity="0.08"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} />
          <motion.rect x="16" y="60" width="88" height="60" rx="6" fill="#F5C76A" fillOpacity="0.06"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} />
          <motion.rect x="16" y="130" width="40" height="28" rx="6" fill="#F5C76A" fillOpacity="0.1"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} />
          <motion.rect x="64" y="130" width="40" height="28" rx="6" fill="#F5C76A" fillOpacity="0.1"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} />
        </svg>
      </div>
      <div className="relative z-10">
        <div className="text-[10px] uppercase tracking-wider text-[#F5C76A]/60 mb-1">Platform</div>
        <div className="text-xs text-white/40">Native-grade cross-platform UX</div>
      </div>
    </div>
  ),

  "AI Agents": (
    <div className="relative h-full w-full bg-gradient-to-br from-[#F5C76A]/20 via-[#1a1508] to-[#0a0a0a] p-5 flex flex-col justify-end">
      <div className="absolute inset-0 flex items-center justify-center opacity-25">
        <svg viewBox="0 0 200 200" className="h-36 w-auto" xmlns="http://www.w3.org/2000/svg">
          <motion.circle cx="100" cy="100" r="30" fill="none" stroke="#F5C76A" strokeWidth="1" strokeOpacity="0.5"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring" }} />
          <motion.circle cx="100" cy="100" r="50" fill="none" stroke="#F5C76A" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="4 4"
            initial={{ scale: 0, rotate: 0 }} animate={{ scale: 1, rotate: 360 }} transition={{ delay: 0.2, duration: 8, repeat: Infinity, ease: "linear" }} />
          <motion.circle cx="100" cy="100" r="70" fill="none" stroke="#F5C76A" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="2 6"
            initial={{ scale: 0, rotate: 0 }} animate={{ scale: 1, rotate: -360 }} transition={{ delay: 0.3, duration: 12, repeat: Infinity, ease: "linear" }} />
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <motion.circle key={deg} cx={100 + 50 * Math.cos((deg * Math.PI) / 180)} cy={100 + 50 * Math.sin((deg * Math.PI) / 180)} r="3" fill="#F5C76A" fillOpacity="0.4"
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 + i * 0.05 }} />
          ))}
          <motion.circle cx="100" cy="100" r="8" fill="#F5C76A" fillOpacity="0.3"
            initial={{ scale: 0 }} animate={{ scale: [1, 1.3, 1] }} transition={{ delay: 0.5, duration: 2, repeat: Infinity }} />
        </svg>
      </div>
      <div className="relative z-10">
        <div className="text-[10px] uppercase tracking-wider text-[#F5C76A]/60 mb-1">Autonomy</div>
        <div className="text-xs text-white/40">24/7 intelligent operation</div>
      </div>
    </div>
  ),

  "Workflow Automation": (
    <div className="relative h-full w-full bg-gradient-to-br from-[#F5C76A]/20 via-[#1a1508] to-[#0a0a0a] p-5 flex flex-col justify-end">
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <svg viewBox="0 0 240 120" className="w-48 h-auto" xmlns="http://www.w3.org/2000/svg">
          <motion.rect x="10" y="40" width="50" height="30" rx="6" fill="#F5C76A" fillOpacity="0.1" stroke="#F5C76A" strokeWidth="0.5" strokeOpacity="0.3"
            initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} />
          <motion.rect x="90" y="10" width="50" height="30" rx="6" fill="#F5C76A" fillOpacity="0.1" stroke="#F5C76A" strokeWidth="0.5" strokeOpacity="0.3"
            initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} />
          <motion.rect x="90" y="70" width="50" height="30" rx="6" fill="#F5C76A" fillOpacity="0.1" stroke="#F5C76A" strokeWidth="0.5" strokeOpacity="0.3"
            initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} />
          <motion.rect x="170" y="35" width="50" height="30" rx="6" fill="#F5C76A" fillOpacity="0.15" stroke="#F5C76A" strokeWidth="0.5" strokeOpacity="0.4"
            initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} />
          <motion.path d="M60,55 L90,25" stroke="#F5C76A" strokeWidth="0.8" strokeOpacity="0.3" fill="none"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.6 }} />
          <motion.path d="M60,55 L90,85" stroke="#F5C76A" strokeWidth="0.8" strokeOpacity="0.3" fill="none"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.6 }} />
          <motion.path d="M140,25 L170,50" stroke="#F5C76A" strokeWidth="0.8" strokeOpacity="0.3" fill="none"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 0.6 }} />
          <motion.path d="M140,85 L170,55" stroke="#F5C76A" strokeWidth="0.8" strokeOpacity="0.3" fill="none"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8, duration: 0.6 }} />
        </svg>
      </div>
      <div className="relative z-10">
        <div className="text-[10px] uppercase tracking-wider text-[#F5C76A]/60 mb-1">Pipeline</div>
        <div className="text-xs text-white/40">Automated end-to-end flows</div>
      </div>
    </div>
  ),

  "Business Systems": (
    <div className="relative h-full w-full bg-gradient-to-br from-[#F5C76A]/20 via-[#1a1508] to-[#0a0a0a] p-5 flex flex-col justify-end">
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <svg viewBox="0 0 200 160" className="w-44 h-auto" xmlns="http://www.w3.org/2000/svg">
          <motion.rect x="10" y="10" width="80" height="45" rx="6" fill="#F5C76A" fillOpacity="0.08" stroke="#F5C76A" strokeWidth="0.5" strokeOpacity="0.3"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }} />
          <motion.rect x="110" y="10" width="80" height="45" rx="6" fill="#F5C76A" fillOpacity="0.08" stroke="#F5C76A" strokeWidth="0.5" strokeOpacity="0.3"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} />
          <motion.rect x="10" y="65" width="180" height="30" rx="6" fill="#F5C76A" fillOpacity="0.06" stroke="#F5C76A" strokeWidth="0.5" strokeOpacity="0.3"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3 }} style={{ transformOrigin: "left" }} />
          <motion.rect x="10" y="105" width="55" height="40" rx="6" fill="#F5C76A" fillOpacity="0.1" stroke="#F5C76A" strokeWidth="0.5" strokeOpacity="0.3"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} />
          <motion.rect x="75" y="105" width="55" height="40" rx="6" fill="#F5C76A" fillOpacity="0.1" stroke="#F5C76A" strokeWidth="0.5" strokeOpacity="0.3"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} />
          <motion.rect x="140" y="105" width="50" height="40" rx="6" fill="#F5C76A" fillOpacity="0.1" stroke="#F5C76A" strokeWidth="0.5" strokeOpacity="0.3"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }} />
        </svg>
      </div>
      <div className="relative z-10">
        <div className="text-[10px] uppercase tracking-wider text-[#F5C76A]/60 mb-1">Dashboard</div>
        <div className="text-xs text-white/40">Internal tools that work</div>
      </div>
    </div>
  ),

  "AI Marketing Assets": (
    <div className="relative h-full w-full bg-gradient-to-br from-[#F5C76A]/20 via-[#1a1508] to-[#0a0a0a] p-5 flex flex-col justify-end">
      <div className="absolute inset-0 flex items-center justify-center opacity-25">
        <svg viewBox="0 0 180 180" className="h-36 w-auto" xmlns="http://www.w3.org/2000/svg">
          {[0, 72, 144, 216, 288].map((deg, i) => (
            <motion.polygon
              key={deg}
              points={`${90 + 50 * Math.cos(((deg - 90) * Math.PI) / 180)},${90 + 50 * Math.sin(((deg - 90) * Math.PI) / 180)} ${90 + 20 * Math.cos(((deg + 36 - 90) * Math.PI) / 180)},${90 + 20 * Math.sin(((deg + 36 - 90) * Math.PI) / 180)} ${90 + 50 * Math.cos(((deg + 72 - 90) * Math.PI) / 180)},${90 + 50 * Math.sin(((deg + 72 - 90) * Math.PI) / 180)}`}
              fill="#F5C76A"
              fillOpacity={0.04 + i * 0.02}
              stroke="#F5C76A"
              strokeWidth="0.5"
              strokeOpacity="0.3"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1 + i * 0.08, type: "spring" }}
              style={{ transformOrigin: "90px 90px" }}
            />
          ))}
          <motion.circle cx="90" cy="90" r="12" fill="#F5C76A" fillOpacity="0.15"
            initial={{ scale: 0 }} animate={{ scale: [1, 1.2, 1] }} transition={{ delay: 0.6, duration: 2, repeat: Infinity }} />
        </svg>
      </div>
      <div className="relative z-10">
        <div className="text-[10px] uppercase tracking-wider text-[#F5C76A]/60 mb-1">Creative</div>
        <div className="text-xs text-white/40">On-brand generative content</div>
      </div>
    </div>
  ),

  "Brand Identity": (
    <div className="relative h-full w-full bg-gradient-to-br from-[#F5C76A]/20 via-[#1a1508] to-[#0a0a0a] p-5 flex flex-col justify-end">
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <svg viewBox="0 0 180 180" className="h-36 w-auto" xmlns="http://www.w3.org/2000/svg">
          <motion.circle cx="70" cy="90" r="40" fill="none" stroke="#F5C76A" strokeWidth="1" strokeOpacity="0.3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2, duration: 1 }} />
          <motion.circle cx="110" cy="90" r="40" fill="none" stroke="#BBC779" strokeWidth="1" strokeOpacity="0.3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 1 }} />
          <motion.rect x="30" y="145" width="40" height="8" rx="2" fill="#F5C76A" fillOpacity="0.15"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6 }} style={{ transformOrigin: "left" }} />
          <motion.rect x="80" y="145" width="30" height="8" rx="2" fill="#BBC779" fillOpacity="0.12"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.7 }} style={{ transformOrigin: "left" }} />
          <motion.rect x="120" y="145" width="25" height="8" rx="2" fill="#8F5252" fillOpacity="0.12"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.8 }} style={{ transformOrigin: "left" }} />
        </svg>
      </div>
      <div className="relative z-10">
        <div className="text-[10px] uppercase tracking-wider text-[#F5C76A]/60 mb-1">System</div>
        <div className="text-xs text-white/40">Premium visual language</div>
      </div>
    </div>
  ),
};

export function getServiceVisual(serviceTitle: string): React.ReactNode {
  return SERVICE_VISUALS[serviceTitle] || null;
}

/* ============================================================
   UNIVERSAL GLOW REVEAL — works on any card
   ============================================================ */

export function GlowReveal({ intensity = 1 }: { intensity?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(245,199,106,${0.12 * intensity}), transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `linear-gradient(135deg, transparent 30%, rgba(245,199,106,${0.06 * intensity}) 50%, transparent 70%)`,
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5C76A]/30 to-transparent" />
    </div>
  );
}

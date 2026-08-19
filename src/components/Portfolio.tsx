import { Fragment, useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Link as RouterLink } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Zap,
  Code2,
  Boxes,
  Cloud,
  Database,
  Cpu,
  Wrench,
  LineChart,
  Rocket,
  Bot,
  Layers,
  Server,
  Gauge,
  Palette,
  Search,
  PenTool,
  Hammer,
  TestTube,
  Send,
  TrendingUp,
  Quote,
  MapPin,
  Terminal,
  Braces,
  ShieldCheck,
  Menu,
  X,
  CheckCircle2,
  Plus,
  Minus,
  Globe,
  Building2,
  Utensils,
  Hotel,
  Home,
  GraduationCap,
  Landmark,
  ShoppingBag,
  Factory,
  HeartPulse,
  Smartphone,
  Workflow,
  Brain,
  Sparkle,
} from "lucide-react";
import ShaderBackground from "./ShaderBackground";
import RisingLines from "./RisingLines";
import GlitterWrap from "./GlitterWrap";
import SmoothScroll from "./SmoothScroll";
import WelcomeLoader from "./WelcomeLoader";
import ThemeToggle from "./ThemeToggle";
import CoverflowCarousel from "./CoverflowCarousel";
import { useIsMobile } from "@/hooks/use-mobile";

/* ============================================================
   BRAND
   ============================================================ */

const BRAND = "THERUINS";
const TAGLINE = "The Birthplace of Tomorrow.";
const CONTACT_EMAIL = "hello@theruins.in";
const GITHUB_URL = "https://github.com/Senthil-Achievements";

/* ============================================================
   DATA
   ============================================================ */

const MARQUEE_WORDS = [
  "AI Startup Studio",
  "Software Engineering",
  "AI Automation",
  "Growth Infrastructure",
  "Global Delivery",
  "Product Design",
];

const SERVICES = [
  {
    icon: Globe,
    title: "AI Websites",
    desc: "Conversion-focused sites with intelligent content, search, and lead capture built in.",
  },
  {
    icon: Code2,
    title: "Custom Web Apps",
    desc: "Full-stack platforms — React, Next.js, TypeScript — engineered to scale from day one.",
  },
  {
    icon: Smartphone,
    title: "Flutter Mobile Apps",
    desc: "Cross-platform mobile products with a single codebase and native-grade UX.",
  },
  {
    icon: Bot,
    title: "AI Agents",
    desc: "Autonomous agents that book, respond, qualify, and operate 24/7 across your channels.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    desc: "n8n and Make pipelines that remove repetitive work from every corner of the business.",
  },
  {
    icon: Boxes,
    title: "Business Systems",
    desc: "CRM, dashboards, admin panels, and internal tools — designed around how you actually work.",
  },
  {
    icon: Sparkle,
    title: "AI Marketing Assets",
    desc: "On-brand creative, content, and campaign systems powered by modern generative models.",
  },
  {
    icon: Palette,
    title: "Brand Identity",
    desc: "Logo, visual system, and brand guidelines built to look premium across every surface.",
  },
];

const PROCESS = [
  {
    icon: Search,
    title: "Discovery",
    desc: "Understand the business, the customer, and the metric that matters most.",
  },
  {
    icon: PenTool,
    title: "Strategy",
    desc: "Frame the problem, choose the right stack, and set an honest shipping plan.",
  },
  {
    icon: Palette,
    title: "Design",
    desc: "Craft the interface, motion, and brand feel — pixel-precise from the start.",
  },
  {
    icon: Hammer,
    title: "Development",
    desc: "Ship in small, reviewable increments with weekly demos and a live staging URL.",
  },
  {
    icon: Send,
    title: "Launch",
    desc: "Zero-downtime deploys, monitoring, analytics, and a rollback path from day one.",
  },
  {
    icon: TrendingUp,
    title: "Scale",
    desc: "Iterate on real usage data, expand features, and grow the infrastructure as demand rises.",
  },
];

type Project = {
  id: string;
  name: string;
  tagline: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  stack: string[];
  outcomes: string[];
  tag: string;
  repo: string;
  demo?: string;
};

const PROJECTS: Project[] = [
  {
    id: "bloodlink",
    name: "BloodLink",
    tagline: "A Next.js platform connecting blood donors with people in need.",
    overview:
      "A donor discovery platform where verified donors register by blood group and location, so requesters can find a match in minutes instead of chasing WhatsApp forwards.",
    problem:
      "Emergency blood requests rely on fragmented chat groups with stale contacts and no real-time visibility.",
    solution:
      "A Next.js App Router platform with location + blood-group search, donor profiles, and instant request routing.",
    features: [
      "Donor registration",
      "Blood-group + location search",
      "Request routing",
      "Verified donor profiles",
      "Mobile-first UX",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    outcomes: [
      "Faster donor-to-requester matching",
      "Structured donor database",
      "Deployed and publicly accessible",
    ],
    tag: "HealthTech",
    repo: "https://github.com/Jamseer811/blood",
  },
  {
    id: "faculty-mark-register",
    name: "Faculty Mark Register",
    tagline: "A digital mark register for faculty to manage student assessments.",
    overview:
      "A web app that replaces paper mark sheets — faculty enter, edit, and export student marks per subject and assessment, with clean role-based access.",
    problem:
      "Colleges still track internal marks on spreadsheets and paper — error-prone, hard to audit, and slow to consolidate.",
    solution:
      "A structured web app with faculty auth, subject-wise mark entry, and export-ready records for administration.",
    features: [
      "Faculty authentication",
      "Subject-wise mark entry",
      "Assessment tracking",
      "Export-ready records",
      "Role-based access",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB"],
    outcomes: [
      "Removed paper-based tracking",
      "Faster consolidation of internal marks",
      "Auditable history per student",
    ],
    tag: "EdTech",
    repo: "https://github.com/Senthil-Achievements/faculty-mark-register",
  },
  {
    id: "meeting-stack",
    name: "MeetingStack",
    tagline: "An organized workspace for meeting notes, actions, and follow-ups.",
    overview:
      "A productivity tool that captures meeting notes, decisions, and action items in one structured stack — so nothing important gets lost between calls.",
    problem:
      "Meeting notes end up scattered across Notion pages, Google Docs, and Slack — with action items rarely followed through.",
    solution:
      "A single workspace to log meetings, tag decisions, assign owners to actions, and track follow-through over time.",
    features: [
      "Structured meeting notes",
      "Action item tracking",
      "Decision log",
      "Owner assignment",
      "Search across meetings",
    ],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    outcomes: [
      "Centralized meeting history",
      "Clear ownership of action items",
      "Better follow-through between calls",
    ],
    tag: "Productivity",
    repo: "https://github.com/Senthil-Achievements/meeting-stack",
  },
  {
    id: "resumescan-ats",
    name: "ResumeScan — ATS Checker",
    tagline: "A live tool that scores resumes against job descriptions like an ATS.",
    overview:
      "A web app where candidates upload a resume and paste a job description to get an instant ATS-style match score with actionable feedback on missing keywords, formatting issues, and role fit.",
    problem:
      "Candidates keep getting filtered out by ATS systems without ever knowing why their resume didn't match the role.",
    solution:
      "A fast, no-login web tool that parses the resume, compares it against the JD, and returns a score plus concrete suggestions to improve the match.",
    features: [
      "Resume upload",
      "JD paste + parse",
      "ATS match score",
      "Keyword gap analysis",
      "Actionable suggestions",
    ],
    stack: ["React", "Vite", "TypeScript", "Netlify"],
    outcomes: [
      "Live and usable by real candidates",
      "Instant, explainable scoring",
      "Zero-friction — no signup required",
    ],
    tag: "AI / HR Tech",
    repo: "https://resumescanatschecker.netlify.app/",
    demo: "https://resumescanatschecker.netlify.app/",
  },
  {
    id: "vastra",
    name: "Vastra & Co.",
    tagline: "A modern e-commerce storefront for a fashion brand.",
    overview:
      "A storefront for a fashion label with a curated catalog, product detail pages, cart, and a design system that matches the brand's premium positioning.",
    problem:
      "The brand needed a storefront that felt premium — not a generic template — and could grow into a full commerce stack.",
    solution:
      "A custom web storefront with a clean catalog, product pages, cart flow, and a scalable component system for future features.",
    features: [
      "Product catalog",
      "Product detail pages",
      "Cart flow",
      "Responsive design system",
      "Ready for payments integration",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    outcomes: [
      "Premium brand-aligned storefront",
      "Reusable component library",
      "Foundation for full commerce features",
    ],
    tag: "E-Commerce",
    repo: "https://github.com/Senthil-Achievements/vastra-and-co",
  },
];

const OUTCOMES = [
  {
    icon: Zap,
    title: "Cut out repetitive manual work",
    desc: "Automations that quietly remove busywork from your team's day.",
  },
  {
    icon: Rocket,
    title: "Launch products faster",
    desc: "Ship in weeks with an experienced team that owns the whole stack.",
  },
  {
    icon: Workflow,
    title: "Automate repetitive operations",
    desc: "Sales, support, ops, and finance workflows running on their own.",
  },
  {
    icon: TrendingUp,
    title: "Generate more qualified leads",
    desc: "AI-powered funnels, sites, and agents that convert while you sleep.",
  },
  {
    icon: LineChart,
    title: "Scale without more complexity",
    desc: "Systems architected so growth doesn't force a rebuild.",
  },
  {
    icon: ShieldCheck,
    title: "Operate with confidence",
    desc: "Monitoring, alerts, and clean handovers so nothing quietly breaks.",
  },
];

const STACK = [
  { name: "Flutter", icon: Smartphone },
  { name: "Firebase", icon: Cloud },
  { name: "Google Cloud", icon: Cloud },
  { name: "Python", icon: Code2 },
  { name: "Docker", icon: Boxes },
  { name: "Supabase", icon: Database },
  { name: "n8n", icon: Workflow },
  { name: "Make", icon: Workflow },
  { name: "OpenAI", icon: Brain },
  { name: "Anthropic", icon: Brain },
  { name: "Node.js", icon: Server },
  { name: "React", icon: Layers },
];

const INDUSTRIES = [
  { icon: HeartPulse, name: "Healthcare" },
  { icon: Building2, name: "Construction" },
  { icon: Utensils, name: "Restaurants" },
  { icon: Hotel, name: "Hotels" },
  { icon: Home, name: "Real Estate" },
  { icon: GraduationCap, name: "Education" },
  { icon: Landmark, name: "Finance" },
  { icon: ShoppingBag, name: "Retail" },
  { icon: Factory, name: "Manufacturing" },
  { icon: Rocket, name: "Startups" },
];

const TESTIMONIALS = [
  {
    q: "THERUINS shipped in weeks what our previous vendor promised in quarters. The AI layer alone changed how our team operates.",
    a: "Founder · SaaS · United States",
  },
  {
    q: "A rare mix of engineering depth and design taste. The product feels expensive — and our customers noticed on day one.",
    a: "COO · Real Estate · United Kingdom",
  },
  {
    q: "They didn't build what we asked for. They built what we actually needed. That distinction is worth everything.",
    a: "CEO · Healthcare · UAE",
  },
];

const FAQ = [
  {
    q: "Who does THERUINS work with?",
    a: "Founders, growing companies, and enterprise teams across the United States, Canada, United Kingdom, Australia, Europe, UAE, and Singapore. We're remote-first and operate across time zones.",
  },
  {
    q: "How long does a project take?",
    a: "MVPs typically ship in 4–8 weeks. Full platforms and multi-surface systems run 8–16 weeks depending on scope. Automations often go live within days.",
  },
  {
    q: "What technologies do you use?",
    a: "React, Next.js, Flutter, TypeScript, Node.js, Python, Supabase, PostgreSQL, Firebase, n8n, Make, and modern AI providers (OpenAI, Anthropic). We pick the stack that fits the problem — not the trend.",
  },
  {
    q: "Do you offer ongoing support?",
    a: "Yes. Every launch includes monitoring, a runbook, and a support agreement. Most clients continue with us for iteration, scaling, and new features after launch.",
  },
  {
    q: "How does pricing work?",
    a: "Fixed-scope pricing for defined projects and monthly retainers for continuous product work. We share a detailed proposal after the discovery call — no surprises.",
  },
  {
    q: "How do we get started?",
    a: "Book a discovery call. We'll spend 30 minutes understanding your business, the outcome you want, and whether we're the right fit. If we are, you'll get a proposal within a week.",
  },
];

/* ============================================================
   PRIMITIVES
   ============================================================ */

function FadeUp({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className={`transition-all duration-600 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"} ${className}`}
      style={{ transitionDelay: `${delay * 1000}ms` }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="section-label" aria-hidden="true">
      <span className="label-dot" />
      {children}
    </div>
  );
}

function MagneticButton({
  children,
  href,
  primary,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  primary?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();
  const handleMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.25;
    const y = (e.clientY - r.top - r.height / 2) * 0.25;
    setPos({ x, y });
  };
  const reset = () => setPos({ x: 0, y: 0 });

  const cls = primary ? "btn-primary-magnetic" : "btn-secondary-magnetic";

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`${cls} ${className}`}
      role={href ? undefined : "button"}
      tabIndex={href ? undefined : 0}
    >
      {children}
      <ArrowUpRight
        className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
      {primary && (
        <span
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#F5C76A]/60 to-transparent opacity-0 transition-opacity group-hover:animate-[shimmer_1s_ease] group-hover:opacity-100"
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
  if (href) {
    if (href.startsWith("/") && !href.startsWith("//")) {
      return <RouterLink to={href}>{inner}</RouterLink>;
    }
    return <a href={href}>{inner}</a>;
  }
  return <button onClick={onClick}>{inner}</button>;
}

/* ============================================================
   BACKGROUND
   ============================================================ */

export function AmbientBackground() {
  const isMobile = useIsMobile();
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden contain-strict">
      <div className="absolute inset-0 grid-bg opacity-[0.30] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <div className={`absolute -top-40 left-1/2 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(245,199,106,0.20),transparent)] ${isMobile ? "h-[350px] w-[500px] blur-xl" : "h-[600px] w-[900px] blur-3xl animate-[float-slow_12s_ease-in-out_infinite]"}`} />
      <div className={`absolute -left-40 rounded-full bg-[radial-gradient(closest-side,rgba(245,199,106,0.10),transparent)] ${isMobile ? "top-[40%] h-[300px] w-[300px] blur-xl" : "top-[40%] h-[500px] w-[500px] blur-3xl animate-[float-slow_16s_ease-in-out_infinite]"}`} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_60%)]" />
    </div>
  );
}

export function CursorGlow() {
  const isMobile = useIsMobile();
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 80, damping: 15, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 80, damping: 15, mass: 0.5 });
  useEffect(() => {
    if (isMobile) return;
    let ticking = false;
    const h = (e: PointerEvent) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
        ticking = false;
      });
    };
    window.addEventListener("pointermove", h, { passive: true });
    return () => window.removeEventListener("pointermove", h);
  }, [x, y, isMobile]);

  if (isMobile) {
    return (
      <div className="pointer-events-none fixed left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 z-0 h-[300px] w-[300px] rounded-full bg-[radial-gradient(closest-side,rgba(245,199,106,0.18),transparent_75%)] blur-xl" />
    );
  }

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(245,199,106,0.18),transparent_70%)] blur-2xl will-change-transform"
    />
  );
}

/* ============================================================
   NAV
   ============================================================ */

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [open]);

  const links: Array<[string, string]> = [
    ["About", "/about"],
    ["Services", "/services"],
    ["Work", "/work"],
    ["Process", "/process"],
    ["Contact", "/contact"],
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 safe-area-top transition-all ${scrolled ? "py-3" : "py-4 sm:py-5"}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className={`nav-container ${scrolled ? "scrolled" : ""}`}>
          <RouterLink
            to="/"
            className="flex items-center gap-2.5 text-sm font-semibold tracking-[0.14em]"
          >
            <span className="grid h-6 w-6 place-items-center rounded-md bg-[#F5C76A] text-[10px] font-bold text-black">
              T
            </span>
            <span className="font-display" style={{ color: "var(--text-primary)" }}>
              {BRAND}
            </span>
          </RouterLink>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {links.map(([l, h]) => (
              <RouterLink
                key={h}
                to={h}
                className="nav-link"
                activeProps={{ className: "nav-link nav-link-active" }}
              >
                {l}
              </RouterLink>
            ))}
          </nav>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <MagneticButton href="tel:+919003863723" primary>
            Book a Strategy Call
          </MagneticButton>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            ref={buttonRef}
            onClick={() => setOpen(!open)}
            className="nav-hamburger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation"
        className={`mx-auto mt-2 max-w-6xl px-4 sm:px-6 md:hidden transition-all duration-200 ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
      >
        <div className="mobile-menu-panel">
          {links.map(([l, h]) => (
            <RouterLink key={h} to={h} onClick={() => setOpen(false)} className="mobile-menu-link">
              {l}
            </RouterLink>
          ))}
          <a href="tel:+919003863723" onClick={() => setOpen(false)} className="mobile-menu-cta">
            Book a Strategy Call
          </a>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   HERO
   ============================================================ */

function HeroMockup() {
  return (
    <div className="relative aspect-[5/6] w-full sm:aspect-[5/6] lg:aspect-[4/5]">
      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="glass-card relative z-10 h-full rounded-2xl sm:rounded-3xl p-4 sm:p-5"
      >
        {/* header */}
        <div className="hero-mockup-header">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="hero-mockup-dot" style={{ background: "var(--border)" }} />
            <span className="hero-mockup-dot" style={{ background: "var(--border)" }} />
            <span className="hero-mockup-dot bg-[#F5C76A]/70" />
          </div>
          <div className="hero-mockup-console">theruins · console</div>
          <div className="hero-mockup-live">
            <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-[#F5C76A] shadow-[0_0_8px_rgba(245,199,106,0.8)] animate-[ticker_1.6s_ease-in-out_infinite]" />
            LIVE
          </div>
        </div>

        {/* Focus row */}
        <div className="mt-3 sm:mt-4 grid grid-cols-3 gap-2 sm:gap-2.5">
          {[
            { l: "Focus", v: "AI-Native", d: "products & agents" },
            { l: "Stack", v: "Full-Stack", d: "web · mobile · infra" },
            { l: "Projects", v: "6+", d: "completed" },
          ].map((k, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.08 }}
              className="hero-mockup-section"
            >
              <div className="hero-stat-label">{k.l}</div>
              <div className="mt-0.5 sm:mt-1 hero-stat-value text-xs sm:text-base">{k.v}</div>
              <div className="mt-0.5 hero-stat-desc">{k.d}</div>
            </motion.div>
          ))}
        </div>

        {/* Activity */}
        <div className="relative mt-2.5 sm:mt-3 h-24 sm:h-32 overflow-hidden rounded-lg sm:rounded-xl border border-[var(--border-subtle)] hero-activity-bg p-2.5 sm:p-3">
          <div className="flex items-center justify-between">
            <div className="hero-mockup-label">Build activity</div>
            <div className="font-mono text-[8px] sm:text-[10px] text-[#F5C76A]">shipping</div>
          </div>
          <svg viewBox="0 0 300 80" className="mt-1.5 sm:mt-2 h-16 sm:h-20 w-full">
            <defs>
              <linearGradient id="gold-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(245,199,106,0.4)" />
                <stop offset="100%" stopColor="rgba(245,199,106,0)" />
              </linearGradient>
              <linearGradient id="gold-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--text-faint)" />
                <stop offset="100%" stopColor="#F5C76A" />
              </linearGradient>
            </defs>
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.9 }}
              d="M0,60 C30,55 50,48 80,42 C110,44 130,32 160,26 C190,22 210,18 240,14 C265,12 285,18 300,12 L300,80 L0,80 Z"
              fill="url(#gold-fill)"
              stroke="none"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.9 }}
              d="M0,60 C30,55 50,48 80,42 C110,44 130,32 160,26 C190,22 210,18 240,14 C265,12 285,18 300,12"
              fill="none"
              stroke="url(#gold-line)"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Philosophy */}
        <div className="mt-2.5 sm:mt-3 hero-mockup-section">
          <div
            className="flex items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[10px] font-medium"
            style={{ color: "var(--text-muted)" }}
          >
            <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#F5C76A]" />
            How we build
          </div>
          <div className="mt-1 sm:mt-1.5 text-[9px] sm:text-[11px] leading-relaxed hero-mockup-body">
            Ship a real, working slice in weeks — not a deck. Then iterate against usage, not{" "}
            <span className="text-[#F5C76A]">assumptions</span>.
          </div>
        </div>

        {/* Terminal */}
        <div className="mt-2.5 sm:mt-3 hero-terminal">
          <div className="hero-terminal-header">
            <Terminal className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            <span>status</span>
          </div>
          <div className="hero-terminal-line">
            <span className="text-[#F5C76A]">▸</span> currently building · client work
          </div>
          <div className="hero-terminal-line">
            <span className="text-[#F5C76A]">▸</span> stack · react · next · flutter · python
          </div>
          <div className="hero-terminal-line">
            <span className="text-[#F5C76A]">▸</span> open to · new engagements
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const isMobile = useIsMobile();
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-20 sm:pt-28 md:pt-32"
    >
      <RisingLines
        particles={isMobile ? 120 : 180}
        color="#5E4017"
        riseSpeed={10}
        scale={8}
        horizonColor="#F5C76A"
        className="opacity-90"
      />
      <ShaderBackground className="opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-5 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div className="flex flex-col justify-center">
          <FadeUp>
            <SectionLabel>AI Startup Studio · Est. Tomorrow</SectionLabel>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="mt-6 font-display text-[44px] font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[76px]">
              We Build Businesses <br className="hidden sm:block" />
              That <span className="text-gradient-accent">Scale.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              className="mt-5 sm:mt-7 max-w-xl text-sm sm:text-base leading-relaxed md:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              From AI websites and mobile apps to intelligent automations, THERUINS builds digital
              infrastructure that helps businesses grow faster and scale globally.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-6 sm:mt-9 flex flex-wrap items-center gap-3">
              <MagneticButton href="#contact" primary>
                Book a Strategy Call
              </MagneticButton>
              <MagneticButton href="#work">View Our Work</MagneticButton>
            </div>
          </FadeUp>
        </div>

        <div className="relative">
          <HeroMockup />
        </div>
      </div>

      <div
        className="scroll-hint absolute bottom-6 sm:bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] md:flex"
        style={{ color: "var(--text-faint)" }}
      >
        Scroll
        <span className="h-8 w-px bg-gradient-to-b from-current to-transparent" />
      </div>
    </section>
  );
}

/* ============================================================
   MARQUEE
   ============================================================ */

export function Marquee() {
  const isMobile = useIsMobile();
  const items = [...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <div className="relative overflow-hidden border-y border-[var(--border-subtle)] py-3.5 sm:py-6">
      <div
        className="flex whitespace-nowrap animate-[marquee_35s_linear_infinite]"
      >
        {items.map((w, i) => (
          <span
            key={i}
            className="mx-5 sm:mx-8 inline-flex items-center gap-5 sm:gap-8 font-display text-lg sm:text-2xl font-medium marquee-word"
          >
            {w}
            <span className="marquee-divider" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   SERVICES
   ============================================================ */

export function Services() {
  const isMobile = useIsMobile();
  return (
    <section id="services" className="relative py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <FadeUp>
          <SectionLabel>What We Build</SectionLabel>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mt-4 sm:mt-5 max-w-3xl font-display text-2xl sm:text-4xl md:text-5xl font-semibold leading-[1.1] sm:leading-[1.05]">
            Products, platforms, and <span className="text-gradient-accent">agents</span> —
            engineered end-to-end.
          </h2>
        </FadeUp>
        <div className="mt-6 sm:mt-8 md:mt-12" style={{ minHeight: isMobile ? "auto" : 390 }}>
          <CoverflowCarousel
            images={SERVICES.map((s) => ({ alt: s.title }))}
            activeWidth={460}
            activeHeight={310}
            restWidth={368}
            restHeight={270}
            gap={28}
            radius={8}
            autoplay
            autoplayDirection="rightToLeft"
            transition={{ type: "tween", duration: 0.4, delay: 2, ease: [0, 0, 1, 1] }}
            renderItem={(item, i) => {
              const s = SERVICES[i];
              if (!s) return null;
              return (
                <div className="flex h-full flex-col justify-start gap-4 p-5 md:p-7">
                  <div className="carousel-card-icon h-10 w-10 md:h-11 md:w-11 shrink-0">
                    <s.icon className="h-5 w-5 md:h-5 md:w-5 text-[#F5C76A]" />
                  </div>
                  <div className="flex flex-col gap-2 min-h-0 overflow-hidden">
                    <div className="carousel-card-title text-base md:text-xl font-semibold">
                      {s.title}
                    </div>
                    <div className="text-xs md:text-sm leading-relaxed carousel-card-desc">
                      {s.desc}
                    </div>
                  </div>
                </div>
              );
            }}
          />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ s }: { s: (typeof SERVICES)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setTilt({
          x: (e.clientX - r.left) / r.width - 0.5,
          y: (e.clientY - r.top) / r.height - 0.5,
        });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 4}deg) rotateY(${tilt.x * 4}deg)`,
      }}
      className="glass-card group relative flex h-full flex-col overflow-hidden rounded-xl sm:rounded-2xl p-5 sm:p-6 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="carousel-card-icon h-10 w-10 sm:h-11 sm:w-11 group-hover:border-[#F5C76A]/40 transition-colors">
        <s.icon
          className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:scale-110 group-hover:text-[#F5C76A]"
          style={{ color: "var(--text-primary)" }}
        />
      </div>
      <div className="mt-4 sm:mt-5 font-display text-base sm:text-lg font-semibold carousel-card-title">
        {s.title}
      </div>
      <div className="mt-2 text-xs sm:text-sm leading-relaxed carousel-card-desc">{s.desc}</div>
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-[#F5C76A]/10 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
    </div>
  );
}

/* ============================================================
   PROCESS
   ============================================================ */

export function Process() {
  const isMobile = useIsMobile();
  return (
    <section id="process" className="relative py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <FadeUp>
          <SectionLabel>How We Work</SectionLabel>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mt-4 sm:mt-5 max-w-3xl font-display text-2xl sm:text-4xl md:text-5xl font-semibold leading-[1.1] sm:leading-[1.05]">
            A calm, deliberate <span className="text-gradient-accent">six-stage</span> engagement.
          </h2>
        </FadeUp>
        <div className="mt-6 sm:mt-8 md:mt-12" style={{ minHeight: isMobile ? "auto" : 360 }}>
          <CoverflowCarousel
            images={PROCESS.map((s) => ({ alt: s.title }))}
            activeWidth={440}
            activeHeight={280}
            restWidth={352}
            restHeight={250}
            gap={28}
            radius={8}
            autoplay
            autoplayDirection="leftToRight"
            transition={{ type: "tween", duration: 0.4, delay: 2.5, ease: [0, 0, 1, 1] }}
            renderItem={(item, i) => {
              const step = PROCESS[i];
              if (!step) return null;
              return (
                <div className="flex h-full flex-col justify-start gap-4 p-5 md:p-7">
                  <div className="flex items-center justify-between shrink-0">
                    <div className="carousel-card-icon h-10 w-10 md:h-11 md:w-11">
                      <step.icon className="h-5 w-5 text-[#F5C76A]" />
                    </div>
                    <div className="carousel-card-number font-mono text-xs font-bold text-[#F5C76A]/80">
                      0{i + 1}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 min-h-0 overflow-hidden">
                    <div className="carousel-card-title text-base md:text-xl font-semibold">
                      {step.title}
                    </div>
                    <p className="text-xs md:text-sm leading-relaxed carousel-card-desc">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FEATURED WORK
   ============================================================ */

function ProjectCard({ p, index }: { p: (typeof PROJECTS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  return (
    <article
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setTilt({
          x: (e.clientX - r.left) / r.width - 0.5,
          y: (e.clientY - r.top) / r.height - 0.5,
        });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1200px) rotateX(${-tilt.y * 2.5}deg) rotateY(${tilt.x * 2.5}deg)`,
      }}
      className="case-card group relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-transform duration-300 md:p-10"
    >
      <div
        className="pointer-events-none absolute -inset-40 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(500px circle at ${(tilt.x + 0.5) * 100}% ${(tilt.y + 0.5) * 100}%, rgba(245,199,106,0.12), transparent 60%)`,
        }}
      />
      <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <div className="flex items-center gap-3 case-label">
            <span className="h-2 w-2 rounded-full bg-[#F5C76A] shadow-[0_0_10px_rgba(245,199,106,0.8)]" />
            Case study · 0{index + 1} · {p.tag}
          </div>
          <h3 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl case-title">
            {p.name}
          </h3>
          <p className="mt-2 text-base case-tagline">{p.tagline}</p>

          <div className="mt-8 space-y-6 text-sm">
            <div>
              <div className="case-section-label">Overview</div>
              <p className="mt-1.5 case-body">{p.overview}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <div className="case-section-label">Problem</div>
                <p className="mt-1.5 case-body">{p.problem}</p>
              </div>
              <div>
                <div className="case-section-label">Solution</div>
                <p className="mt-1.5 case-body">{p.solution}</p>
              </div>
            </div>
            <div>
              <div className="case-section-label">Key features</div>
              <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 case-feature">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-[#F5C76A]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {(() => {
              const demo = p.demo;
              const isGithub = p.repo.includes("github.com");
              return (
                <>
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="group/btn btn-card-primary"
                  >
                    {isGithub ? (
                      <Github className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    )}
                    {isGithub ? "View on GitHub" : "Visit live site"}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                  {demo && isGithub && (
                    <a href={demo} target="_blank" rel="noreferrer" className="btn-card-secondary">
                      Live demo
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </>
              );
            })()}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="case-panel relative overflow-hidden">
            <div className="flex items-center justify-between case-panel-label">
              <span>Outcomes</span>
              <span className="font-mono">/ what shipped</span>
            </div>
            <div className="mt-4 space-y-3">
              {p.outcomes.map((o) => (
                <div
                  key={o}
                  className="flex items-start gap-2 border-b case-outcome-divider pb-3 last:border-0 last:pb-0"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#F5C76A]" />
                  <div className="text-xs leading-relaxed case-panel-body">{o}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="case-panel">
            <div className="case-panel-label">Tech stack</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span key={s} className="case-tech-badge">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Work() {
  const isMobile = useIsMobile();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const n = PROJECTS.length;
  const x = useTransform(scrollYProgress, [0, 1], ["2vw", `-${(n - 1) * (100 / n) + 2}%`]);

  if (isMobile) {
    return (
      <section id="work" className="relative py-12 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <FadeUp>
            <SectionLabel>Featured Work</SectionLabel>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-4 sm:mt-6 max-w-3xl font-display text-2xl sm:text-4xl font-semibold leading-[1.1]">
              Products we're <span className="text-gradient-accent">proud</span> to have built.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-3 max-w-md text-sm" style={{ color: "var(--text-muted)" }}>
              A selection of platforms, mobile apps, and AI systems shipped for founders and teams
              across industries. Swipe to explore.
            </p>
          </FadeUp>
        </div>
        <div
          className="mt-6 sm:mt-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mx-5 px-5 sm:-mx-6 sm:px-6"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="flex gap-4 sm:gap-6" style={{ width: "max-content" }}>
            {PROJECTS.map((p, i) => (
              <div key={p.id} className="shrink-0 w-[85vw] max-w-[360px] snap-center">
                <ProjectCard p={p} index={i} />
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-4 flex justify-center gap-1.5 px-5 sm:px-6">
          {PROJECTS.map((_, idx) => (
            <span
              key={idx}
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--border)" }}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="work" className="relative py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <FadeUp>
              <SectionLabel>Featured Work</SectionLabel>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="mt-6 max-w-3xl font-display text-3xl sm:text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl">
                Products we're <span className="text-gradient-accent">proud</span> to have built.
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.2}>
            <p className="max-w-md text-sm sm:text-base" style={{ color: "var(--text-muted)" }}>
              A selection of platforms, mobile apps, and AI systems shipped for founders and teams
              across industries. Scroll to explore.
            </p>
          </FadeUp>
        </div>
      </div>

      <div
        ref={targetRef}
        className="relative mt-10 sm:mt-16"
        style={{ height: `${Math.max(3, n) * 80}vh` }}
      >
        <div className="sticky top-0 flex h-[100dvh] h-[100svh] items-center overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex gap-4 sm:gap-6 md:gap-8 pr-[4vw] will-change-transform"
          >
            {PROJECTS.map((p, i) => (
              <div key={p.id} className="shrink-0 w-[min(900px,88vw)] sm:w-[min(1100px,92vw)]">
                <ProjectCard p={p} index={i} />
              </div>
            ))}
          </motion.div>

          <div className="pointer-events-none absolute bottom-6 sm:bottom-8 left-1/2 h-[3px] w-40 sm:w-56 -translate-x-1/2 overflow-hidden rounded-full scroll-progress-bg">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              className="h-full w-full bg-gradient-to-r from-current via-[#F5C76A] to-[#d4a94a]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   WHY THERUINS
   ============================================================ */

/* ============================================================
   WHY THERUINS
   ============================================================ */

export function WhyUs() {
  const isMobile = useIsMobile();
  return (
    <section className="relative py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <FadeUp>
          <SectionLabel>Why THERUINS</SectionLabel>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mt-4 sm:mt-5 max-w-3xl font-display text-2xl sm:text-4xl md:text-5xl font-semibold leading-[1.1] sm:leading-[1.05]">
            We measure success in <span className="text-gradient-accent">business outcomes</span>.
          </h2>
        </FadeUp>
        <div className="mt-6 sm:mt-8 md:mt-12" style={{ minHeight: isMobile ? "auto" : 360 }}>
          <CoverflowCarousel
            images={OUTCOMES.map((o) => ({ alt: o.title }))}
            activeWidth={460}
            activeHeight={280}
            restWidth={368}
            restHeight={250}
            gap={28}
            radius={8}
            autoplay
            autoplayDirection="rightToLeft"
            transition={{ type: "tween", duration: 0.4, delay: 2, ease: [0, 0, 1, 1] }}
            renderItem={(item, i) => {
              const o = OUTCOMES[i];
              if (!o) return null;
              return (
                <div className="flex h-full flex-col justify-start gap-4 p-5 md:p-7">
                  <div className="carousel-card-icon h-10 w-10 md:h-11 md:w-11 shrink-0 border-[#F5C76A]/25 bg-[#F5C76A]/[0.06]">
                    <o.icon className="h-5 w-5 text-[#F5C76A]" />
                  </div>
                  <div className="flex flex-col gap-1.5 min-h-0 overflow-hidden">
                    <div className="carousel-card-title text-base md:text-xl font-semibold leading-tight">
                      {o.title}
                    </div>
                    <div className="text-xs md:text-sm leading-relaxed carousel-card-desc">
                      {o.desc}
                    </div>
                  </div>
                </div>
              );
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TECH STACK
   ============================================================ */

export function TechStack() {
  const isMobile = useIsMobile();
  return (
    <section className="relative py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <FadeUp>
          <SectionLabel>Technology Stack</SectionLabel>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mt-4 sm:mt-5 max-w-3xl font-display text-2xl sm:text-4xl md:text-5xl font-semibold leading-[1.1] sm:leading-[1.05]">
            A modern, <span className="text-gradient-accent">production-ready</span> toolchain.
          </h2>
        </FadeUp>
        <div className="mt-6 sm:mt-8 md:mt-12" style={{ minHeight: isMobile ? "auto" : 280 }}>
          <CoverflowCarousel
            images={STACK.map((s) => ({ alt: s.name }))}
            activeWidth={280}
            activeHeight={200}
            restWidth={224}
            restHeight={170}
            gap={24}
            radius={8}
            autoplay
            autoplayDirection="leftToRight"
            transition={{ type: "tween", duration: 0.35, delay: 1.8, ease: [0, 0, 1, 1] }}
            renderItem={(item, i) => {
              const s = STACK[i];
              if (!s) return null;
              return (
                <div className="flex h-full flex-col items-center justify-center gap-3 p-4 min-h-0 overflow-hidden text-center">
                  <div className="carousel-card-icon h-12 w-12 shrink-0">
                    <s.icon className="h-6 w-6 text-[#F5C76A]" />
                  </div>
                  <div className="text-base md:text-lg font-semibold carousel-card-title whitespace-nowrap">
                    {s.name}
                  </div>
                </div>
              );
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   INDUSTRIES
   ============================================================ */

export function Industries() {
  const isMobile = useIsMobile();
  return (
    <section id="industries" className="relative py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <FadeUp>
          <SectionLabel>Industries</SectionLabel>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mt-4 sm:mt-5 max-w-3xl font-display text-2xl sm:text-4xl md:text-5xl font-semibold leading-[1.1] sm:leading-[1.05]">
            We speak the language of <span className="text-gradient-accent">your industry</span>.
          </h2>
        </FadeUp>
        <div className="mt-6 sm:mt-8 md:mt-12" style={{ minHeight: isMobile ? "auto" : 260 }}>
          <CoverflowCarousel
            images={INDUSTRIES.map((it) => ({ alt: it.name }))}
            activeWidth={260}
            activeHeight={180}
            restWidth={208}
            restHeight={150}
            gap={24}
            radius={8}
            autoplay
            autoplayDirection="rightToLeft"
            transition={{ type: "tween", duration: 0.35, delay: 2, ease: [0, 0, 1, 1] }}
            renderItem={(item, i) => {
              const it = INDUSTRIES[i];
              if (!it) return null;
              return (
                <div className="flex h-full flex-col items-center justify-center gap-3 p-4 min-h-0 overflow-hidden text-center">
                  <div className="carousel-card-icon h-11 w-11 shrink-0">
                    <it.icon className="h-5 w-5 text-[#F5C76A]" />
                  </div>
                  <div className="text-sm md:text-base font-semibold carousel-card-title whitespace-nowrap">
                    {it.name}
                  </div>
                </div>
              );
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIALS
   ============================================================ */

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);
  const cur = TESTIMONIALS[i];
  return (
    <section className="relative py-12 sm:py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 text-center">
        <FadeUp>
          <div className="inline-block">
            <SectionLabel>Testimonials</SectionLabel>
          </div>
        </FadeUp>
        <FadeUp delay={0.15}>
          <div className="glass-card relative mt-6 sm:mt-8 rounded-xl sm:rounded-2xl md:rounded-3xl p-5 sm:p-8 md:p-14">
            <Quote className="mx-auto h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-[#F5C76A]/50" />
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-4 sm:mt-6 font-display text-base sm:text-xl md:text-3xl leading-relaxed testimonial-quote"
            >
              "{cur.q}"
            </motion.blockquote>
            <div className="mt-4 sm:mt-6 md:mt-8 text-xs sm:text-sm testimonial-author">
              — {cur.a}
            </div>
            <div className="mt-4 sm:mt-6 md:mt-8 flex justify-center gap-1.5">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  aria-pressed={idx === i}
                  className={`testimonial-dot ${idx === i ? "testimonial-dot-active" : "testimonial-dot-inactive"}`}
                />
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ============================================================
   FAQ
   ============================================================ */

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-12 sm:py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-6">
        <FadeUp>
          <SectionLabel>FAQ</SectionLabel>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mt-4 sm:mt-6 font-display text-2xl sm:text-4xl md:text-5xl font-semibold leading-[1.1] sm:leading-[1.05]">
            Answers before <span className="text-gradient-accent">you ask</span>.
          </h2>
        </FadeUp>

        <div className="mt-6 sm:mt-10 md:mt-14 space-y-2 sm:space-y-3" role="list">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <FadeUp key={f.q} delay={i * 0.04}>
                <div
                  className="glass-card overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl"
                  role="listitem"
                >
                  <button
                    id={buttonId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-5 md:p-6 text-left transition-colors hover:bg-[var(--secondary)]"
                  >
                    <span className="font-display text-xs sm:text-sm md:text-lg font-medium faq-question">
                      {f.q}
                    </span>
                    <span
                      className="faq-toggle h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 shrink-0"
                      aria-hidden="true"
                    >
                      {isOpen ? (
                        <Minus className="h-3 w-3 sm:h-4 sm:w-4 text-[#F5C76A]" />
                      ) : (
                        <Plus
                          className="h-3 w-3 sm:h-4 sm:w-4"
                          style={{ color: "var(--text-muted)" }}
                        />
                      )}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-3.5 sm:px-5 md:px-6 pb-3.5 sm:pb-5 md:pb-6 text-[11px] sm:text-xs md:text-sm leading-relaxed faq-answer">
                          {f.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FINAL CTA
   ============================================================ */

export function FinalCta() {
  return (
    <section id="contact" className="relative py-12 sm:py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="glass-card relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-[2rem] p-6 sm:p-8 md:p-16">
          <div className="absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-[#F5C76A]/20 blur-3xl" />
          <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-[#F5C76A]/10 blur-3xl" />
          <div className="relative text-center">
            <FadeUp>
              <div className="inline-block">
                <SectionLabel>Let's Build</SectionLabel>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="mx-auto mt-4 sm:mt-6 max-w-3xl font-display text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold leading-[1.05] sm:leading-[1.02]">
                Let's Build Something <span className="text-gradient-accent">Extraordinary.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="mx-auto mt-5 sm:mt-7 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed cta-description">
                Whether you're launching a startup, modernizing your business, or automating your
                operations, THERUINS is ready to build your next competitive advantage.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="mt-6 sm:mt-10 flex flex-wrap justify-center gap-3">
                <MagneticButton href="tel:+919003863723" primary>
                  Book Discovery Call
                </MagneticButton>
                <MagneticButton href={`mailto:${CONTACT_EMAIL}`}>
                  Start Your Project
                </MagneticButton>
              </div>
            </FadeUp>
            <FadeUp delay={0.4}>
              <div className="mt-6 sm:mt-10 inline-flex items-center gap-2 text-[11px] sm:text-xs cta-email">
                <Mail className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                {CONTACT_EMAIL}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--border-subtle)] pt-12 sm:pt-16 pb-8 sm:pb-10">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <FadeUp>
          <div className="flex flex-col items-start justify-between gap-8 sm:gap-10 border-b border-[var(--border-subtle)] pb-8 sm:pb-10 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-lg bg-[#F5C76A] font-display text-base sm:text-lg font-bold text-black">
                  T
                </span>
                <span
                  className="font-display text-2xl sm:text-3xl font-semibold tracking-[0.12em]"
                  style={{ color: "var(--text-primary)" }}
                >
                  {BRAND}
                </span>
              </div>
              <div className="mt-3 max-w-md text-xs sm:text-sm footer-link">{TAGLINE}</div>
            </div>
            <div className="flex items-center gap-3">
              <MagneticButton href="tel:+919003863723" primary>
                Book a Strategy Call
              </MagneticButton>
            </div>
          </div>
        </FadeUp>

        <div className="footer-grid mt-8 grid grid-cols-2 gap-6 sm:gap-8 sm:grid-cols-4">
          <div>
            <div className="footer-section-label">Company</div>
            <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#services" className="footer-link">
                  Services
                </a>
              </li>
              <li>
                <a href="#work" className="footer-link">
                  Work
                </a>
              </li>
              <li>
                <a href="#process" className="footer-link">
                  Process
                </a>
              </li>
              <li>
                <a href="#industries" className="footer-link">
                  Industries
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-section-label">Build</div>
            <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li className="footer-item">AI Websites</li>
              <li className="footer-item">Mobile Apps</li>
              <li className="footer-item">AI Agents</li>
              <li className="footer-item">Automation</li>
            </ul>
          </div>
          <div>
            <div className="footer-section-label">Regions</div>
            <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li className="footer-item">United States · Canada</li>
              <li className="footer-item">United Kingdom · EU</li>
              <li className="footer-item">UAE · Singapore</li>
              <li className="footer-item">Australia</li>
            </ul>
          </div>
          <div>
            <div className="footer-section-label">Contact</div>
            <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="footer-link">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  X · Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left" }}
          className="mt-10 sm:mt-12 h-px w-full bg-gradient-to-r from-transparent via-[#F5C76A]/60 to-transparent"
        />

        <div className="mt-6 sm:mt-8 flex flex-col items-center justify-between gap-3 text-[10px] sm:text-xs footer-copyright sm:flex-row">
          <div>
            © {new Date().getFullYear()} {BRAND}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F5C76A] animate-[ticker_1.6s_ease-in-out_infinite]" />
            Remote · Available worldwide
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   SITE CHROME (shared layout wrapper for all pages)
   ============================================================ */

export function SiteChrome({
  children,
  showGlitter = true,
}: {
  children: React.ReactNode;
  showGlitter?: boolean;
}) {
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const isMobile = useIsMobile();

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="relative min-h-screen text-foreground">
      <WelcomeLoader />
      <SmoothScroll />
      <AmbientBackground />
      <CursorGlow />
      {showGlitter && (
        <GlitterWrap
          particleCount={isMobile ? 140 : 250}
          color1="#8F5252"
          color2="#BCA044"
          color3="#BBC779"
          speed={7}
          density={59}
          starSize={10}
          focalDepth={23}
          turbulence={4}
          brightness={140}
          glitterIntensity={6}
          trailAmount={88}
          className="!fixed inset-0 z-0 opacity-80"
        />
      )}
      <motion.div
        style={{ width: progress }}
        className="fixed left-0 top-0 z-[60] h-0.5 bg-gradient-to-r from-white via-[#F5C76A] to-[#d4a94a]"
      />
      <Nav />
      <main id="main-content" className="relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}

/* ============================================================
   HOME — sticky-pinned scroll stack
   ============================================================ */

export function HomeStack() {
  const isMobile = useIsMobile();
  const sections = [
    { key: "marquee", node: <Marquee /> },
    { key: "services", node: <Services /> },
    { key: "work", node: <Work /> },
    { key: "process", node: <Process /> },
    { key: "whyus", node: <WhyUs /> },
    { key: "techstack", node: <TechStack /> },
    { key: "industries", node: <Industries /> },
    { key: "testimonials", node: <Testimonials /> },
    { key: "faq", node: <FaqSection /> },
    { key: "cta", node: <FinalCta /> },
  ];

  const pinRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const heroRadius = useTransform(scrollYProgress, [0, 0.4], ["0px", "36px"]);
  const panelY = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const panelRadius = useTransform(scrollYProgress, [0, 0.85, 1], [36, 20, 0]);

  if (isMobile) {
    return (
      <>
        <div ref={pinRef} className="relative h-[130vh]">
          <div className="sticky top-0 h-[100dvh] h-[100svh] w-full overflow-hidden">
            <motion.div
              style={{ scale: heroScale, opacity: heroOpacity, borderRadius: heroRadius }}
              className="absolute inset-0 origin-center overflow-hidden will-change-transform"
            >
              <Hero />
            </motion.div>
          </div>
        </div>
        <div className="relative z-20">
          {sections.map((s) => (
            <Fragment key={s.key}>{s.node}</Fragment>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div ref={pinRef} className="relative h-[170vh]">
        <div className="sticky top-0 h-[100dvh] h-[100svh] w-full overflow-hidden">
          <motion.div
            style={{ scale: heroScale, opacity: heroOpacity, borderRadius: heroRadius }}
            className="absolute inset-0 origin-center overflow-hidden will-change-transform"
          >
            <Hero />
          </motion.div>
          <motion.div
            style={{
              y: panelY,
              borderTopLeftRadius: panelRadius,
              borderTopRightRadius: panelRadius,
            }}
            aria-hidden
            className="absolute inset-x-0 bottom-0 top-auto h-[18vh] z-10 overflow-hidden border-t border-[var(--border-subtle)] bg-transparent shadow-[0_-40px_110px_-30px_rgba(0,0,0,0.95)] will-change-transform"
          />
        </div>
      </div>
      <div className="relative z-20">
        {sections.map((s) => (
          <Fragment key={s.key}>{s.node}</Fragment>
        ))}
      </div>
    </>
  );
}

export default function Portfolio() {
  return (
    <SiteChrome>
      <HomeStack />
    </SiteChrome>
  );
}

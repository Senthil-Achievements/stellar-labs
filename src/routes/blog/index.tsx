import { createFileRoute, Link as RouterLink } from "@tanstack/react-router";
import { SiteChrome, SectionLabel, FadeUp, MagneticButton } from "@/components/Portfolio";
import { BLOG_POSTS } from "@/data/blog-posts";
import { ArrowUpRight, BookOpen, Clock, Calendar, Search, Sparkles } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "AI & Software Insights — THERUINS · Engineering & Automation Blog" },
      {
        name: "description",
        content:
          "Authoritative guides and real-world analysis on AI application development, job automation, ATS candidate screening, autonomous AI agents, and small business hiring tech.",
      },
      {
        name: "keywords",
        content:
          "AI engineering blog, job search automation, ATS screening software, AI agents business, small business hiring automation, THERUINS insights",
      },
      { property: "og:title", content: "AI & Software Insights — THERUINS" },
      {
        property: "og:description",
        content:
          "Engineering analysis, automation blueprints, and AI product guides from THERUINS.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://theruins.in/blog" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://theruins.in/blog" }],
  }),
  component: BlogHubPage,
});

function BlogHubPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [query, setQuery] = useState<string>("");

  const categories = ["All", "AI & Automation", "Hiring Tech & SaaS", "AI Engineering", "Small Business & Growth"];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesQuery =
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.keywords.some((k) => k.toLowerCase().includes(query.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <SiteChrome>
      <div className="relative pt-32 pb-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl">
            <FadeUp>
              <SectionLabel>Insights & Research</SectionLabel>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h1 className="mt-4 sm:mt-6 font-display text-3xl sm:text-5xl font-semibold leading-[1.08] text-white">
                Engineering <span className="text-gradient-accent">Insights</span>, AI Automations & Product Guides.
              </h1>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                Authoritative research and step-by-step breakdowns on AI web development, recruitment automation, ATS software engines, and autonomous AI agents.
              </p>
            </FadeUp>
          </div>

          {/* Search and Filters */}
          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search articles, topics, or keywords..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-xl border border-[var(--border-subtle)] bg-[rgba(15,18,24,0.6)] pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-[var(--text-muted)] outline-none transition-colors focus:border-[#F5C76A]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-[#F5C76A] text-black shadow-sm"
                      : "bg-[rgba(255,255,255,0.05)] text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.1)] hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Article Banner */}
          {BLOG_POSTS[0] && selectedCategory === "All" && !query && (
            <FadeUp delay={0.2} className="mt-10">
              <div className="group relative overflow-hidden rounded-2xl border border-[rgba(245,199,106,0.25)] bg-[radial-gradient(ellipse_at_top,rgba(245,199,106,0.08),rgba(15,18,24,0.95))] p-6 sm:p-10 shadow-2xl transition-all hover:border-[rgba(245,199,106,0.5)]">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#F5C76A]">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Featured Article</span>
                      <span>•</span>
                      <span>{BLOG_POSTS[0].category}</span>
                    </div>
                    <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold leading-tight text-white group-hover:text-[#F5C76A] transition-colors">
                      <RouterLink to="/blog/$slug" params={{ slug: BLOG_POSTS[0].slug }}>
                        {BLOG_POSTS[0].title}
                      </RouterLink>
                    </h2>
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
                      {BLOG_POSTS[0].excerpt}
                    </p>
                    <div className="mt-5 flex items-center gap-4 text-xs text-[var(--text-muted)]">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {BLOG_POSTS[0].date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {BLOG_POSTS[0].readTime}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <RouterLink
                      to="/blog/$slug"
                      params={{ slug: BLOG_POSTS[0].slug }}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#F5C76A] px-5 py-3 text-xs font-semibold text-black transition-all hover:bg-[#e0b255] hover:scale-105"
                    >
                      Read Full Guide
                      <ArrowUpRight className="h-4 w-4" />
                    </RouterLink>
                  </div>
                </div>
              </div>
            </FadeUp>
          )}

          {/* Grid of Articles */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, idx) => (
              <FadeUp key={post.slug} delay={0.05 * (idx + 1)}>
                <article className="group flex h-full flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[rgba(15,18,24,0.7)] p-6 transition-all hover:border-[rgba(245,199,106,0.4)] hover:bg-[rgba(20,24,32,0.9)]">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                      <span className="rounded-md bg-[rgba(245,199,106,0.1)] px-2.5 py-1 text-[11px] font-mono text-[#F5C76A]">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-white group-hover:text-[#F5C76A] transition-colors">
                      <RouterLink to="/blog/$slug" params={{ slug: post.slug }}>
                        {post.title}
                      </RouterLink>
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)] line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-[var(--border-subtle)] pt-4 flex items-center justify-between">
                    <span className="text-[11px] text-[var(--text-muted)]">{post.date}</span>
                    <RouterLink
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#F5C76A] group-hover:translate-x-0.5 transition-transform"
                    >
                      Read Article
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </RouterLink>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="mt-16 text-center py-12 rounded-xl border border-dashed border-[var(--border-subtle)]">
              <BookOpen className="mx-auto h-8 w-8 text-[var(--text-muted)]" />
              <p className="mt-3 text-sm text-[var(--text-secondary)]">No articles found matching "{query}".</p>
              <button
                onClick={() => {
                  setQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-4 text-xs font-semibold text-[#F5C76A] underline"
              >
                Reset search & filters
              </button>
            </div>
          )}

          {/* AEO Quick FAQ Section */}
          <div className="mt-20 rounded-2xl border border-[var(--border-subtle)] bg-[rgba(15,18,24,0.5)] p-6 sm:p-10">
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-white">
              Frequently Asked Questions on AI & Job Automation
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)]">
              Direct, authoritative answers to high-intent industry questions.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-[var(--border-subtle)] bg-[rgba(20,24,32,0.6)] p-5">
                <h3 className="text-sm font-semibold text-white">Does automated job applying reduce interview callbacks?</h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                  Unfiltered spam applying reduces callback percentages because generic resumes get rejected by ATS filters. However, targeted automation that dynamically matches resume keywords increases total interviews by 2-3x.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--border-subtle)] bg-[rgba(20,24,32,0.6)] p-5">
                <h3 className="text-sm font-semibold text-white">How can small business owners automate hiring without losing candidate quality?</h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                  By building custom intake portals with automated semantic vector screening and calendar routing. This provides 24/7 candidate engagement while filtering low-fit applicants automatically.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="mt-16 text-center">
            <h2 className="font-display text-2xl font-semibold text-white">Need Custom AI or Automation Built?</h2>
            <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)]">
              We design and ship custom web platforms, mobile apps, and autonomous AI agents.
            </p>
            <div className="mt-6 flex justify-center">
              <MagneticButton href="mailto:hello@theruins.in" primary>
                Talk to Our Engineering Team
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </SiteChrome>
  );
}

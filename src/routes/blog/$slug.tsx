import { createFileRoute, Link as RouterLink, useParams } from "@tanstack/react-router";
import { SiteChrome, SectionLabel, FadeUp, MagneticButton } from "@/components/Portfolio";
import { getBlogPostBySlug, BLOG_POSTS } from "@/data/blog-posts";
import { ArrowLeft, Clock, Calendar, User, Share2, CheckCircle2, HelpCircle } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getBlogPostBySlug(params.slug);
    const title = post ? `${post.title} — THERUINS` : "Article — THERUINS";
    const description = post
      ? post.excerpt
      : "Read engineering insights and automation guides from THERUINS.";
    const keywords = post ? post.keywords.join(", ") : "AI, automation, engineering";
    const canonical = `https://theruins.in/blog/${params.slug}`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: keywords },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: canonical },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  component: BlogPostDetailPage,
});

function BlogPostDetailPage() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <SiteChrome>
        <div className="flex min-h-[60vh] items-center justify-center px-4 pt-32">
          <div className="max-w-md text-center">
            <h1 className="text-4xl font-bold text-white">Article Not Found</h1>
            <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)]">
              The article you're looking for doesn't exist or has been moved.
            </p>
            <div className="mt-6">
              <RouterLink
                to="/blog"
                className="inline-flex items-center gap-2 rounded-xl bg-[#F5C76A] px-4 py-2.5 text-xs font-semibold text-black"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Insights
              </RouterLink>
            </div>
          </div>
        </div>
      </SiteChrome>
    );
  }

  // Article JSON-LD Schema for AEO & GEO
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Organization",
      "name": post.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "THERUINS",
      "logo": {
        "@type": "ImageObject",
        "url": "https://stellar-labs.vercel.app/favicon.ico",
      },
    },
    "datePublished": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://theruins.in/blog/${post.slug}`,
    },
    "keywords": post.keywords.join(", "),
  };

  // FAQPage Schema for Answer Engine Optimization (AEO)
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.content.aeoFaq.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <SiteChrome>
      {/* Dynamic JSON-LD structured data for search engines & LLMs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <article className="relative pt-32 pb-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          {/* Back button */}
          <RouterLink
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-medium text-[var(--text-muted)] hover:text-[#F5C76A] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Insights
          </RouterLink>

          {/* Article Header */}
          <header className="mt-6 border-b border-[var(--border-subtle)] pb-8">
            <div className="flex items-center gap-2 text-xs font-mono text-[#F5C76A]">
              <span>{post.category}</span>
            </div>
            <h1 className="mt-3 font-display text-2xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white">
              {post.title}
            </h1>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
              {post.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-[#F5C76A]" />
                {post.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[#F5C76A]" />
                {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[#F5C76A]" />
                {post.readTime}
              </span>
            </div>
          </header>

          {/* Article Main Body */}
          <div className="mt-8 space-y-8 text-xs sm:text-base leading-relaxed text-[var(--text-primary)]">
            <p className="text-sm sm:text-lg leading-relaxed text-white font-medium">
              {post.content.intro}
            </p>

            {post.content.sections.map((section, i) => (
              <section key={i} className="space-y-4 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-white">
                  {section.heading}
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                  {section.body}
                </p>
                {section.bullets && (
                  <ul className="mt-3 space-y-2 pl-2">
                    {section.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#F5C76A]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* AEO / Answer Engine Q&A Block */}
            <div className="mt-12 rounded-2xl border border-[rgba(245,199,106,0.3)] bg-[radial-gradient(ellipse_at_top,rgba(245,199,106,0.08),rgba(15,18,24,0.9))] p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-mono text-[#F5C76A]">
                <HelpCircle className="h-4 w-4" />
                <span>Answer Engine Optimization (AEO) Insights</span>
              </div>
              <h3 className="mt-2 font-display text-lg sm:text-xl font-semibold text-white">
                Key Answers & Expert Takeaways
              </h3>

              <div className="mt-6 space-y-6">
                {post.content.aeoFaq.map((faq, idx) => (
                  <div key={idx} className="rounded-xl border border-[var(--border-subtle)] bg-[rgba(20,24,32,0.8)] p-5">
                    <h4 className="font-semibold text-sm sm:text-base text-white">Q: {faq.question}</h4>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Conclusion */}
            <div className="mt-8 pt-6 border-t border-[var(--border-subtle)]">
              <h3 className="font-display text-lg font-semibold text-white">Summary & Recommendation</h3>
              <p className="mt-2 text-sm sm:text-base text-[var(--text-secondary)]">
                {post.content.conclusion}
              </p>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-16 rounded-2xl border border-[var(--border-subtle)] bg-[rgba(15,18,24,0.8)] p-6 sm:p-10 text-center">
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-white">
              Want to Automate Your Business Operations?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)]">
              THERUINS builds custom AI agents, web applications, and workflow pipelines.
            </p>
            <div className="mt-6 flex justify-center">
              <MagneticButton href="mailto:hello@theruins.in" primary>
                Get Started with THERUINS
              </MagneticButton>
            </div>
          </div>
        </div>
      </article>
    </SiteChrome>
  );
}

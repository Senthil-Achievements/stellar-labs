import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome, FinalCta, FaqSection } from "@/components/Portfolio";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — THERUINS" },
      { name: "description", content: "Book a strategy call with THERUINS. Remote, worldwide, currently open for select engagements." },
      { property: "og:title", content: "Contact — THERUINS" },
      { property: "og:description", content: "Let's talk about what you're building. Book a strategy call with THERUINS." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteChrome showGlitter={false}>
      <div className="pt-32">
        <FinalCta />
        <FaqSection />
      </div>
    </SiteChrome>
  );
}

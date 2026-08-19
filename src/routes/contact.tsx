import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome, FinalCta, FaqSection } from "@/components/Portfolio";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us & Book Strategy Call — THERUINS" },
      {
        name: "description",
        content:
          "Ready to build your next competitive advantage? Contact THERUINS at hello@theruins.in or book a strategy call with our engineering team.",
      },
      {
        name: "keywords",
        content:
          "contact THERUINS, book strategy call, hire AI startup studio, contact hello@theruins.in, software consultation",
      },
      { property: "og:title", content: "Contact Us & Book Strategy Call — THERUINS" },
      {
        property: "og:description",
        content: "Let's talk about what you're building. Book a strategy call with THERUINS.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://theruins.in/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://theruins.in/contact" }],
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

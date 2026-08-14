import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome, Services, TechStack, FaqSection } from "@/components/Portfolio";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — THERUINS" },
      { name: "description", content: "AI websites, custom web apps, Flutter mobile apps, AI agents, automation, and brand identity — engineered end-to-end." },
      { property: "og:title", content: "Services — THERUINS" },
      { property: "og:description", content: "Products, platforms, and agents. Engineered end-to-end by THERUINS." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteChrome>
      <div className="pt-32">
        <Services />
        <TechStack />
        <FaqSection />
      </div>
    </SiteChrome>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome, Services, TechStack, FaqSection } from "@/components/Portfolio";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — THERUINS · AI Websites, Mobile Apps & Autonomous Agents" },
      {
        name: "description",
        content:
          "Explore services by THERUINS: Custom Web Apps, Flutter Mobile Apps, AI Agents, Workflow Automations, Growth Infrastructure, and Brand Identity.",
      },
      {
        name: "keywords",
        content:
          "AI web development services, Flutter app development, AI agent development, workflow automation services, SaaS engineering, THERUINS services",
      },
      { property: "og:title", content: "Services — THERUINS" },
      {
        property: "og:description",
        content: "Products, platforms, and agents. Engineered end-to-end by THERUINS.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://theruins.in/services" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://theruins.in/services" }],
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

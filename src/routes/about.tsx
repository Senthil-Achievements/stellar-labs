import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome, WhyUs, Testimonials, Industries } from "@/components/Portfolio";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — THERUINS" },
      {
        name: "description",
        content:
          "THERUINS is an AI startup studio building AI websites, mobile apps, automations, and agents for founders worldwide.",
      },
      { property: "og:title", content: "About — THERUINS" },
      {
        property: "og:description",
        content: "The team, the philosophy, and the way we build products at THERUINS.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteChrome>
      <div className="pt-32">
        <WhyUs />
        <Industries />
        <Testimonials />
      </div>
    </SiteChrome>
  );
}

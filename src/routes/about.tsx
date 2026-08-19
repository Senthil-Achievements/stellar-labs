import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome, WhyUs, Testimonials, Industries } from "@/components/Portfolio";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — THERUINS · AI Startup Studio & Engineering Philosophy" },
      {
        name: "description",
        content:
          "Learn how THERUINS combines software engineering, artificial intelligence, and agile execution to build high-impact digital products for founders worldwide.",
      },
      {
        name: "keywords",
        content: "about THERUINS, AI startup studio team, software engineering studio, AI development philosophy",
      },
      { property: "og:title", content: "About Us — THERUINS" },
      {
        property: "og:description",
        content: "The team, philosophy, and engineering standard behind THERUINS.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://theruins.in/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://theruins.in/about" }],
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

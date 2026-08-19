import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome, Process, TechStack } from "@/components/Portfolio";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Engineering Process — THERUINS · How We Build & Ship Products" },
      {
        name: "description",
        content:
          "From discovery and strategy to design, development, launch, and scale. Explore the transparent 6-stage engineering process at THERUINS.",
      },
      {
        name: "keywords",
        content:
          "software development process, agile AI studio process, product shipping framework, THERUINS engineering roadmap",
      },
      { property: "og:title", content: "Engineering Process — THERUINS" },
      {
        property: "og:description",
        content: "Discovery, Strategy, Design, Development, Launch, Scale — the way we build.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://theruins.in/process" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://theruins.in/process" }],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <SiteChrome>
      <div className="pt-32">
        <Process />
        <TechStack />
      </div>
    </SiteChrome>
  );
}

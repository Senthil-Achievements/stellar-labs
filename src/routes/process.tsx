import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome, Process, TechStack } from "@/components/Portfolio";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Process — THERUINS" },
      { name: "description", content: "How THERUINS ships product — from discovery to scale, with weekly demos and honest timelines." },
      { property: "og:title", content: "Process — THERUINS" },
      { property: "og:description", content: "Discovery, Strategy, Design, Development, Launch, Scale — the way we build." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
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

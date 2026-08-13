import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "THERUINS — AI Startup Studio · The Birthplace of Tomorrow" },
      {
        name: "description",
        content:
          "THERUINS builds AI websites, mobile apps, intelligent automations, and AI agents — complete digital infrastructure for businesses that scale globally.",
      },
      { property: "og:title", content: "THERUINS — The Birthplace of Tomorrow" },
      {
        property: "og:description",
        content:
          "AI websites, mobile apps, automations, and agents — built for businesses that scale.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

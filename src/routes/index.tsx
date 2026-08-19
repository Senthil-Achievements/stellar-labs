import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "THERUINS — AI Startup Studio · Software Engineering · Automations & Agents" },
      {
        name: "description",
        content:
          "THERUINS builds AI websites, custom web apps, mobile apps, intelligent automations, and autonomous AI agents — digital infrastructure built to scale globally.",
      },
      {
        name: "keywords",
        content:
          "AI startup studio, AI web development, AI agents, software engineering, Flutter mobile apps, custom web development, AI automation, THERUINS",
      },
      { property: "og:title", content: "THERUINS — The Birthplace of Tomorrow" },
      {
        property: "og:description",
        content:
          "AI websites, mobile apps, automations, and agents — built for businesses that scale globally.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://theruins.in/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "THERUINS — The Birthplace of Tomorrow" },
      {
        name: "twitter:description",
        content:
          "AI websites, mobile apps, automations, and agents — built for businesses that scale globally.",
      },
    ],
    links: [{ rel: "canonical", href: "https://theruins.in/" }],
  }),
  component: Portfolio,
});

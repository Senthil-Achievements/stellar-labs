import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome, Work, Testimonials } from "@/components/Portfolio";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Featured Work & Case Studies — THERUINS" },
      {
        name: "description",
        content:
          "Discover shipped digital products and AI platforms by THERUINS: BloodLink, MeetingStack, ResumeScan, Faculty Mark Register, and Vastra & Co.",
      },
      {
        name: "keywords",
        content:
          "THERUINS portfolio, software case studies, shipped AI products, client work, custom software examples",
      },
      { property: "og:title", content: "Featured Work & Case Studies — THERUINS" },
      {
        property: "og:description",
        content:
          "Featured case studies: BloodLink, MeetingStack, ResumeScan, Faculty Mark Register, Vastra & Co.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://theruins.in/work" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://theruins.in/work" }],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <SiteChrome>
      <div className="pt-32">
        <Work />
        <Testimonials />
      </div>
    </SiteChrome>
  );
}

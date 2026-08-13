import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome, Work, Testimonials } from "@/components/Portfolio";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — THERUINS" },
      {
        name: "description",
        content: "Featured case studies from THERUINS — real products shipped for real problems.",
      },
      { property: "og:title", content: "Work — THERUINS" },
      {
        property: "og:description",
        content:
          "Featured case studies: BloodLink, MeetingStack, ResumeScan, Faculty Mark Register, Vastra & Co.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
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

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "THERUINS — AI Startup Studio · Software Engineering · Automations & Agents" },
      {
        name: "description",
        content:
          "THERUINS builds AI websites, mobile apps, intelligent automations, and autonomous AI agents — complete digital infrastructure for businesses scaling globally.",
      },
      {
        name: "keywords",
        content:
          "AI startup studio, software engineering, AI automation, AI agents, Flutter mobile apps, React, Next.js, custom web apps, growth infrastructure, THERUINS",
      },
      { name: "author", content: "THERUINS" },
      { name: "publisher", content: "THERUINS" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "theme-color", content: "#0B0D12" },
      { name: "google-site-verification", content: "eVIySESIDtP8QQjRBde9c_lMWFbBI7BP-b61db3iSOU" },
      { property: "og:site_name", content: "THERUINS" },
      { property: "og:locale", content: "en_US" },
      { property: "og:title", content: "THERUINS — The Birthplace of Tomorrow" },
      {
        property: "og:description",
        content:
          "AI websites, mobile apps, intelligent automations, and AI agents — built for businesses that scale globally.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://theruins.in/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@theruins" },
      { name: "twitter:creator", content: "@theruins" },
      { name: "twitter:title", content: "THERUINS — The Birthplace of Tomorrow" },
      {
        name: "twitter:description",
        content: "AI startup studio building the digital infrastructure of tomorrow.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "canonical", href: "https://theruins.in/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://theruins.in/#organization",
        "name": "THERUINS",
        "legalName": "THERUINS AI Startup Studio",
        "url": "https://theruins.in/",
        "logo": "https://theruins.in/favicon.ico",
        "email": "hello@theruins.in",
        "sameAs": ["https://github.com/Senthil-Achievements"],
        "description":
          "THERUINS is an AI startup studio building AI websites, custom web apps, Flutter mobile apps, intelligent automations, and autonomous AI agents.",
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://theruins.in/#service",
        "name": "THERUINS — Software Engineering & AI Studio",
        "url": "https://theruins.in/",
        "priceRange": "$$",
        "email": "hello@theruins.in",
        "areaServed": "Worldwide",
        "knowsAbout": [
          "AI Startup Studio",
          "Software Engineering",
          "AI Automations",
          "AI Agents",
          "Flutter Mobile Apps",
          "Custom Web Development",
          "Growth Infrastructure",
        ],
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[#F5C76A] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
        >
          Skip to main content
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}

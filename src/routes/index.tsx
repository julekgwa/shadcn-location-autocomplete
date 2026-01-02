import { createFileRoute } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import HeroSection from "@/components/hero-section";
import { baseOptions } from "@/lib/layout.shared";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Shadcn Location Autocomplete",
      },
      {
        name: "description",
        content:
          "A provider-agnostic location autocomplete component built with Shadcn UI and Tailwind CSS.",
      },
      {
        property: "og:title",
        content: "Shadcn Location Autocomplete",
      },
      {
        property: "og:description",
        content:
          "A provider-agnostic location autocomplete component built with Shadcn UI and Tailwind CSS.",
      },
      {
        property: "og:url",
        content: `https://locn.juniusl.space${location.pathname === "/" ? "" : location.pathname}`,
      },
      {
        name: "twitter:url",
        content: `https://locn.juniusl.space${location.pathname === "/" ? "" : location.pathname}`,
      },
      {
        property: "og:image",
        content: "/og-facebook.webp",
      },
      {
        property: "og:image",
        content: "/og-linkedin.webp",
      },
      {
        property: "og:image",
        content: "/og-mastodon.webp",
      },
      {
        property: "og:image",
        content: "/og-bluesky.webp",
      },
      {
        property: "og:image",
        content: "/og-slack.webp",
      },
      {
        property: "og:image",
        content: "/og-discord.webp",
      },
      {
        property: "og:image",
        content: "/og-0.webp",
      },
      {
        name: "twitter:title",
        content: "Shadcn Location Autocomplete",
      },
      {
        name: "twitter:description",
        content:
          "A provider-agnostic location autocomplete component built with Shadcn UI and Tailwind CSS.",
      },
      {
        name: "twitter:image",
        content: "/og-twitter.webp",
      },
    ],
    scripts: [
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-HS8MSXE8ZL",
        async: true,
      },
      {
        src: "/gtag.js",
        async: true,
      }
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <HeroSection />
    </HomeLayout>
  );
}

import { TanStackDevtools } from "@tanstack/react-devtools";
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { RootProvider } from "fumadocs-ui/provider/tanstack";
import type * as React from "react";

import appCss from "@/styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
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
        property: "og:image:alt",
        content: "Shadcn Location Autocomplete",
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
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
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
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon-96x96.png",
        sizes: "96x96",
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/favicon.svg",
      },
      {
        rel: "shortcut icon",
        href: "/favicon.ico",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "manifest",
        href: "/site.webmanifest",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang={"en"} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}

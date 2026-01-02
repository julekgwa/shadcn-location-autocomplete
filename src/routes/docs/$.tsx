import browserCollections from "fumadocs-mdx:collections/browser";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useFumadocsLoader } from "fumadocs-core/source/client";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export const Route = createFileRoute("/docs/$")({
  component: Page,
  loader: async ({ params }) => {
    const slugs = params._splat?.split("/") ?? [];
    const data = await serverLoader({ data: slugs });
    await clientLoader.preload(data.path);
    return data;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.title,
      },
      {
        name: "description",
        content: loaderData?.description,
      },
      {
        property: "og:title",
        content: loaderData?.title,
      },
      {
        property: "og:description",
        content: loaderData?.description,
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
        content: loaderData?.title,
      },
      {
        name: "twitter:description",
        content: loaderData?.description,
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
});

const serverLoader = createServerFn({
  method: "GET",
})
  .inputValidator((slugs: Array<string>) => slugs)
  .handler(async ({ data: slugs }) => {
    const page = source.getPage(slugs);
    if (!page) throw notFound();

    return {
      title: page.data.title,
      description: page.data.description,
      path: page.path,
      pageTree: await source.serializePageTree(source.getPageTree()),
    };
  });

const clientLoader = browserCollections.docs.createClientLoader({
  component({ toc, frontmatter, default: MDX }) {
    return (
      <DocsPage toc={toc}>
        <DocsTitle>{frontmatter.title}</DocsTitle>
        <DocsDescription>{frontmatter.description}</DocsDescription>
        <DocsBody>
          <MDX
            components={{
              ...defaultMdxComponents,
            }}
          />
        </DocsBody>
      </DocsPage>
    );
  },
});

function Page() {
  const data = Route.useLoaderData();
  const { pageTree } = useFumadocsLoader(data);
  const Content = clientLoader.getComponent(data.path);

  return (
    <DocsLayout {...baseOptions()} tree={pageTree}>
      <Content />
    </DocsLayout>
  );
}

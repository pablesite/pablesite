import { getCollection } from "astro:content";
import type { Locale } from "@data/site";

export interface BlogPostListItem {
  title: string;
  href: string;
  description: string;
  meta: string;
}

const blogDateFormatters = {
  es: new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }),
  en: new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }),
} satisfies Record<Locale, Intl.DateTimeFormat>;

function sortByPublishDateDesc<T extends { data: { publishDate: Date } }>(
  entries: T[],
) {
  return entries.sort(
    (left, right) =>
      right.data.publishDate.getTime() - left.data.publishDate.getTime(),
  );
}

export function formatBlogDate(locale: Locale, date: Date) {
  return blogDateFormatters[locale].format(date);
}

function mapEntriesToListItems(
  locale: Locale,
  entries: {
    id: string;
    data: {
      title: string;
      description: string;
      publishDate: Date;
    };
  }[],
): BlogPostListItem[] {
  return sortByPublishDateDesc(entries).map((entry) => ({
    title: entry.data.title,
    href: `/${locale}/blog/${entry.id}/`,
    description: entry.data.description,
    meta: formatBlogDate(locale, entry.data.publishDate),
  }));
}

export async function getPublishedBlogPosts(
  locale: Locale,
): Promise<BlogPostListItem[]> {
  if (locale === "es") {
    const entries = await getCollection("blogEs", ({ data }) => !data.draft);
    return mapEntriesToListItems(locale, entries);
  }

  const entries = await getCollection("blogEn", ({ data }) => !data.draft);
  return mapEntriesToListItems(locale, entries);
}

export async function getLatestBlogPosts(locale: Locale, limit = 3) {
  return (await getPublishedBlogPosts(locale)).slice(0, limit);
}

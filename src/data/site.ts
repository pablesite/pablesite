export type Locale = "es" | "en";

export const defaultLocale: Locale = "es";
export const locales: Locale[] = ["es", "en"];

export const site = {
  name: "pablesite.es",
  author: "Pablo Ruiz",
  location: {
    es: "Murcia, España",
    en: "Murcia, Spain",
  },
  baseUrl: "https://pablesite.es",
  avatar: "/avatar_pixelart_48px.png",
  email: "mailto:hola@pablesite.es",
  links: {
    github: "https://github.com/pableras",
    linkedin: "https://www.linkedin.com/in/pableras",
    x: "https://x.com/pableras",
  },
};

export const nav = {
  es: [
    { href: "/es/arda/", label: "Arda" },
    { href: "/es/arkenstone/", label: "Arkenstone" },
    { href: "/es/blog/", label: "Blog" },
    { href: "/es/cv/", label: "CV" },
    { href: "/es/contact/", label: "Contacto" },
  ],
  en: [
    { href: "/en/arda/", label: "Arda" },
    { href: "/en/arkenstone/", label: "Arkenstone" },
    { href: "/en/blog/", label: "Blog" },
    { href: "/en/cv/", label: "CV" },
    { href: "/en/contact/", label: "Contact" },
  ],
} satisfies Record<Locale, { href: string; label: string }[]>;

export function localizePath(locale: Locale, path = "") {
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `/${locale}/${normalized}`;
}

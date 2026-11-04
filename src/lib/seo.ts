const head = document.head;

const setMeta = (name: string, content: string, prop?: boolean) => {
  const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let el = head.querySelector<HTMLMetaElement>(sel);
  if (!el) {
    el = document.createElement("meta");
    prop ? el.setAttribute("property", name) : el.setAttribute("name", name);
    head.appendChild(el);
  }
  el.setAttribute("content", content);
};

export const setPageSeo = ({
  title,
  description,
  canonicalUrl,
  ogTitle,
  ogDescription,
  keywords,
  robots = "index, follow",
}: {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  keywords?: string;
  robots?: string;
}) => {
  document.title = title;
  setMeta("description", description);
  if (keywords) {
    setMeta("keywords", keywords);
  } else {
    head.querySelector('meta[name="keywords"]')?.remove();
  }
  setMeta("robots", robots);
  setMeta("og:type", "website", true);
  setMeta("og:site_name", "Art Interiorz", true);
  setMeta("og:title", ogTitle ?? title, true);
  setMeta("og:description", ogDescription ?? description, true);
  setMeta("og:image", "https://www.artinteriorz.com/opengraph.jpg", true);
  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", ogTitle ?? title);
  setMeta("twitter:description", ogDescription ?? description);
  setMeta("twitter:image", "https://www.artinteriorz.com/opengraph.jpg");

  let canonical = head.querySelector<HTMLLinkElement>("link[rel='canonical']");
  if (canonicalUrl && !canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    head.appendChild(canonical);
  }

  if (canonicalUrl && canonical) {
    canonical.href = canonicalUrl;
    setMeta("og:url", canonicalUrl, true);
  } else {
    canonical?.remove();
    head.querySelector('meta[property="og:url"]')?.remove();
  }
};

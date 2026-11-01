import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

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

const addGoogleTagManager = () => {
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-PSKQ0FJG89";
  head.appendChild(script);

  const inline = document.createElement("script");
  inline.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-PSKQ0FJG89');
  `;
  head.appendChild(inline);
};

document.title = "Best Interior Designer in Nagpur | Art Interiorz";

setMeta("description", "Nagpur's leading interior design studio since 2017. 600+ happy clients, 650+ projects. Residential, modular kitchen & turnkey interiors. Get a free quote today.");
setMeta("keywords", "interior designer nagpur, best interior design nagpur, modular kitchen nagpur, home interior design nagpur, art interiorz");
setMeta("author", "Art Interiorz");
setMeta("robots", "index, follow");

setMeta("og:type", "website", true);
setMeta("og:title", "Best Interior Designer in Nagpur | Art Interiorz", true);
setMeta("og:description", "Nagpur's leading interior design studio since 2017. 600+ happy clients, 650+ projects. Residential, modular kitchen & turnkey interiors.", true);
setMeta("og:url", "https://www.artinteriorz.com/", true);
setMeta("og:image", "/opengraph.jpg", true);

setMeta("twitter:card", "summary_large_image");
setMeta("twitter:title", "Best Interior Designer in Nagpur | Art Interiorz");
setMeta("twitter:description", "Nagpur's leading interior design studio since 2017. 600+ happy clients, 650+ projects.");

const canonical = document.createElement("link");
canonical.rel = "canonical";
canonical.href = "https://www.artinteriorz.com/";
head.appendChild(canonical);

addGoogleTagManager();

createRoot(document.getElementById("root")!).render(<App />);

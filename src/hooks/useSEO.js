import { useEffect } from 'react';

export function useSEO({ title, description, canonical, image }) {
  useEffect(() => {
    document.title = title;

    let desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', description);

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonical);

    if (image) {
      let ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) ogImage.setAttribute('content', image);

      let twImage = document.querySelector('meta[name="twitter:image"]');
      if (twImage) twImage.setAttribute('content', image);
    }

    let twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', title);

    let twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', description);

    let canon = document.querySelector('link[rel="canonical"]');
    if (canon) canon.setAttribute('href', canonical);
  }, [title, description, canonical, image]);
}

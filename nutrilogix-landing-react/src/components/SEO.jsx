import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SEO({ title, description, image, type = 'website' }) {
  const location = useLocation();
  const url = `https://nutrilogix.app${location.pathname}`;

  useEffect(() => {
    // Update Title
    document.title = title;

    // Update Meta Tags
    const metaTags = {
      description: document.querySelector('meta[name="description"]'),
      ogTitle: document.querySelector('meta[property="og:title"]'),
      ogDescription: document.querySelector('meta[property="og:description"]'),
      ogUrl: document.querySelector('meta[property="og:url"]'),
      ogType: document.querySelector('meta[property="og:type"]'),
      // Twitter can be added similarly if needed
    };

    if (metaTags.description) metaTags.description.setAttribute('content', description);
    if (metaTags.ogTitle) metaTags.ogTitle.setAttribute('content', title);
    if (metaTags.ogDescription) metaTags.ogDescription.setAttribute('content', description);
    if (metaTags.ogUrl) metaTags.ogUrl.setAttribute('content', url);
    if (metaTags.ogType) metaTags.ogType.setAttribute('content', type);

    // Optional: Add Schema.org JSON-LD here if passed as prop

  }, [title, description, image, type, url]);

  return null;
}

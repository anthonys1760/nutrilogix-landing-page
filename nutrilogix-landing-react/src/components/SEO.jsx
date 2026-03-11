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
      ogImage: document.querySelector('meta[property="og:image"]'),
      twitterTitle: document.querySelector('meta[name="twitter:title"]'),
      twitterDescription: document.querySelector('meta[name="twitter:description"]'),
      twitterImage: document.querySelector('meta[name="twitter:image"]'),
    };

    if (metaTags.description) metaTags.description.setAttribute('content', description);
    if (metaTags.ogTitle) metaTags.ogTitle.setAttribute('content', title);
    if (metaTags.ogDescription) metaTags.ogDescription.setAttribute('content', description);
    if (metaTags.ogUrl) metaTags.ogUrl.setAttribute('content', url);
    if (metaTags.ogType) metaTags.ogType.setAttribute('content', type);
    if (image) {
      if (metaTags.ogImage) metaTags.ogImage.setAttribute('content', image);
      if (metaTags.twitterImage) metaTags.twitterImage.setAttribute('content', image);
    }
    if (metaTags.twitterTitle) metaTags.twitterTitle.setAttribute('content', title);
    if (metaTags.twitterDescription) metaTags.twitterDescription.setAttribute('content', description);

  }, [title, description, image, type, url]);

  return null;
}

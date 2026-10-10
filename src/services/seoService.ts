/**
 * Route-aware SEO metadata manager for Dento Care.
 * Safely manages <title>, meta description, canonical URLs, Open Graph, and JSON-LD structured data per route.
 */

interface RouteMetadata {
  title: string;
  description: string;
  canonical?: string;
  robots?: string;
  ogType?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
}

const SITE_URL = 'https://dentocareofficial.com';

const ROUTE_CONFIG: Record<string, RouteMetadata> = {
  '/': {
    title: 'Dento Care Dental Clinic | Best Dentist in Ponnani, Kerala',
    description: 'Dento Care Dental Clinic in Ponnani, Kerala offers trusted dental care, advanced treatments, and personalized treatment for healthy, confident smiles.',
    canonical: `${SITE_URL}/`,
    robots: 'index, follow',
    ogType: 'website',
    ogImage: `${SITE_URL}/images/dento-care-og.jpg`,
    ogTitle: 'Dento Care Dental Clinic | Best Dentist in Ponnani, Kerala',
    ogDescription: 'Dento Care Dental Clinic in Ponnani, Kerala offers trusted dental care, advanced treatments, and personalized treatment for healthy, confident smiles.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy — Dento Care Dental Clinic',
    description: 'Privacy Policy for Dento Care Dental Clinic. Learn how we handle appointment requests, patient information, and security practices.',
    canonical: `${SITE_URL}/privacy-policy`,
    robots: 'index, follow',
    ogType: 'website',
  },
  '/terms': {
    title: 'Terms of Use — Dento Care Dental Clinic',
    description: 'Terms of Use for Dento Care Dental Clinic. Review website terms, appointment request conditions, medical disclaimers, and user guidelines.',
    canonical: `${SITE_URL}/terms`,
    robots: 'index, follow',
    ogType: 'website',
  },
  '/feedback': {
    title: 'Patient Feedback & Reviews — Dento Care Dental Clinic',
    description: 'Share your patient experience and read authentic reviews for Dento Care Dental Clinic in Ponnani, Kerala.',
    canonical: `${SITE_URL}/feedback`,
    robots: 'index, follow',
    ogType: 'website',
  },
  '/blog': {
    title: 'Dental Insights & Oral Health Blog — Dento Care Dental Clinic',
    description: 'Explore clinical dental articles, patient education, and oral health guidance authored by dental specialists at Dento Care.',
    canonical: `${SITE_URL}/blog`,
    robots: 'index, follow',
    ogType: 'website',
    ogImage: `${SITE_URL}/images/dento-care-og.jpg`,
    ogTitle: 'Dental Insights & Oral Health Blog — Dento Care Dental Clinic',
    ogDescription: 'Explore clinical dental articles, patient education, and oral health guidance authored by dental specialists at Dento Care.',
  },
  '/blog/sharp-teeth-oral-cancer-awareness': {
    title: '“മൂർച്ചയേറിയ പല്ലുകൾ നിസ്സാരമാക്കരുത്” — Dr. Abdulla Mufeed | Dento Care',
    description: 'Dr. Abdulla Mufeed, MDS (Oral Medicine & Radiology) explains the clinical importance of addressing sharp, broken teeth and chronic oral mucosal irritation.',
    canonical: `${SITE_URL}/blog/sharp-teeth-oral-cancer-awareness`,
    robots: 'index, follow',
    ogType: 'article',
    ogImage: `${SITE_URL}/images/blog/sharp-teeth-tongue-lesion-main.png`,
    ogTitle: '“മൂർച്ചയേറിയ പല്ലുകൾ നിസ്സാരമാക്കരുത്” — Dr. Abdulla Mufeed',
    ogDescription: 'Dr. Abdulla Mufeed, MDS (Oral Medicine & Radiology) explains why chronic mucosal irritation from sharp teeth requires timely clinical evaluation.',
  },
  '/admin': {
    title: 'Administrator Portal — Dento Care Dental Clinic',
    description: 'Secure staff administration portal for Dento Care Dental Clinic.',
    canonical: undefined, // Must NOT point to homepage
    robots: 'noindex, nofollow',
  },
};

const setMetaTag = (selector: string, attr: string, value: string): void => {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    if (selector.startsWith('meta[name=')) {
      const name = selector.match(/name="([^"]+)"/)?.[1];
      if (name) el.setAttribute('name', name);
    } else if (selector.startsWith('meta[property=')) {
      const prop = selector.match(/property="([^"]+)"/)?.[1];
      if (prop) el.setAttribute('property', prop);
    }
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

export const updateRouteSEO = (pathname: string): void => {
  if (typeof document === 'undefined') return;

  // Normalize path (strip trailing slash except root)
  const normalizedPath = pathname.length > 1 && pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : (pathname || '/');

  const config = ROUTE_CONFIG[normalizedPath] || {
    title: 'Page Not Found — Dento Care Dental Clinic',
    description: 'The page you are looking for may have been moved or removed. Return to Dento Care Dental Clinic homepage.',
    canonical: undefined,
    robots: 'noindex, nofollow',
  };

  // 1. Title
  document.title = config.title;

  // 2. Meta Description
  setMetaTag('meta[name="description"]', 'content', config.description);

  // 3. Canonical Tag
  let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (config.canonical) {
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', config.canonical);
  } else if (canonicalLink) {
    canonicalLink.remove();
  }

  // 4. Meta Robots
  let metaRobots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
  if (config.robots) {
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', config.robots);
  } else if (metaRobots) {
    metaRobots.remove();
  }

  // 5. Open Graph Metadata
  setMetaTag('meta[property="og:title"]', 'content', config.ogTitle || config.title);
  setMetaTag('meta[property="og:description"]', 'content', config.ogDescription || config.description);
  setMetaTag('meta[property="og:type"]', 'content', config.ogType || 'website');
  if (config.canonical) {
    setMetaTag('meta[property="og:url"]', 'content', config.canonical);
  }
  if (config.ogImage) {
    setMetaTag('meta[property="og:image"]', 'content', config.ogImage);
  }

  // 6. Article Structured Data (BlogPosting) for the clinical article
  const structuredDataId = 'article-structured-data';
  const existingScript = document.getElementById(structuredDataId);

  if (normalizedPath === '/blog/sharp-teeth-oral-cancer-awareness') {
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'മൂർച്ചയേറിയ പല്ലുകൾ നിസ്സാരമാക്കരുത്',
      description: 'Dr. Abdulla Mufeed, MDS (Oral Medicine & Radiology) explains the clinical importance of addressing sharp, broken teeth and chronic oral mucosal irritation.',
      image: `${SITE_URL}/images/blog/sharp-teeth-tongue-lesion-main.png`,
      inLanguage: 'ml',
      author: {
        '@type': 'Person',
        name: 'Dr. Abdulla Mufeed',
        jobTitle: 'Associate Professor in Oral Medicine & Radiology',
        affiliation: {
          '@type': 'EducationalOrganization',
          name: 'MES Dental College, Perinthalmanna',
        },
      },
      publisher: {
        '@type': 'Dentist',
        name: 'Dento Care Dental Clinic',
        url: SITE_URL,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/blog/sharp-teeth-oral-cancer-awareness`,
      },
    };

    if (existingScript) {
      existingScript.textContent = JSON.stringify(articleSchema);
    } else {
      const script = document.createElement('script');
      script.id = structuredDataId;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(articleSchema);
      document.head.appendChild(script);
    }
  } else if (existingScript) {
    existingScript.remove();
  }
};

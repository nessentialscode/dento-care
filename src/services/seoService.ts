/**
 * Route-aware SEO metadata manager for Dento Care.
 * Safely manages <title>, meta description, canonical URLs, and robots directives per route.
 */

interface RouteMetadata {
  title: string;
  description: string;
  canonical?: string;
  robots?: string;
}

const SITE_URL = 'https://dentocareofficial.com';

const ROUTE_CONFIG: Record<string, RouteMetadata> = {
  '/': {
    title: 'Dento Care Dental Clinic | Best Dentist in Ponnani, Kerala',
    description: 'Dento Care Dental Clinic in Ponnani, Kerala offers trusted dental care, advanced treatments, and personalized treatment for healthy, confident smiles.',
    canonical: `${SITE_URL}/`,
    robots: 'index, follow',
  },
  '/privacy-policy': {
    title: 'Privacy Policy — Dento Care Dental Clinic',
    description: 'Privacy Policy for Dento Care Dental Clinic. Learn how we handle appointment requests, patient information, and security practices.',
    canonical: `${SITE_URL}/privacy-policy`,
    robots: 'index, follow',
  },
  '/terms': {
    title: 'Terms of Use — Dento Care Dental Clinic',
    description: 'Terms of Use for Dento Care Dental Clinic. Review website terms, appointment request conditions, medical disclaimers, and user guidelines.',
    canonical: `${SITE_URL}/terms`,
    robots: 'index, follow',
  },
  '/feedback': {
    title: 'Patient Feedback & Reviews — Dento Care Dental Clinic',
    description: 'Share your patient experience and read authentic reviews for Dento Care Dental Clinic in Ponnani, Kerala.',
    canonical: `${SITE_URL}/feedback`,
    robots: 'index, follow',
  },
  '/admin': {
    title: 'Administrator Portal — Dento Care Dental Clinic',
    description: 'Secure staff administration portal for Dento Care Dental Clinic.',
    canonical: undefined, // Must NOT point to homepage
    robots: 'noindex, nofollow',
  },
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
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', config.description);

  // 3. Canonical Tag (no duplicates, strictly route-specific, remove on /admin)
  let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (config.canonical) {
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', config.canonical);
  } else if (canonicalLink) {
    // If route should not have canonical (e.g., /admin, 404), remove it to prevent incorrect homepage indexing
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
};

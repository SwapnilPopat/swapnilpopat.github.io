// Service Worker for Swapnil Popat Portfolio (swapnilpopat.github.io)
// ⚠️  VERSION SYNC: When bumping CACHE_NAME, also update the CSS query string
//     in index.html / resume/index.html  (?v=X.Y)  and vice-versa, so cached
//     assets are always invalidated together.
const CACHE_NAME = 'sp-portfolio-v1.7';

const SHELL_ASSETS = [
  '/',
  '/index.html',
  '/projects/',
  '/projects/index.html',
  '/writing/',
  '/writing/index.html',
  '/architecture-notes/',
  '/architecture-notes/index.html',
  '/resume/',
  '/resume/index.html',
  '/404.html',
  '/manifest.json',
  '/assets/css/style.min.css?v=1.6',
  '/assets/js/main.js',
  '/assets/js/analytics-events.js',
  '/assets/img/favicon.svg',
  '/assets/img/apple-touch-icon.png',
  '/assets/img/profile.webp',
  '/assets/img/og-image.png'
];

// Install: Cache Shell Assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(SHELL_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up outdated cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Strategy depending on request type
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip analytics, external tracking, and non-GET requests
  if (
    event.request.method !== 'GET' ||
    url.hostname.includes('google-analytics.com') ||
    url.hostname.includes('googletagmanager.com')
  ) {
    return;
  }

  // Navigation requests: Network-first with offline cache fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(async () => {
          let cachedResponse = await caches.match(event.request);
          if (!cachedResponse) {
            const cleanPath = url.pathname.replace(/\/$/, '');
            cachedResponse = await caches.match(cleanPath + '/') || 
                             await caches.match(cleanPath + '/index.html') ||
                             await caches.match(cleanPath);
          }
          if (cachedResponse) return cachedResponse;
          return caches.match('/404.html');
        })
    );
    return;
  }

  // Static Assets (CSS, JS, Fonts, Images): Stale-While-Revalidate
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});

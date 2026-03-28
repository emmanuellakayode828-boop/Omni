const CACHE_NAME = 'omni-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/science-hub.html',
  '/bio-std.html',
  '/math-hub.html',
  '/gloobie.js',
  'https://cdn.tailwindcss.com'
];

// Install the Service Worker and Cache Files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Serve files from Cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
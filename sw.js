// Boraine MedTrack Air-Gapped Offline Service Worker
const CACHE_NAME = 'boraine-medtrack-v5.5';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './vendor/react.min.js',
  './vendor/react-dom.min.js',
  './vendor/babel.min.js',
  './vendor/tailwind.js',
  './vendor/supabase.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).catch(() => caches.match('./index.html'));
    })
  );
});

const CACHE_NAME = "ws-ref-cache-v1";
const TO_CACHE = [
  '/ws-ref/',
  '/ws-ref/index.html',
  '/ws-ref/manifest.json',
  '/ws-ref/icon.png',
  '/ws-ref/icon-512.png',
  '/ws-ref/192-icon.png',
  '/ws-ref/sound.mp3'
  // Add other assets as needed
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => 
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

self.addEventListener("notificationclick", function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/ws-ref/")
  );
});

const CACHE_NAME = "powerfight-v1";

const FILES = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/fundo-mulher.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

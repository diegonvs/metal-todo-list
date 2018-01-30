const CACHE_NAME = 'metal-todo-list-static-v1';

const urlsToCache = [
    'img/cats.jpg',
    '../demos/index.html',
    '../build/globals/todo-list.js',
    'img/icon.jpg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
               return cache.addAll(urlsToCache);
            })
    );
});


self.addEventListener('activate', function activator(event) {
    event.waitUntil(
      caches.keys().then(function (keys) {
        return Promise.all(keys
          .filter(function (key) {
            return key.indexOf(CACHE_NAME) !== 0;
          })
          .map(function (key) {
            return caches.delete(key);
          })
        );
      })
    );
  });

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (cachedResponse) {
        return cachedResponse || fetch(event.request);
        })
    );
});
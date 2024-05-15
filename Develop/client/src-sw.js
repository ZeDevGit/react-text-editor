const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');
const { setConfig } = require('workbox-core');

// Enable logging in the service worker
setConfig({ debug: true });

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', async () => {
  try {
    const cachedResponse = await pageCache.handle({ request });
    if (cachedResponse) {
      return cachedResponse;
    }
    return await fetch(request);
  } catch (error) {
    return caches.match('/index.html');
  }
});

// TODO: Implement asset caching
registerRoute(
  // Add a filter to cache only requests for styles, scripts, and images.
  ({ request }) => request.destination === 'style' || request.destination === 'script' || request.destination === 'image',
  // Use a CacheFirst strategy with a cache name of 'image-cache'.
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);

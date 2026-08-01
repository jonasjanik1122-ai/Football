const CACHE="soccer-draw-v1";

const FILES=[
 "./",
 "./index.html",
 "./manifest.json",
 "./icon-192.png",
 "./icon-512.png"
];

self.addEventListener("install",event=>{
 event.waitUntil(
  caches.open(CACHE).then(cache=>{
   return cache.addAll(FILES);
  })
 );
});

self.addEventListener("activate",event=>{
 event.waitUntil(
  caches.keys().then(keys=>{
   return Promise.all(
    keys
     .filter(key=>key!==CACHE)
     .map(key=>caches.delete(key))
   );
  })
 );
});

self.addEventListener("fetch",event=>{
 event.respondWith(
  caches.match(event.request).then(cached=>{
   return cached || fetch(event.request);
  })
 );
});

const CACHE = 'sga-puc-v3'
const PRECACHE = ['/']

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)))
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return

  const url = new URL(e.request.url)

  // Nunca cachear API, index.html, sw.js e bundles JS/CSS
  const neverCache =
    url.pathname.startsWith('/api/') ||
    url.pathname === '/index.html' ||
    url.pathname === '/sw.js' ||
    url.pathname.startsWith('/assets/')

  if (neverCache) {
    e.respondWith(fetch(e.request))
    return
  }

  // Cache first para imagens estaticas
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const network = fetch(e.request).then((res) => {
        if (res.ok) {
          const clone = res.clone()
          caches.open(CACHE).then((c) => c.put(e.request, clone))
        }
        return res
      })
      return cached || network
    })
  )
})

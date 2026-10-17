const CACHE = 'sga-puc-v4'

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE))
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

  // Nunca cachear API, páginas HTML, sw.js e bundles JS/CSS.
  // O HTML aponta para arquivos com hash; guardá-lo em cache pode apontar
  // para um bundle removido depois de um novo deploy e deixar a tela branca.
  const neverCache =
    url.pathname.startsWith('/api/') ||
    e.request.mode === 'navigate' ||
    url.pathname === '/' ||
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

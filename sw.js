const namaCache = 'editor-v6'; // Ganti v1 jadi v2 biar browser sadar ada update

const fileWajib = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  // Langsung aktifkan satpam baru tanpa nunggu browser ditutup (Skip Waiting)
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(namaCache).then((cache) => {
      return Promise.all(
        fileWajib.map((url) => {
          // fetch(url) dulu untuk memastikan filenya benar-benar ada
          return fetch(url).then((response) => {
            if (!response.ok) throw new Error('File tidak ketemu: ' + url);
            return cache.put(url, response);
          }).catch(err => console.log('Gagal ambil: ', url));
        })
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  // Hapus cache lama (v1) kalau ada, biar gak menuh-menuhin memori
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== namaCache).map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

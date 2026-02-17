const namaCache = 'editor-v1';

// CUMA MASUKIN YANG PASTI ADA DI REPO GITHUB ABANG
const fileWajib = [
  './',
  './index.html',
  './manifest.json'
];

// Bagian install (Kita tambahin console log biar ketahuan mana yang bikin macet)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(namaCache).then((cache) => {
      console.log('Satpam lagi kerja...');
      // Kita pakai satu-satu biar kalau ada yang gagal, sisanya tetep aman
      return Promise.all(
        fileWajib.map((url) => {
          return cache.add(url).catch((err) => console.log('File ini gagal diambil: ' + url));
        })
      );
    })
  );
});

// Sisa kode fetch tetap sama
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

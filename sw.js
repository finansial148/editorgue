const namaCache = 'editor-v1';

// Daftar file yang mau disimpan biar bisa dibuka offline
// Pastikan nama filenya persis dengan yang ada di GitHub Abang
const fileWajib = [
  './',
  './index.html',
  './manifest.json',
  // Kalau Abang punya file CSS atau JS terpisah, masukin di sini ya
  // './style.css',
  // './script.js'
];

// 1. Proses Instalasi (Nabung file ke memori)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(namaCache).then((cache) => {
      console.log('Satpam lagi ngetik file ke memori...');
      return cache.addAll(fileWajib);
    })
  );
});

// 2. Proses Pengambilan (Kalau offline, ambil dari memori)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Kalau ada di memori, kasih. Kalau nggak ada, baru cari ke internet.
      return response || fetch(event.request);
    })
  );
});

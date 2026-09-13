const V='bearings-v13';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png',
  './css/app.css?v=13','./js/app.js?v=13',
  './js/data/world.js?v=13','./js/data/states.js?v=13','./js/data/cities.js?v=13','./js/data/features.js?v=13',
  './js/data/landmarks.js?v=13','./js/data/maps.js?v=13','./js/data/capitals.js?v=13','./js/data/lib.js?v=13','./js/data/sets.js?v=13'];
const REMOTE={'flagcdn.com':'flags','fonts.googleapis.com':'fonts','fonts.gstatic.com':'fonts'};
self.addEventListener('install',e=>{ e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k!=='flags'&&k!=='fonts').map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  const bucket=REMOTE[u.hostname];
  if(bucket){ e.respondWith(caches.open(bucket).then(async c=>{ const hit=await c.match(e.request); if(hit) return hit; try{ const r=await fetch(e.request); if(r.ok||r.type==='opaque') c.put(e.request,r.clone()); return r; }catch(err){ return new Response('',{status:404}); } })); return; }
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{ if(e.request.method==='GET'&&u.origin===location.origin){ const cp=r.clone(); caches.open(V).then(c=>c.put(e.request,cp)); } return r; }).catch(()=>caches.match('./index.html'))));
});

const V='bearings-v9';
self.addEventListener('install',e=>{ e.waitUntil(caches.open(V).then(c=>c.addAll(['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png']))); self.skipWaiting(); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.hostname==='flagcdn.com'){ e.respondWith(caches.open('flags').then(async c=>{ const hit=await c.match(e.request); if(hit) return hit; try{ const r=await fetch(e.request); c.put(e.request,r.clone()); return r; }catch(err){ return new Response('',{status:404}); } })); return; }
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{ if(e.request.method==='GET'&&u.origin===location.origin){ const cp=r.clone(); caches.open(V).then(c=>c.put(e.request,cp)); } return r; }).catch(()=>caches.match('./index.html'))));
});
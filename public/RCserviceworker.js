

const cacheName = 'v10';
const self = this;

// eslint-disable-next-line 
const ignored = self.__WB_MANIFEST;

self.addEventListener('install', e => {
    console.log('installed')
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            cache.add('./index.html')
        }).catch(err => {
            console.log(err)
        })
    );
})

self.addEventListener('activate', e => {
    console.log('activated');
    e.waitUntil(
        caches.keys().then(cacheNames => {
            Promise.all(
                cacheNames.map(name => {
                    if(name !== cacheName) {
                        return caches.delete(name)
                    }
                    return null
                })
            )
        })
    )
})

self.addEventListener('fetch', e => {
    console.log("fetching")
    console.log(e.request.url)
    if (e.request.mode === 'navigate') {
        console.log(e.request.url)
        e.respondWith(fetch(e.request).then(
            res => res
        ).catch(
            async err => {
                let cache = await caches.open(cacheName);
                let offlineRespond = await cache.match('./index.html');
                return offlineRespond;
            }
        ))
    } 
    else {
        e.respondWith(fetch(e.request).then(
            res => {
                const reaClone = res.clone();
                caches.open(cacheName).then(cache => {
                    cache.put(e.request, reaClone);
                })
                return res
            }
            ).catch(
            async err => {
                console.log(err);
                console.log("fetching from cache")
                let cache = await caches.open(cacheName);
                let offlineRespond = await cache.match(e.request);
                return offlineRespond;
            }
        )
        );
    }
   
})
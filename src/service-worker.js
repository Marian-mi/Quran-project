
const cacheName = 'v1';

//eslint-disable-next-line
self.addEventListener('install', e => {
    // console.log('installed')
    // e.waitUntil(
    //     caches.open(cacheName).then(cache => {
    //         cache.add('./index.html')
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // );
})
//eslint-disable-next-line
self.addEventListener('activate', e => {
    console.log('activated');
    e.waitUntil(
        caches.keys().then(cacheNames => {
            Promise.all(
                //eslint-disable-next-line
                cacheNames.map(name => {
                    if(name !== cacheName) {
                        return caches.delete(name)
                    }
                })
            )
        })
    )
})
//eslint-disable-next-line
self.addEventListener('fetch', e => {
    console.log("fetching")
    console.log(e.request.url)
    
    
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
})

// if(e.request.url === 'https://marian-mi.github.io/holyquran') {
//         console.log(e.request.url)
//         e.respondWith(fetch(e.request).then(
//             res => res
//         ).catch(async error => {
//             console.log(err, 'serving from cache')
//             let cache = await caches.open(cacheName);
//             let offRespond = await cache.match('./index.html');
//             return offRespond
//         }))
//     }
//     if (e.request.mode === 'navigate') {
//         console.log(e.request.url)
//         e.respondWith(fetch(e.request).then(
//             res => res
//         ).catch(
//             async err => {
//                 let cache = await caches.open(cacheName);
//                 let offlineRespond = await cache.match('./index.html');
//                 return offlineRespond;
//             }
//         ))
//     } 

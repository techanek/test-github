const express = require('express');
const request = require('request'); // or node-fetch
const geoip = require('geoip-lite'); // fast offline GeoIP

const app = express();
const APP_HOST = '127.0.0.1';
const APP_PORT = 8080;

app.use((req, res) => {
    // Get real client IP
    const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;

    // GeoIP lookup
    const geo = geoip.lookup(ip) || {};
    const country = geo.country || 'unknown';
    const city = geo.city || 'unknown';

    // Forward request to main app
    const url = `http://${APP_HOST}:${APP_PORT}${req.originalUrl}`;
    const headers = Object.assign({}, req.headers, {
        'X-Geo-Country': country,
        'X-Geo-City': city
    });

    req.pipe(request({ url, headers })).pipe(res);
});

app.listen(9000, () => console.log('GeoIP sidecar running on 9000'));

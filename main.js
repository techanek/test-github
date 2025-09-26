const express = require('express');
const app = express();

// catch all routes safely
app.use((req, res) => {
	const country = req.headers['x-geo-country'] || 'none';
	const city = req.headers['x-geo-city'] || 'none';
	const ip = req.headers['x-geo-ip'] || 'unknown';
	res.send(`Main app received X-Geo-Country=${country}, X-Geo-City=${city}, X-Geo-IP=${ip}`);
});

app.listen(8080, () => console.log('Main app running on 8080'));

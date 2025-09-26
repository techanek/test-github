const express = require('express');
const app = express();

// catch all routes safely
app.use((req, res) => {
    res.send(`Main app received X-Geo-Country=${req.headers['x-geo-country'] || 'none'}, X-Geo-City=${req.headers['x-geo-city'] || 'none'}`);
});

app.listen(8080, () => console.log('Main app running on 8080'));

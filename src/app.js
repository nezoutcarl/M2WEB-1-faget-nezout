const express = require('express');

const request = require('request');

const morgan = require('morgan');

const cors = require('cors');

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(morgan('tiny'));

app.use(cors());

app.get('/', function(req, res, next) {
    res.render('./public/index.html');
});

app.get('/test', function(req, res) {
    request('https://world.openfoodfacts.org/api/v0/product/737628064502.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            res.send(info.product.image_url);
        }
    });
});

app.use(function(req, res, next) {
    res.status(404).send('Page not found!');
});

app.listen(8080, function() {
    console.log('Example app listening on port 8080!');
});

const express = require('express');

const request = require('request');

const bodyParser = require('body-parser');

const morgan = require('morgan');

const cors = require('cors');


const app = express();

/* ***** DB Connection ***** */
const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = "mongodb://admin:m2webadmin@ds115094.mlab.com:15094/m2web-db" ;


MongoClient.connect(MONGO_URL, {useNewUrlParser: true}).then(
          () => {console.log('Database connection is successful') },
          err => { console.log('Error when connecting to the database'+ err)}
);

/*  ******************* */
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use(morgan('combined'));
app.use(bodyParser.json())

app.use(cors());



app.get('/test', function(req, res) {
    request('https://world.openfoodfacts.org/api/v0/product/737628064502.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            res.send({
                img: info.product.image_url
            });
        }
    });
});

app.get('/posts', (req,res)=> {
    res.send(
        [{
            title: "Hello World",
            description: "Hi there! How are you ?"
        }]
    )
})

app.use(function(req, res, next) {
    res.status(404).send('Page not found!');
});

app.listen(8081, function() {
    console.log('Server app listening on port 8081!');
});

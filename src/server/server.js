const express = require('express');

const request = require('request');

const bodyParser = require('body-parser');

const morgan = require('morgan');

const cors = require('cors');

const app = express();

/* ***** DB Connection ***** */
const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = 'mongodb://admin:m2webadmin@ds115094.mlab.com:15094/m2web-db';
const MONGO_DB = 'm2web-db';
const COLLECTION  = 'users';

/*  ************************ */
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('combined'));

app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

function getPage(info) {
    let elements = [];
    for (let i = 0; i < info.page_size && info.products.hasOwnProperty(i); ++i) {
        const tmp = {
            code: info.products[i]['_id'],
            image_front_small_url: info.products[i]['image_front_small_url'],
            product_name: info.products[i].product_name,
            nutrition_grades: info.products[i].nutrition_grades,
            nova_group: info.products[i].nova_group
        };
        elements.push(tmp);
    }
    return {
        page: info.page,
        page_size: info.page_size,
        count: info.count,
        elements: elements
    };
}

function getData(info) {
    let elements = [];
    for (let i = 0; i < info.count && info.tags.hasOwnProperty(i); ++i) {
        const tmp = {
            name: info.tags[i].name,
            products: info.tags[i].products
        };
        elements.push(tmp);
    }
    return {
        count: info.count,
        elements: elements
    };
}

function getSearchedData(info) {
    let elements = [];
    for (let i = 0; i < Object.keys(info).length && info.hasOwnProperty(i); ++i) {
        const tmp = {
            name: info[i]
        };
        elements.push(tmp);
    }
    return {
        elements: elements
    };
}

app.get('/products/:code', function(req, res) {
    request('https://world.openfoodfacts.org/api/v0/product/' + req.params.code + '.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            if (info.status == 0) {
                res.status(500).send('Product not found!');
                return;
            }
            res.send({
                code: info.product['_id'],
                image_url: info.product['image_url'],
                image_front_small_url: info.product['image_front_small_url'],
                generic_name: info.product.generic_name,
                product_name: info.product.product_name,
                brands: info.product.brands,

                origins: info.product.origins,
                categories: info.product.categories,
                product_quantity: info.product.product_quantity,
                ingredients_text_with_allergens: info.product.ingredients_text_with_allergens,

                fat_100g: info.product.nutriments.fat_100g,
                saturated_fat_100g: info.product.nutriments['saturated-fat_100g'],
                sugars_100g: info.product.nutriments.sugars_100g,
                salt_100g: info.product.nutriments.salt_100g,

                fat: info.product.nutrient_levels.fat,
                saturated_fat: info.product.nutrient_levels['saturated-fat'],
                sugars: info.product.nutrient_levels.sugars,
                salt: info.product.nutrient_levels.salt,

                nutrition_grades: info.product.nutrition_grades,
                nova_group: info.product.nova_group
            });
        }
    });
});

app.get('/products/pages/:page', function(req, res) {
    if (req.params.page < 1) {
        res.status(500).send('Page not available!');
    }
    request('https://world.openfoodfacts.org/country/france/' + req.params.page + '.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            res.send(getPage(info));
        }
    });
});

app.get('/products/:code/pages/:page', function(req, res) {
    let code = req.params.code;
    if (code.length < 1 || code.length > 13) {
        res.status(500).send('Invalid code!');
        return;
    }
    if (req.params.page < 1) {
        res.status(500).send('Page not available!');
        return;
    }
    while (code.length < 13) {
        code += 'x';
    }
    request('https://world.openfoodfacts.org/code/' + code + '/' + req.params.page + '.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            res.send(getPage(info));
        }
    });
});

app.get('/brands/:name/products/pages/:page', function(req, res) {
    if (req.params.page < 1) {
        res.status(500).send('Page not available!');
        return;
    }
    request('https://world.openfoodfacts.org/brand/' + req.params.name + '/' + req.params.page + '.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            if (info.count == 0) {
                res.status(500).send('Brand not found!');
                return;
            }
            res.send(getPage(info));
        }
    });
});

app.get('/categories/:name/products/pages/:page', function(req, res) {
    if (req.params.page < 1) {
        res.status(500).send('Page not available!');
        return;
    }
    request('https://world.openfoodfacts.org/category/' + req.params.name + '/' + req.params.page + '.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            if (info.count == 0) {
                res.status(500).send('Category not found!');
                return;
            }
            res.send(getPage(info));
        }
    });
});

app.get('/countries/:name/products/pages/:page', function(req, res) {
    if (req.params.page < 1) {
        res.status(500).send('Page not available!');
        return;
    }
    request('https://world.openfoodfacts.org/country/' + req.params.name + '/' + req.params.page + '.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            if (info.count == 0) {
                res.status(500).send('Country not found!');
                return;
            }
            res.send(getPage(info));
        }
    });
});

app.get('/brands', function(req, res) {
    request('https://world.openfoodfacts.org/brands.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            res.send(getData(info));
        }
    });
});

app.get('/categories', function(req, res) {
    request('https://world.openfoodfacts.org/categories.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            res.send(getData(info));
        }
    });
});

app.get('/countries', function(req, res) {
    request('https://world.openfoodfacts.org/countries.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            res.send(getData(info));
        }
    });
});

app.get('/categories/:name', function(req, res) {
    let name = req.params.name;
    if (name.length < 1) {
        res.status(500).send('Incorrect value!');
        return;
    }
    request('https://world.openfoodfacts.org/cgi/suggest.pl?lc=en&tagtype=categories&string=' + name, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            res.send(getSearchedData(info));
        }
    });
});

app.get('/countries/:name', function(req, res) {
    let name = req.params.name;
    if (name.length < 1) {
        res.status(500).send('Incorrect value!');
        return;
    }
    request('https://world.openfoodfacts.org/cgi/suggest.pl?lc=en&tagtype=countries&string=' + name, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            res.send(getSearchedData(info));
        }
    });
});

app.post('/users/:id/favorites', async function(req, res) {
    try {
        const client = await MongoClient.connect(MONGO_URL, {useNewUrlParser: true});
        const db = client.db(MONGO_DB);
        const users = db.collection(COLLECTION);
        users.insertOne({user_id: req.params.id, favorite: req.body.code});
        client.close();
    } catch (e) {
        res.status(500).send(e);
    }
});

app.delete('/users/:id/favorites/:code', async function(req, res) {
    try {
        const client = await MongoClient.connect(MONGO_URL, {useNewUrlParser: true});
        const db = client.db(MONGO_DB);
        const users = db.collection(COLLECTION);
        users.deleteOne({user_id: req.params.id, favorite: req.params.code});
        client.close();
    } catch (e) {
        res.status(500).send(e);
    }
});

app.get('/users/:id/favorites', async function(req, res) {
    try {
        const client = await MongoClient.connect(MONGO_URL, {useNewUrlParser: true});
        const db = client.db(MONGO_DB);
        const users = db.collection(COLLECTION);
        users.find({user_id: req.params.id}).toArray(function(err, result) {
            let elements =[];
            for (let i = 0; i < result.length; ++i) {
                elements.push(result[i].favorite);
            }
            res.send({elements: elements});
            client.close();
        });
    } catch (e) {
        res.status(500).send(e);
    }
});

app.use(function(req, res, next) {
    res.status(404).send('Page not found!');
});

app.listen(8081, function() {
    console.log('Server app listening on port 8081!');
});

const Router = require('koa-router');
const bookHandler = require('../handlers/books/bookHandlers');
const productHandler = require('../handlers/products/productHandlers');
const bookInputMiddleware = require("../middleware/bookInputMiddleware");
const productInputMiddleware = require("../middleware/productInputMiddleware");

// Prefix all routes with /books
const router = new Router({
    prefix: '/api'
});

// Routes will go here
router.get('/books', bookHandler.getBooks);
router.get('/books/:id', bookHandler.getBook);
router.post('/books', bookInputMiddleware, bookHandler.save);

//Products Routes
router.get('/products', productHandler.getProducts);
router.get('/products/:id', productHandler.getProduct);
router.post('/products',productInputMiddleware, productHandler.save);

module.exports = router;

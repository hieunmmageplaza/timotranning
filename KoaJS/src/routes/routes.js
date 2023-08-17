const Router = require('koa-router');
const bookHandler = require('../handlers/books/bookHandlers');
const productHandler = require('../handlers/products/productHandlers');
const bookInputMiddleware = require("../middleware/bookInputMiddleware");
const productInputMiddleware = require("../middleware/productInputMiddleware");
const {
    getAll: getAllProducts
} = require("../database/productsRepository");

const router = new Router();

router.get('/products',async (ctx) => {
    const products = getAllProducts();
    await ctx.render('product',{
        products
    });

})

// Routes will go here
router.get('/api/books', bookHandler.getBooks);
router.get('/api/books/:id', bookHandler.getBook);
router.post('/api/books', bookInputMiddleware, bookHandler.save);

//Products Routes
router.get('/api/products', productHandler.getProducts);
router.get('/api/products/:id', productHandler.getProduct);
router.post('/api/products',productInputMiddleware, productHandler.save);
router.delete('/api/products/:id', productHandler.delProduct);
router.put('/api/products/:id',productInputMiddleware, productHandler.updateProduct);

module.exports = router;

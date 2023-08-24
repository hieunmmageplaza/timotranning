const {
    getAll: getAllProducts,
    getOne: getOneProducts,
    add: addProduct,
    deletePro: deletePro,
    updateProduct: updatePro
} = require("../../database/productsRepository");
/**
 *
 * @returns {number}
 * @param a
 * @param b
 */

function compareByCreatedAt(a, b) {
    return a.createdAt.localeCompare(b.createdAt);
}
function compareById(a, b) {
    return a.id - b.id; // Compare products by ID
}
async function getProducts(ctx) {
    try {
        const limit = parseInt(ctx.query.limit) || getAllProducts().length;
        const sortDirection = ctx.query.sort;
        const fields = ctx.query.fields;
        let sortedProducts = [...getAllProducts()];

        //sort products desc or asc
        if(!sortDirection) {
            sortedProducts.sort(compareById);
        } else if (sortDirection === "asc") {
            sortedProducts.sort(compareByCreatedAt);
        } else if (sortDirection === "desc") {
            sortedProducts.sort((a, b) => compareByCreatedAt(b, a));
        }
        const limitedAndSortedProducts = sortedProducts.slice(0, limit);
        //sort products desc or asc

        let filteredProducts = [];
        if (fields) {
            const listFields = fields.split(',');
            limitedAndSortedProducts.map(product => {
                const filteredProduct = {};
                listFields.forEach(field => {
                    if (product.hasOwnProperty(field)) {
                        filteredProduct[field] = product[field];
                    }
                });
                return filteredProduct;
            })
        } else {
            filteredProducts = limitedAndSortedProducts;
        }

        ctx.body = {
            data: filteredProducts
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}

/**
 *
 * @param ctx
 * @returns {Promise<{data: {author: string, name: string, id: number}}|{success: boolean, error: *}|{message: string, status: string}>}
 */
async function getProduct(ctx) {
    try {
        const {id} = ctx.params;
        const getCurrentBook = getOneProducts(id);
        if (getCurrentBook) {
            return ctx.body = {
                data: getCurrentBook
            }
        }

        ctx.status = 404;
        return ctx.body = {
            status: 'error!',
            message: 'Book Not Found with that id!'
        };
    } catch (e) {
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
async function save(ctx) {
    try {
        const postData = ctx.request.body;
        postData.createdAt = new Date().toISOString();
        addProduct(postData);

        ctx.status = 201;
        return ctx.body = {
            success: true
        }
    } catch (e) {
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

async function delProduct(ctx) {
    try {
        const {id} = ctx.params;
        const removedProduct = getOneProducts(id);
            if (removedProduct) {
                deletePro(id);

                ctx.status = 201;
                return ctx.body = {
                    success: true,
                    message: `Remove product with ID ${id}`

                }
            }

        return ctx.body = {
            status: 'error!',
            message: 'Product Not Found'
        };
    } catch (e) {
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

async function updateProduct(ctx) {
    try {
        const { id } = ctx.params;
        const updatedData = ctx.request.body;

        const existingProduct = getOneProducts(id);

        if (!existingProduct) {
            ctx.status = 404;
            ctx.body = {
                success: false,
                message: 'Product Not Found'
            };
            return;
        }

        const updatedProduct = { ...existingProduct, ...updatedData };
        updatePro(id, updatedProduct);

        ctx.status = 201;
        ctx.body = {
            success: true,
            message: `Product with ID ${id} has been updated`
        };
    } catch (e) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            error: e.message
        };
    }
}

module.exports = {
    getProducts,
    getProduct,
    save,
    delProduct,
    updateProduct
};

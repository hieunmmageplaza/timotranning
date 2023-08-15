const {getAll: getAllProducts, getOne: getOneProducts, add: addProduct} = require("../../database/productsRepository");
/**
 *
 * @returns {Promise<void>}
 * @param a
 * @param b
 */

function compareByCreatedAt(a, b) {
    return a.createdAt.localeCompare(b.createdAt);
}
async function getProducts(ctx) {
    try {
        const limit = parseInt(ctx.query.limit) || getAllProducts().length;
        const sortDirection = ctx.query.sort || "asc";
        let sortedProducts = [...getAllProducts()];

        if (sortDirection === "asc") {
            sortedProducts.sort(compareByCreatedAt);
        } else if (sortDirection === "desc") {
            sortedProducts.sort((a, b) => compareByCreatedAt(b, a));
        }
        const limitedAndSortedProducts = sortedProducts.slice(0, limit);

        ctx.body = {
            data: limitedAndSortedProducts
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

module.exports = {
    getProducts,
    getProduct,
    save
};

const fs = require('fs');
const {data: products} = require('./products.json');
function getAll() {
    return products;
}

/**
 *
 * @param id
 * @returns {{author: string, name: string, id: number} | {author: string, name: string, id: number} | {author: string, name: string, id: number} | {author: string, name: string, id: number}}
 */
function getOne(id) {
    return products.find(product => product.id === parseInt(id));
}

function add(data) {
    const updatedProducts = [data, ...products];
    return fs.writeFileSync('./src/database/products.json', JSON.stringify({
        data: updatedProducts
    }));
}

module.exports = {
    getOne,
    getAll,
    add
};
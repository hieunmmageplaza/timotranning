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
    const updatedProducts = [...products,data];
    return fs.writeFileSync('./src/database/products.json', JSON.stringify({
        data: updatedProducts
    }));
}

function deletePro(id) {
    const updatedProducts = products.filter(product => product.id !== parseInt(id));
    fs.writeFileSync('./src/database/products.json', JSON.stringify({
        data: updatedProducts
    }));
}

function updateProduct(id, updatedData) {
    const updatedProducts = products.map(product => {
        if (product.id === parseInt(id)) {
            return { ...product, ...updatedData };
        }
        return product;
    });
    return fs.writeFileSync('./src/database/products.json', JSON.stringify({data: updatedProducts }));
}

module.exports = {
    getOne,
    getAll,
    add,
    deletePro,
    updateProduct
};


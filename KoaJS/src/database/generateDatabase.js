const { faker } = require('@faker-js/faker');
const fs = require('fs');
function createRandomUser(record) {

    const products = [];
    for (let i = 0; i < record; i++) {
        const fakeProduct = {
            id: i+1,
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            description: faker.commerce.productDescription(),
            productType: faker.commerce.product(),
            color: faker.color.human(),
            createdAt: faker.date.anytime(),
            image: faker.image.urlLoremFlickr({ category: 'cats' })
        };
        products.push(fakeProduct);
    }
    return products;
}


fs.writeFileSync('./products.json', JSON.stringify({data: createRandomUser(10)}, null, 2));
console.log('generated Data done');
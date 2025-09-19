/*
 * El seeder no es más que un archivo que contiene una función que se encarga
 * de insertar datos (generalmente de prueba) en una base de datos.
 *
 * El nombre "seeder" es una convención y significa "semillero".
 *
 * Además, en este caso, se está usando una librería llamada Faker
 * (https://fakerjs.dev/) para facilitar la creación de datos ficticios como
 * nombres, apellidos, títulos, direcciones y demás textos.
 *
 * Suele ser común que en los seeders exista un `for` donde se define la
 * cantidad de registros de prueba que se insertarán en la base de datos.
 * En este ejemplo se están insertando 500 artículos con textos ficticios.
 */

const faker = require("@faker-js/faker").fakerES;
const { Product } = require("../models");

module.exports = async () => {
  const products = [];

  for (let i = 0; i < 500; i++) {
    products.push({
      name: faker.lorem.sentence(5),
      description: faker.lorem.paragraphs(),
      price: faker.number.int({ min: 100, max: 5000 }),
      stock: faker.number.int({ min: 10, max: 100 }),
      category: faker.commerce.department(),
      photo: faker.image.urlLoremFlickr({ category: "technics" }),
      discount: faker.number.int({ min: 0, max: 90 }),
    });
  }

  await Product.bulkCreate(products);
  console.log("[Database] Se corrió el seeder de Products.");
};

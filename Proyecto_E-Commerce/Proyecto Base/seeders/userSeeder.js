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
 *
 * En este ejemplo se están insertando 100 usuarios con nombres ficticios.
 */

const faker = require("@faker-js/faker").fakerES;
const { User } = require("../models");

// Normaliza acentos/espacios y deja solo [a-z0-9], separando por puntos
function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "");
}

module.exports = async () => {
  const users = [];
  const usedEmails = new Set();

  for (let i = 0; i < 100; i++) {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();

    const baseLocal = slugify(`${firstname}.${lastname}`);
    const domain = faker.internet.domainName();

    let local = baseLocal;
    let n = 1;
    let email = `${local}@${domain}`;
    while (usedEmails.has(email)) {
      local = `${baseLocal}${n++}`;
      email = `${local}@${domain}`;
    }
    usedEmails.add(email);

    users.push({
      firstname,
      lastname,
      password: faker.internet.password(),
      adress: faker.location.streetAddress(),
      telephone: faker.phone.imei(),
      wishlist: [],
      email,
    });
  }

  await User.bulkCreate(users);
  console.log("[Database] Se corrió el seeder de Users.");
};

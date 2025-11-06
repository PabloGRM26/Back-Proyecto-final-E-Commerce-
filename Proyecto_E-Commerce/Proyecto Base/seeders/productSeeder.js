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

function int(min, max) {
  return faker.number.int({ min, max });
}

function price(min, max) {
  return int(min, max);
}

// Genera un número "estable" para el parámetro lock de loremflickr en base al nombre
function lockFromName(name) {
  return name.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % 1000;
}

function flickr(tags, lockKey) {
  const q = encodeURIComponent(tags.join(","));
  return `https://loremflickr.com/800/600/${q}?lock=${lockKey}`;
}

// Catálogo base: cada ítem define marca, categoría y plantillas coherentes
const catalog = [
  {
    marca: "eboost",
    category: "suplementos nutricionales",
    priceRange: [8000, 50000],
    templates: [
      {
        name: "Whey Protein 1kg",
        description:
          "Proteína de suero concentrada de rápida absorción. Ideal para recuperación y ganancia de masa magra.",
        tags: ["protein", "supplement", "shake", "gym", "eboost"],
      },
      {
        name: "Creatina Monohidratada 300g",
        description:
          "Creatina monohidratada micronizada para mejora del rendimiento y fuerza explosiva.",
        tags: ["creatine", "supplement", "powder", "fitness", "eboost"],
      },
      {
        name: "BCAA 2:1:1 200 cápsulas",
        description:
          "Aminoácidos de cadena ramificada con ratio 2:1:1 para apoyar la síntesis proteica y la recuperación.",
        tags: ["bcaa", "supplement", "capsules", "workout", "eboost"],
      },
    ],
  },
  {
    marca: "eboost",
    category: "suplementos vitaminicos",
    priceRange: [3000, 20000],
    templates: [
      {
        name: "Multivitamínico Diario",
        description:
          "Fórmula completa con vitaminas y minerales esenciales para la energía y el bienestar general.",
        tags: ["vitamins", "multivitamin", "health", "wellness", "eboost"],
      },
      {
        name: "Vitamina D3 2000 UI",
        description:
          "Vitamina D3 de alta potencia para soporte del sistema inmune y salud ósea.",
        tags: ["vitamin-d", "health", "immunity", "eboost"],
      },
      {
        name: "Omega-3 Ultra 1000mg",
        description:
          "Aceite de pescado purificado con alto contenido de EPA y DHA para salud cardiovascular.",
        tags: ["omega3", "fish-oil", "heart", "health", "eboost"],
      },
    ],
  },
  {
    marca: "kinetic",
    category: "equipo funcional",
    priceRange: [15000, 120000],
    templates: [
      {
        name: "Kettlebell 16kg",
        description:
          "Pesa rusa de hierro fundido con agarre ergonómico para entrenamientos de fuerza y potencia.",
        tags: ["kettlebell", "functional", "gym", "kinetic"],
      },
      {
        name: "Bandas de Resistencia Set x5",
        description:
          "Set progresivo de bandas de látex con diferentes tensiones para movilidad y fuerza.",
        tags: ["resistance-bands", "functional", "mobility", "kinetic"],
      },
      {
        name: "TRX Entrenamiento en Suspensión",
        description:
          "Sistema de suspensión ajustable para entrenamientos de cuerpo completo en cualquier lugar.",
        tags: ["trx", "suspension", "functional", "training", "kinetic"],
      },
    ],
  },
  {
    marca: "kinetic",
    category: "articulos deportivos",
    priceRange: [8000, 60000],
    templates: [
      {
        name: "Soga de Batalla 12m",
        description:
          "Battle rope de alta resistencia para trabajo metabólico y de fuerza del tren superior.",
        tags: ["battle-rope", "fitness", "conditioning", "kinetic"],
      },
      {
        name: "Colchoneta Antideslizante Pro",
        description:
          "Mat de alta densidad con superficie antideslizante para yoga, pilates y funcional.",
        tags: ["yoga-mat", "mat", "fitness", "kinetic"],
      },
      {
        name: "Rueda Abdominal Pro",
        description:
          "Ab wheel con núcleo reforzado y empuñaduras cómodas para trabajo de core.",
        tags: ["ab-wheel", "core", "fitness", "kinetic"],
      },
    ],
  },
  {
    marca: "eudaimonia",
    category: "paquetes de viajes o actividades",
    priceRange: [60000, 300000],
    templates: [
      {
        name: "Trekking Andes 3 días",
        description:
          "Experiencia guiada de trekking por senderos andinos con alojamiento y pensión completa.",
        tags: ["trekking", "mountains", "andes", "travel", "eudaimonia"],
      },
      {
        name: "Rafting Clase III",
        description:
          "Aventura de rafting en rápidos clase III con equipo y guías certificados.",
        tags: ["rafting", "river", "adventure", "travel", "eudaimonia"],
      },
      {
        name: "Yoga Retreat Costa",
        description:
          "Retiro de yoga de fin de semana frente al mar con clases diarias y alimentación saludable.",
        tags: ["yoga", "retreat", "beach", "wellness", "eudaimonia"],
      },
      {
        name: "Parapente Costero",
        description:
          "Vuelo en parapente biplaza a lo largo de la costa con instructores certificados. Incluye briefing de seguridad y todo el equipo.",
        tags: ["paragliding", "adventure", "coast", "travel", "eudaimonia"],
      },
      {
        name: "Kayak en Lago Medio Día",
        description:
          "Remada guiada en lago de aguas calmas, ideal para principiantes. Incluye kayak, chaleco y refrigerio.",
        tags: ["kayak", "lake", "adventure", "nature", "eudaimonia"],
      },
      {
        name: "Escalada en Roca Introductoria",
        description:
          "Jornada de iniciación a la escalada en roca con guías certificados, equipo incluido y rutas de baja dificultad.",
        tags: ["climbing", "rock", "adventure", "outdoors", "eudaimonia"],
      },
    ],
  },
];

function pick(arr) {
  return arr[int(0, arr.length - 1)];
}

module.exports = async () => {
  const products = [];

  // Permite controlar cuántos productos generar (por env), por defecto 60
  const COUNT = Number(process.env.SEED_PRODUCTS_COUNT || 60);

  const templatesFlat = catalog.flatMap((c) =>
    c.templates.map((t) => ({ ...t, marca: c.marca, category: c.category, priceRange: c.priceRange })),
  );

  while (products.length < COUNT) {
    const tmpl = pick(templatesFlat);
    const lock = lockFromName(tmpl.name);
    const [minP, maxP] = tmpl.priceRange;

    const product = {
      name: tmpl.name,
      description: tmpl.description,
      price: price(minP, maxP),
      stock:
        tmpl.category === "paquetes de viajes o actividades"
          ? int(0, 20)
          : int(5, 100),
      category: tmpl.category,
      marca: tmpl.marca,
      photo: flickr(tmpl.tags, lock),
      discount: int(0, 40),
    };

    products.push(product);
  }

  await Product.bulkCreate(products);
  console.log(`[Database] Se corrió el seeder de Products. Total: ${products.length}`);
};

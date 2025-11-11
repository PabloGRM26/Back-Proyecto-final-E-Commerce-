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
  // ===========================
  // 🔴 EBOOST
  // ===========================
  {
    marca: "eboost",
    category: "suplementos nutricionales",
    priceRange: [5000, 40000],
    subcategories: [
      "Proteínas",
      "Creatina",
      "BCAA",
      "Pre-entreno",
      "Aminoácidos",
      "Vitaminas",
      "Omega 3",
      "Colágeno",
      "Ganadores de peso",
      "Energizantes",
      "Barras energéticas",
      "Multivitamínicos",
    ],
    features: ["Sin gluten", "Sin azúcar", "Con sabor", "Sin sabor", "Vegano"],
    templates: [
      {
        name: "Whey Protein 1kg",
        description: "Proteína de suero concentrada de rápida absorción.",
        tags: ["protein", "gym", "eboost"],
      },
      {
        name: "Creatina Monohidratada 300g",
        description: "Creatina micronizada para mejora de rendimiento.",
        tags: ["creatine", "eboost"],
      },
      {
        name: "BCAA 2:1:1 200 cápsulas",
        description: "Aminoácidos esenciales para la recuperación muscular.",
        tags: ["bcaa", "eboost"],
      },
      {
        name: "Pre-entreno NitroX 300g",
        description: "Fórmula con cafeína, beta-alanina y citrulina.",
        tags: ["preworkout", "eboost"],
      },
      {
        name: "Glutamina 500g",
        description: "Apoya la recuperación y la función inmunológica.",
        tags: ["glutamine", "eboost"],
      },
      {
        name: "Omega 3 Ultra 1000mg",
        description: "Aceite de pescado con alto contenido de EPA y DHA.",
        tags: ["omega3", "eboost"],
      },
      {
        name: "Colágeno Hidrolizado 300g",
        description: "Favorece la salud articular y la elasticidad de la piel.",
        tags: ["collagen", "eboost"],
      },
      {
        name: "Ganador de Peso Mass Gainer 3kg",
        description: "Suplemento hipercalórico con proteínas y carbohidratos.",
        tags: ["gainer", "eboost"],
      },
      {
        name: "Multivitamínico Diario",
        description: "Complejo vitamínico para energía y bienestar general.",
        tags: ["vitamin", "eboost"],
      },
      {
        name: "Vitamina D3 2000 UI",
        description: "Soporte del sistema inmune y salud ósea.",
        tags: ["vitamin-d", "eboost"],
      },
      {
        name: "Barras Energéticas Pack x6",
        description: "Barritas con proteína vegetal y carbohidratos naturales.",
        tags: ["bars", "eboost"],
      },
      {
        name: "Cafeína Pura 200mg",
        description: "Aumenta el estado de alerta y el rendimiento físico.",
        tags: ["caffeine", "eboost"],
      },
    ],
  },

  // ===========================
  // 🟢 KINETIC
  // ===========================
  {
    marca: "kinetic",
    category: "artículos deportivos",
    priceRange: [8000, 120000],
    subcategories: [
      "Running",
      "Crosstraining",
      "Musculación",
      "Ciclismo",
      "Fútbol",
      "Basketball",
      "Tennis",
      "Casuales",
      "Entrenamiento funcional",
      "Accesorios",
      "Outdoor",
      "Pilates",
    ],
    features: ["Impermeable", "Ligero", "Transpirable", "Antideslizante", "Flexible"],
    templates: [
      {
        name: "Zapatillas Running Pro X",
        description: "Calzado con amortiguación avanzada y suela ligera.",
        tags: ["running", "shoes", "kinetic"],
      },
      {
        name: "Mancuernas Ajustables 20kg",
        description: "Sistema modular para entrenamientos de fuerza en casa.",
        tags: ["dumbbells", "fitness", "kinetic"],
      },
      {
        name: "Bandas de Resistencia Set x5",
        description: "Bandas con distintos niveles de tensión.",
        tags: ["bands", "kinetic"],
      },
      {
        name: "Soga de Batalla 12m",
        description: "Ideal para entrenamientos funcionales de alta intensidad.",
        tags: ["battle-rope", "fitness", "kinetic"],
      },
      {
        name: "Colchoneta Antideslizante Pro",
        description: "Mat de yoga o pilates con alta densidad y confort.",
        tags: ["mat", "yoga", "kinetic"],
      },
      {
        name: "Rueda Abdominal Pro",
        description: "Fortalece el core con estabilidad y agarres ergonómicos.",
        tags: ["ab-wheel", "core", "kinetic"],
      },
      {
        name: "Guantes de Entrenamiento Premium",
        description: "Protección y agarre superior para pesas o crossfit.",
        tags: ["gloves", "training", "kinetic"],
      },
      {
        name: "Botella Térmica 1L",
        description: "Mantiene la bebida fría o caliente por más de 10 horas.",
        tags: ["bottle", "gym", "kinetic"],
      },
      {
        name: "Pelota de Pilates 65cm",
        description: "Ideal para ejercicios de equilibrio y estabilidad.",
        tags: ["pilates", "ball", "kinetic"],
      },
      {
        name: "Cinta de Correr Plegable",
        description: "Cinta motorizada con pantalla LED y control remoto.",
        tags: ["treadmill", "running", "kinetic"],
      },
      {
        name: "Smartwatch Deportivo K1",
        description: "Monitoriza ritmo cardíaco, pasos y oxígeno.",
        tags: ["smartwatch", "fitness", "kinetic"],
      },
      {
        name: "Zapatillas Ciclismo RoadFit",
        description: "Diseñadas para máximo rendimiento en ruta.",
        tags: ["cycling", "shoes", "kinetic"],
      },
    ],
  },

  // ===========================
  // 🔵 EUDAIMONIA
  // ===========================
  {
    marca: "eudaimonia",
    category: "paquetes de experiencias",
    priceRange: [50000, 300000],
    subcategories: [
      "Viajes",
      "Gastronomía",
      "Estadías",
      "Aventura",
      "Cursos y talleres",
      "Relax y cuidado",
      "Naturaleza",
      "Deportes acuáticos",
      "Bienestar general",
      "Sueño",
      "Estrés",
      "Cultura",
    ],
    features: [
      "Con hospedaje",
      "Todo incluido",
      "Al aire libre",
      "Con instructor",
      "Ideal en pareja",
      "Duración corta",
      "Con transporte",
    ],
    templates: [
      {
        name: "Trekking Andes 3 días",
        description: "Excursión guiada por senderos andinos con alojamiento.",
        tags: ["trekking", "mountains", "eudaimonia"],
      },
      {
        name: "Rafting Clase III",
        description: "Aventura en rápidos con equipo e instructores certificados.",
        tags: ["rafting", "adventure", "eudaimonia"],
      },
      {
        name: "Yoga Retreat Costa",
        description: "Fin de semana de yoga frente al mar con comidas saludables.",
        tags: ["yoga", "relax", "eudaimonia"],
      },
      {
        name: "Curso de Cocina Mediterránea",
        description: "Aprendé recetas clásicas con chef profesional.",
        tags: ["cooking", "gastronomy", "eudaimonia"],
      },
      {
        name: "Masaje y Spa Urbano",
        description: "Sesión relajante con aromaterapia y música ambiental.",
        tags: ["spa", "relax", "eudaimonia"],
      },
      {
        name: "Clases de Surf Nivel 1",
        description: "Curso para principiantes con tabla incluida.",
        tags: ["surf", "beach", "eudaimonia"],
      },
      {
        name: "Taller de Fotografía de Paisajes",
        description: "Curso práctico al aire libre con guía especializado.",
        tags: ["photography", "nature", "eudaimonia"],
      },
      {
        name: "Cata de Vinos Premium",
        description: "Degustación con sommelier en bodega boutique.",
        tags: ["wine", "gastronomy", "eudaimonia"],
      },
      {
        name: "Escalada en Roca Introductoria",
        description: "Actividad guiada para principiantes con equipo completo.",
        tags: ["climbing", "adventure", "eudaimonia"],
      },
      {
        name: "Kayak en Lago Medio Día",
        description: "Remada guiada en entorno natural con refrigerio.",
        tags: ["kayak", "nature", "eudaimonia"],
      },
      {
        name: "Estadía Rural 2 noches",
        description: "Descanso en posada con actividades de campo.",
        tags: ["farm", "relax", "eudaimonia"],
      },
      {
        name: "Vuelo en Parapente",
        description: "Experiencia aérea en costa o montaña con piloto experto.",
        tags: ["paragliding", "adventure", "eudaimonia"],
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

  const brandLine = tmpl.marca.toLowerCase(); // "eboost", "kinetic" o "eudaimonia"
  const catalogEntry = catalog.find((c) => c.marca === tmpl.marca);

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

    // 🔹 NUEVOS CAMPOS
    subcategory: pick(catalogEntry.subcategories),
    features: faker.helpers.arrayElements(catalogEntry.features, int(1, 3)),
    brandLine: tmpl.marca.toLowerCase(),
  };

  products.push(product);
}

  await Product.bulkCreate(products);
  console.log(`[Database] Se corrió el seeder de Products. Total: ${products.length}`);
};

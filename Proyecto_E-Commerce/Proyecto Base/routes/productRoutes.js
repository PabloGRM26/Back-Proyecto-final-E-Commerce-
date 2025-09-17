const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

/*
 * API endpoints relacionados a los artículos.
 *
 * Notar que todos estos endpoints tienen como prefijo el string "/articles",
 * tal como se definió en el archivo `routes/index.js`.
 */

router.get("/", productController.index);
router.post("/", productController.store);
router.get("/:id", productController.show);
router.patch("/:id", productController.update);
router.delete("/:id", productController.destroy);

module.exports = router;

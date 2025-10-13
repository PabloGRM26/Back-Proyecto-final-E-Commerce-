const express = require("express");
const router = express.Router();
const { chatHandler } = require("../controllers/chatController");

// Ruta principal del chat
router.post("/chat", chatHandler);

module.exports = router;

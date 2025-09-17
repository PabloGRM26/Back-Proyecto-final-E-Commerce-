const { User } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  const users = await User.findAll({ attributes: { exclude: ["password"] } });
  res.json(users);
}

// Display the specified resource.
async function show(req, res) {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["password"] },
  });
  if (!user) return res.status(404).json({ error: "User no encontrado" });
  res.json(user);
}

// Store a newly created resource in storage.
async function store(req, res) {
  try {
    if (!req.body.firstName && !req.body.lastName && !req.body.email && !req.body.password) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const user = await User.create(req.body);
    const safe = user.toJSON();
    delete safe.password;
    res.status(201).json(safe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  try {
    if (!req.body.firstname || !req.body.lastName || !req.body.email || !req.body.password) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User no encontrado" });
    await user.update(req.body);
    const safe = user.toJSON();
    delete safe.password;
    res.json(safe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const deleted = await User.destroy({ where: { id: req.params.id } });
  if (!deleted) return res.status(404).json({ error: "User no encontrado" });
  res.status(204).send();
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};

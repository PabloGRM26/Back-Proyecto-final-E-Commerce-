const { Admin } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  const admins = await Admin.findAll({ attributes: { exclude: ["password"] } });
  res.json(admins);
}

// Display the specified resource.
async function show(req, res) {
  const admin = await Admin.findByPk(req.params.id, {
    attributes: { exclude: ["password"] },
  });
  if (!admin) return res.status(404).json({ error: "Admin no encontrado" });
  res.json(admin);
}

// Store a newly created resource in storage.
async function store(req, res) {
  try {
    if (!req.body.username && !req.body.email && !req.body.password) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const admin = await Admin.create(req.body);
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
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) return res.status(404).json({ error: "Admin no encontrado" });
    await Admin.update(req.body);
    const safe = Admin.toJSON();
    delete safe.password;
    res.json(safe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const deleted = await Admin.destroy({ where: { id: req.params.id } });
  if (!deleted) return res.status(404).json({ error: "Admin no encontrado" });
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

const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.get("/salud", async (req,res) => {
  try{
   await pool.query("SELECT 1");
   res.json({ estado: "ok", baseDeDatos: "conectada"});
} catch (error) {
  res.status(500).json({ estado: "error", baseDeDatos: "sin conexion"});
}
});

app.get("/gastos", async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM gastos ORDER BY id");
    res.json(resultado.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "No se pudieron obtener los gastos" });
  }
});

app.listen(PORT, () => {
  console.log(`API escuchando en el puerto ${PORT}`);
});

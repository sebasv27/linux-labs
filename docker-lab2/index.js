const express =require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) =>{
  res.json({
    mensaje: "Hola desde Node en docker",
    entorno: process.env.NODE_ENV || "desarrollo",
   });
});

app.get("/salud", (req, res) => {
   res.json({ estado: "ok"});
});

app.listen(PORT, () => {
   console.log(`API escuchando en el puerto ${PORT}`);
});

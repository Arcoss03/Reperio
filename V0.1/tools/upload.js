const multer = require("multer");

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("photo"), (req, res) => {
  // La photo est stockée dans req.file
  // Faites quelque chose avec la photo (enregistrement en base de données, traitement, etc)

  const photoPath = req.file.path;

  // Renvoyer le chemin d'accès de la photo dans la réponse HTTP

  res.json({ photoPath });
});

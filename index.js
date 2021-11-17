import express from "express";
import multer from "multer";
import sharp from "sharp";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();

app.use(express.static("public"));

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res, next) => {
  res.render("index", { title: "Upload Example", message: "Hello World" });
});

app.post("/upload", upload.single("file"), (req, res, next) => {
  const { buffer } = req.file;
  sharp(buffer)
    .resize(100, 100)
    .toFormat("png")
    .toBuffer()
    .then((img) => {
      const mime = "image/png";
      const encoding = "base64";
      const dataUri = `data:${mime};${encoding},${img.toString(encoding)}`;
      res.render("result", { url: dataUri });
    });
});

app.get("/test", (req, res, next) => {
  res.render("result", { url: "/prueba.png" });
});

app.listen(3000, () => console.log(`Server listening on port 3000`));

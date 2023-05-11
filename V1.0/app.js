const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const homeRouter = require("./routes/home");
const adminRouter = require("./routes/admin");
const loginRouter = require("./routes/login");
const register_c_Router = require("./routes/register-c");
const register_e_Router = require("./routes/register-e");
const requestRouter = require("./routes/request");
const $ = require("jquery");

const app = express();
const PORT = "3001";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
//on utilise les routeurs (les fichiers sont dans le dossier routes)

app.use("/", homeRouter);
app.use("/", loginRouter);
app.use("/", register_c_Router);
app.use("/", register_e_Router);
app.use("/admin", adminRouter);
app.use("/", requestRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

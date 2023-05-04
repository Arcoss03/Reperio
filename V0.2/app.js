const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const testRouter = require("./routes/test");
const adminRouter = require("./routes/admin");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const requestRouter = require("./routes/request");
const $ = require("jquery");

const app = express();
const PORT = "3003";

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

app.use("/", testRouter);
app.use("/", loginRouter);
app.use("/", registerRouter);
app.use("/admin", adminRouter);
app.use("/", requestRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//imports
const express = require("express");
const exhbs = require("express-handlebars");
const bodyParser = require("body-parser");

//env configs
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//static files
app.use(express.static("public"));

//template engines
const handlebars = exhbs.create({ extname: ".hbs" });
app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");

const routes = require("./server/routes/emp");
app.use("/", routes);
app.use("/addUser", routes);

//server
app.listen(port, (req, res) => {
  console.log(`Server Started on ${port}`);
});

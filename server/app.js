const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

global.__basedir = __dirname;

app.listen(process.env.PORT || 8000);

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static("public"));
app.set("view engine", "ejs");

app.use("/public", express.static("public"));

const ClientRouter = require("./collection/client/routes/clientRoutes");

app.use("/client", ClientRouter);

module.exports = app;

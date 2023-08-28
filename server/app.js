const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();


app.listen(process.env.PORT || 8000);

app.use(cors({ exposedHeaders: ["Content-Disposition"] }));
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

//MongoDB connect
mongoose.connect(
  process.env.database,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("error connecting to mongodb", err);
    } else {
      console.log("connected to mongodb");
    }
  }
);

//Routes
const ClientRouter = require("./collection-client/routes/routes");

app.use("/client", ClientRouter);

module.exports = app;

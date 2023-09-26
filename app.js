const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Router = require("./routes/allRouters");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
app.use(Router);


// static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/images", express.static(__dirname + "public/images"));
app.use("/js", express.static(__dirname + "public/js"));

app.set("view engine", "ejs");

const port = 3000;
app.listen(port, function () {
  console.log("Listening on port 3000\n http://localhost:3000/");
});

//  nodemon start
// http://localhost:3000/
const express = require("express");

const bodyParser = require("body-parser");

const path = require("path");

const http = require("http");

const app = express();

var fs = require("fs");

const api = require("./server/routes/api");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  next();
});

app.use(express.static(path.join(__dirname, "/var/www/html")));

app.use("/api", api);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/var/www/html/index.html"));
});

app.listen(3000,function(){
    console.log("listen to port 3000");
});

var express = require("express");
var app = express();
var cors = require("cors");

var gdpgrowth = require("./controllers/getGDP");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.get("/api/graph", (req, res) => {
  gdpgrowth.getGDPofUSA(req, res);
});

app.listen(3001);
console.log("Server Listening on port 3001");

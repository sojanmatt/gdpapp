var fetch = require("node-fetch");
var axios = require("axios");
const url =
  "http://api.worldbank.org/countries/USA/indicators/NY.GDP.MKTP.CD?per_page=5000&format=json";
exports.getGDPofUSA = async function(req, res) {
  try {
    let { data } = await axios.get(url);
    res.status(200).json(data);
  } catch (error) {
    res.send({ err: "No data found" }); // <= send error
  }
};

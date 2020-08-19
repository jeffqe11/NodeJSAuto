var http = require("http");
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
//database access with connect
const { connect } = require("./database/mongoDatabase");
var router = express();
var server = http.createServer(router);
var multer = require("multer");
var upload = multer();
const fs = require("fs");

//read csv file and turn into json
const csv = require("csvtojson");

//autofi Model
const autofi = require("./models/AutoFi");

// server listen

if (process.env.NODE_ENV !== "test") {
  server.listen(
    process.env.PORT || 3000,
    process.env.IP || "127.0.0.1",
    function () {
      var addr = server.address();
      console.log(
        "Ready server is running go to ",
        addr.address + ":" + addr.port
      );
      connect();
    }
  );
}

//middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(express.static(path.resolve(__dirname, "client")));

//API_ROUTES

//list all autos available in database
router.get("/api/autos", (req, res) => {
  autofi.find({}, (err, result) => {
    res.send(result);
  });
});

//from csv file and provider name insert each row in mongodb database
router.post("/api/autos", upload.single("csvFile"), async (req, res) => {
  try {
    const csvFile = req.file.buffer.toString();
    const provider = req.body.provider;

    console.log(provider + "  SEND FILE");

    let autos = await csv().fromString(csvFile);

    let autosSchema = [];

    autos.map((auto) => {
      const doc = new autofi({
        UUID: auto.UUID,
        VIN: auto.VIN,
        Make: auto.Make,
        Model: auto.Model,
        Year: auto.Year,
        Price: auto.Price,
        ZipCode: auto.ZipCode,
        Mileage: auto.Mileage,
        CreateDate: auto.CreateDate,
        UpdateDate: auto.UpdateDate,
      });

      autosSchema.push(doc);
    });

    await autofi.insertMany(autosSchema);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;

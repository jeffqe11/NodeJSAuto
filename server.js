var http = require("http");
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
//database access with connect
const { connect } = require("./database/mongoDatabase");
var router = express();
var server = http.createServer(router);

//middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(express.static(path.resolve(__dirname, "client")));

//routes
require("./routes/autos/autosRoutes")(router);

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

module.exports = router;

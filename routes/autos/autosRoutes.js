var multer = require("multer");
var upload = multer();

//controller auto
const {
  auto_list,
  auto_save_all,
} = require("../../controllers/autos/autosControllers");

module.exports = function (router) {
  //API_ROUTES

  //list all autos available in database
  router.get("/api/autos", (req, res) => {
    auto_list(req, res);
  });

  //from csv file and provider name insert each row in mongodb database
  router.post("/api/autos", upload.single("csvFile"), async (req, res) => {
    await auto_save_all(req, res);
  });
};

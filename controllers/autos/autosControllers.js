//auto Model
const Auto = require("../../models/AutoFi");

//read csv file and turn into json
const csv = require("csvtojson");

exports.auto_list = function (req, res) {
  Auto.find({}, (err, result) => {
    res.send(result);
  });
};

exports.auto_save_all = async function (req, res) {
  try {
    const csvFile = req.file.buffer.toString();
    const provider = req.body.provider;

    console.log(provider + "  SEND FILE");

    let autos = await csv().fromString(csvFile);

    let autosSchema = [];

    autos.map((auto) => {
      const doc = new Auto({
        Provider: provider,
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

    await Auto.insertMany(autosSchema);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};

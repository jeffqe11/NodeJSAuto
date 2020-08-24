const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//autofi Schema
const AutoSchema = new Schema({
  Provider: { type: String, required: true },
  UUID: { type: String, required: true },
  VIN: { type: String, required: true },
  Make: { type: String, required: true },
  Model: { type: String, required: true },
  Mileage: { type: String, required: true },
  Year: { type: String, required: true },
  Price: { type: String, required: true },
  ZipCode: { type: String, required: true },
  CreateDate: { type: String, required: true },
  UpdateDate: { type: String, required: true },
});

// autofi Model and export
module.exports = mongoose.model("autofi", AutoSchema);

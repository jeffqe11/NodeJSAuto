process.env.NODE_ENV = "test";
const { connect, closeDatabase } = require("../database/mongoDatabase");
const autofi = require("../models/AutoFi");
const mongoose = require("mongoose");

beforeAll(async () => await connect());

afterAll(async () => await closeDatabase());

describe("Auto", function () {
  it("auto can be created correctly in database", async () => {
    const doc = new autofi(auto);

    await doc.save();

    let autos = await autofi.find();

    expect(autos.length).toBe(1);
  });

  it("auto without required property schema validation error", async () => {
    const doc = new autofi(autoError);

    await doc.validate().catch((e) => {
      expect(e.name).toBe("ValidationError");
    });
  });

  it("Schema correct validation", async () => {
    const doc = new autofi(auto);

    let a = await doc.validate();

    expect(a).toBe(undefined);
  });
});

var auto = {
  Provider: "test",
  UUID: "1",
  VIN: "02-595-4873",
  Make: "Volkswagen",
  Model: "New Beetle",
  Year: "1998",
  Price: "$508.07",
  ZipCode: "0904-5047",
  Mileage: "17",
  CreateDate: "8/24/2019",
  UpdateDate: "5/3/2016",
};

var autoError = {
  UUID: "1",
  VIN: "02-595-4873",
  Year: "1998",
  Price: "$508.07",
  ZipCode: "0904-5047",
  Mileage: "17",
  CreateDate: "8/24/2019",
  UpdateDate: "5/3/2016",
};

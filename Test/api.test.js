process.env.NODE_ENV = "test";
//supertest to execute api test
const request = require("supertest");

//get the app server
const app = require("../server");

//database connection
const { connect, closeDatabase } = require("../database/mongoDatabase");

beforeAll(async () => await connect());
afterAll(async () => await closeDatabase());

describe("Autos Api", () => {
  it("Get Autos from API", async () => {
    var autos = await request(app)
      .get("/api/autos")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(autos.res.text).toBe("[]");
  });

  it("Post Autos correct csv File API", async () => {
    await request(app)
      .post("/api/autos")

      .attach("csvFile", "./Test/MOCK_DATA_SUCCESS.csv")
      .field({ provider: "test" })
      .expect(200);
  });

  it("Post Autos Incorrect csv File API", async () => {
    await request(app)
      .post("/api/autos")

      .attach("csvFile", "./Test/MOCK_DATA_ERROR.csv")
      .field({ provider: "test" })
      .expect(500);
  });

  it("Client page HTML PAGE", async () => {
    await request(app)
      .get("/")
      .expect("Content-Type", "text/html; charset=UTF-8")
      .expect(200);
  });
});

const chaiPromise = import("chai");
const request = require("supertest");
const app = require("../server");
const Reservation = require("../models/Reservation");
const Catway = require("../models/Catway");
require("dotenv").config();
const jwt = require("jsonwebtoken");

afterEach(async function () {
  await Reservation.deleteMany({});
  await Catway.deleteMany({});
});

describe("GET /api/reservations", function () {
  it("doit récupérer toutes les réservations", async function () {
    const token = jwt.sign(
      { userId: "65c64ea45574a6e69aef1c13" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const chai = await chaiPromise;
    const expect = (await chai).expect;

    const res = await request(app)
      .get("/api/reservations")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an("array");
  });
});

describe("POST /api/catways", function () {
  it("doit créer un nouveau catway", async function () {
    const chai = await chaiPromise;
    const expect = (await chai).expect;

    const token = jwt.sign(
      { userId: "65c64ea45574a6e69aef1c13" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const res = await request(app)
      .post("/api/catways")
      .set("Authorization", `Bearer ${token}`)
      .send({
        catwayNumber: "91",
        catwayState: "disponible",
        type: "long",
      });
    expect(res.statusCode).to.equal(201);
  });
});

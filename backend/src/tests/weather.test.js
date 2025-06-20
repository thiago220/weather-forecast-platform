import request from "supertest";
import app from "../app.js";
import { connectDB } from "../config/db.js";
import mongoose from "mongoose";

import { getTestToken } from "./utils/getTestToken.js";

let token = "";

beforeAll(async () => {
  await connectDB();
  token = await getTestToken();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Rotas de Clima", () => {
  it("retorna erro sem query", async () => {
    const res = await request(app)
      .get("/api/weather")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(400);
  });

  it("retorna clima de uma cidade válida", async () => {
    const res = await request(app)
      .get("/api/weather?city=Ouro Preto")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("main");
  });
});

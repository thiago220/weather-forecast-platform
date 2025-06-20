import request from "supertest";
import app from "../app.js";
import { connectDB } from "../config/db.js";
import mongoose from "mongoose";
import { getTestToken } from './utils/getTestToken.js'

let token = "";

beforeAll(async () => {
  await connectDB()
  token = await getTestToken()

  await request(app)
    .get("/api/weather?city=São Paulo")
    .set("Authorization", `Bearer ${token}`);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Histórico de buscas", () => {
  it("deve retornar o histórico do usuário", async () => {
    const res = await request(app)
      .get("/api/history")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

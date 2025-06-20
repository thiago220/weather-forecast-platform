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

describe("Middleware de Autenticação", () => {
  it("deve bloquear acesso sem token", async () => {
    const res = await request(app).get("/api/weather?city=Ouro Preto");
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
});

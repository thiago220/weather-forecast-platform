import request from "supertest";
import app from "../app.js";
import { connectDB } from "../config/db.js";
import mongoose from "mongoose";

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth - Cadastro e Login", () => {
  const user = {
    name: "Teste",
    email: "teste@example.com",
    password: "123456",
  };

  it("deve cadastrar um novo usuário", async () => {
    const res = await request(app).post("/api/auth/signup").send(user);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  });

  it("deve fazer login e retornar token", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: user.password,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});

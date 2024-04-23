import { app } from "../express";
import request from "supertest";
import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

describe("E2E test for product", () => {
  let sequelize: Sequelize;

  const input = {
    type: "a",
    name: "mause",
    price: 200
  };

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send(input);

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual("mause");
    expect(response.body.price).toEqual(200);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      type: "a",
      name: "",
      price: 200
    });
    expect(response.status).toBe(500);
  });

  it("should find product by id", async () => {
    const product = await request(app).post("/product").send(input);

    const response = await request(app).get(`/product/${product.body.id}`).send({});

    expect(response.status).toBe(200);
    expect(response.body).toEqual(product.body);
  });

  it("should find product by id invalid", async () => {
    const response = await request(app).get(`/product/${""}`).send({});

    expect(response.status).toBe(404);
    expect({}).toEqual(response.body);
  });

  it("should list all product", async () => {
    const product1 = await request(app).post("/product").send(input);
    const product2 = await request(app).post("/product").send(input);

    const response = await request(app).patch("/product/listAll").send({});

    expect(response.status).toBe(200);
    expect(response.body.products[0].id).toEqual(product1.body.id);
    expect(response.body.products[0].name).toEqual(product1.body.name);
    expect(response.body.products[0].price).toEqual(product1.body.price);

    expect(response.body.products[1].id).toEqual(product2.body.id);
    expect(response.body.products[1].name).toEqual(product2.body.name);
    expect(response.body.products[1].price).toEqual(product2.body.price);
  });

  it("should not update a product", async () => {
    const product = await request(app).post("/product").send(input);

    const inputUpdate = {
      name: "mause game",
      price: 400
    }

    const response = await request(app).put(`/product/${product.body.id}`).send(inputUpdate);

    expect(response.status).toBe(200);
    expect(inputUpdate).toEqual(Object.assign(inputUpdate, { id: product.body.id }));
  });

});

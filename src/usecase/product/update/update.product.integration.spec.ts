import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import { v4 as uuid } from "uuid";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test integration create product use case", () => {
  let sequelize: Sequelize;

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

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const product = new Product(uuid(), "mause", 200);

    await productRepository.create(product);

    const input = {
      id: product.id,
      name: "mouse game",
      price: 400
    };
    
    const output = {
      id: product.id,
      name: product.name,
      price: product.price
    };

    const result = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: product.name,
      price: product.price
    });
  });
});

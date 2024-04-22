import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import { v4 as uuid } from "uuid";
import ListProductUseCase from "./list.product.usecase";

describe("Test integration list product use case", () => {
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

  it("should list all a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    const product1 = new Product(uuid(), "mause", 200);
    const product2 = new Product(uuid(), "teclado", 400);

    await productRepository.create(product1);
    await productRepository.create(product2);


    const output = {
      products: [
        {
          id: product1.id,
          name: product1.name,
          price: product1.price
        },
        {
          id: product2.id,
          name: product2.name,
          price: product2.price
        }
      ]
    };

    const result = await usecase.execute({});

    expect(result).toEqual(output);
  });
});

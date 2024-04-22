import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import ProductFactory from "../../../domain/product/factory/product.factory";
import FindPruductUseCase from "./find.product.usecase";

const product = ProductFactory.create(
  "a",
  "mause",
  200
);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const usecase = new FindPruductUseCase(productRepository);

    const input = {
      id: product.id,
    };

    const output = {
      id: product.id,
      name: product.name,
      price: product.price
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});

import CreateProductUseCase from "./create.product.usecase";

const input = {
  type: "a",
  name: "mause",
  price: 200
};

const inputWithInvalidType = {
  type: "",
  name: "mouse",
  price: 200
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);
  
    const output = await createProductUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    });
  });

  it("should throw an error for invalid product type", async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);
  
    await expect(createProductUseCase.execute(inputWithInvalidType)).rejects.toThrow("Product type not supported");
  });
});

export interface InputListProductDto {}

type Product = {
  name: string;
  price: number;
};

export interface OutputListProductDto {
  products: Product[];
}

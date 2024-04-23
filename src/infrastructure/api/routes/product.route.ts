import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import FindPruductUseCase from "../../../usecase/product/find/find.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import UpdateProductUseCase from "../../../usecase/product/update/update.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const useCase = new CreateProductUseCase(new ProductRepository);
  
  try {
    const productDto = {
      name: req.body.name,
      type: req.body.type,
      price: req.body.price
    };

    const output = await useCase.execute(productDto);
  
    res.send(output);

  } catch (err) {
    res.status(500).send(err);
  }
});

productRoute.get('/:id', async (req: Request, res: Response) => {
  const useCase = new FindPruductUseCase(new ProductRepository);

  try {
    const productDto = {
      id: req.params.id
    }

    const output = await useCase.execute(productDto);
  
    res.send(output);

  } catch (err) {
    res.status(500).send(err);
  }
});

productRoute.all('/listAll', async (req: Request, res: Response)=> {
  const useCase = new ListProductUseCase(new ProductRepository);

  try {
    const output = await useCase.execute({});
    
    res.send(output);
  } catch (err) {
    console.log(err, "ASDDASDASD");
    res.status(500).send(err);
  }
});

productRoute.put('/:id', async (req: Request, res: Response) => {
  const useCase = new UpdateProductUseCase(new ProductRepository);

  try {
    const productDto = {
      id: req.params.id,
      name: req.body.name,
      price: req.body.price
    }

    const output = await useCase.execute(productDto);
  
    res.send(output);

  } catch (err) {
    res.status(500).send(err);
  }
});
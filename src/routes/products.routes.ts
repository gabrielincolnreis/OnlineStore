import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ProductsRepository from '../repositories/ProductsRepository';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService'
import UpdateProductService from '../services/UpdateProductService'

const productsRouter = Router();

productsRouter.get('/', async (request, response)=> {
  const productsRepository = await getCustomRepository(ProductsRepository)
  const products = await productsRepository.find();

  return response.json(products);
});

productsRouter.post('/', async (request, response)=> {
  const { name } = request.body;

  const createProduct = new CreateProductService();
  const product = await createProduct.execute({
    name,
  });

  return response.json(product);
})

productsRouter.delete('/:id', async (request, response)=> {
  const { id } = request.params;

  const deleteProducts = new DeleteProductService();

  await deleteProducts.execute(id);

  return response.status(204).send();
})

productsRouter.put('/:id', async (request, response)=> {
  const { id } = request.params;
  const { name } = request.body;
  
  const updateProductsService = new UpdateProductService();

  const product = await updateProductsService.execute(id, name);

  return response.json(product);
  
})

export default productsRouter;
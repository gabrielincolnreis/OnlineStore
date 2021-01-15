import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ProductsRepository from '../repositories/ProductsRepository';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService'
import UpdateProductService from '../services/UpdateProductService'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const productsRouter = Router();

productsRouter.use(ensureAuthenticated);

productsRouter.get('/', async (request, response)=> {
  const productsRepository = await getCustomRepository(ProductsRepository)
  const products = await productsRepository.find();

  return response.json(products);
});

productsRouter.post('/', async (request, response)=> {
  try{
    const { name } = request.body;

    const createProduct = new CreateProductService();
    const product = await createProduct.execute({
      name,
    });

    return response.json(product);
  } catch (err){
    return response.status(400).json({error: err.message})
  }
  
})

productsRouter.delete('/:id', async (request, response)=> {
  try {
    const { id } = request.params;

    const deleteProducts = new DeleteProductService();

    await deleteProducts.execute(id);

    return response.status(204).send();
  } catch (err){
    return response.status(400).json({error: err.message})
  } 
})

productsRouter.put('/:id', async (request, response)=> {
  try{
    const { id } = request.params;
    const { name } = request.body;
    
    const updateProductsService = new UpdateProductService();
  
    const product = await updateProductsService.execute(id, name);
  
    return response.json(product);
  } catch(err){
    return response.status(400).json({error: err.message})
  }
});

export default productsRouter;
import { getCustomRepository } from 'typeorm';

import Product from '../models/Products';
import ProductsRepository from '../repositories/ProductsRepository';

interface Request {
  name: string;
}

class CreateProductService {
  public async execute({name}: Request): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = productsRepository.create({
      name,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
import { getCustomRepository } from 'typeorm';
import Product from '../models/Products';

import ProductsRepository from '../repositories/ProductsRepository';

class UpdateProductsService {
  public async execute(id: string, name:string ): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const products = await productsRepository.findOne(id);

    if (!products) {
      throw new Error('Product does not exist');
    }

    products.name = name

    await productsRepository.save(products);

    return products;
  }
}

export default UpdateProductsService;

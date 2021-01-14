import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import ProductsRepository from '../repositories/ProductsRepository';

class DeleteProductsService {
  public async execute(id: string): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const products = await productsRepository.findOne(id);

    if (!products) {
      throw new AppError('Product does not exist');
    }

    await productsRepository.remove(products);
  }
}

export default DeleteProductsService;

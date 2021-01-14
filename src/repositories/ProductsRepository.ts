import { EntityRepository, Repository} from 'typeorm';

import Products from '../models/Products';

@EntityRepository(Products)
class ProductsRepository extends Repository<Products>{
  
}

export default ProductsRepository;
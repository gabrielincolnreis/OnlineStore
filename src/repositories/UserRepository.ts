import { EntityRepository, Repository} from 'typeorm';

import Users from '../models/User';

@EntityRepository(Users)
class UsersRepository extends Repository<Users>{
  
}

export default UsersRepository;
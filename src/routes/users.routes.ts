import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import UserRepository from '../repositories/UserRepository';
import CreateUserService from '../services/CreateUserService';

const UsersRouter = Router();

UsersRouter.get('/', async (request, response)=> {
  const userRepository = await getCustomRepository(UserRepository)
  const users = await userRepository.find();

  return response.json(users);
});

UsersRouter.post('/', async (request, response)=> {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();
  const user = await createUser.execute({
    name,
    email,
    password,
  });

  return response.json(user);
})


export default UsersRouter;
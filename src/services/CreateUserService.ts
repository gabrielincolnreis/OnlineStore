import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import User from '../models/User';
import UsersRepository from '../repositories/UserRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });
    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const user = usersRepository.create({
      name,
      email,
      password,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
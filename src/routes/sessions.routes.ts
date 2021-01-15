import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService'
import { classToClass } from 'class-transformer';

 
const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response)=> {
  try {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();
      
    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });


    return response.json({ token }) 
  } catch (err){
    return response.status(400).json({error: err.message})
  }
});

export default sessionsRouter;
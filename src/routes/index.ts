import { response, Router } from 'express';

const routes = Router();

routes.post('/users', (request, response)=> {
  const {name, email} = request.body;


  const user ={
    name,
    email
  }
})
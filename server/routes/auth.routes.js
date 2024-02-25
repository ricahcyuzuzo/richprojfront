import express from 'express';
import { login, signup } from '../controllers/auth.controller';

const routes = express();

routes.post('/signup', signup);
routes.post('/login', login);

export default routes;

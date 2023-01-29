import {Router} from 'express';
//IMPORTS
import user from './user';
import project from './project';

const routes = Router();

routes.use('/users', user);
routes.use('/projects', project);



export default routes;
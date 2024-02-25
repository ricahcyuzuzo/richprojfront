import express from 'express';
import { acceptBorrow, addAsset, askForecast, countsAdmin, dispose, getForecasts } from '../controllers/admin.controller';

const routes = express();

routes.post('/asset', addAsset);
routes.patch('/dispose', dispose);
routes.patch('/acquisition', acceptBorrow);
routes.post('/llama/forecast', askForecast);
routes.get('/llama/forecasts', getForecasts);
routes.get('/admin/counts', countsAdmin);

const AdminRoutes = routes;

export default AdminRoutes;

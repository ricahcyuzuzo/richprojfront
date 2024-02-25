import express from 'express';
import { acquisition, assets, borrowAsset, counts, depreciated, missing, reportDepreciated, reportForecast, reportMissing, requestMaintenance } from '../controllers/staff.controller';

const routes = express();

routes.post('/borrow', borrowAsset);
routes.post('/missing', reportMissing);
routes.post('/depreciated', reportDepreciated);
routes.post('/maintenance', requestMaintenance);
routes.post('/forecast', reportForecast);
routes.get('/assets', assets);
routes.get('/acquisition', acquisition);
routes.get('/missing', missing);
routes.get('/depreciated', depreciated);
routes.get('/staff/counts', counts);

const StaffRoutes = routes;

export default StaffRoutes;

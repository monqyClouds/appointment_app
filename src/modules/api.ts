import {Router} from 'express';
import doctorsRoutes from './doctors/doctors.routes';

const api = Router();

api.use('/doctors', doctorsRoutes);

export default api;

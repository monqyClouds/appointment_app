import {Router} from 'express';
import doctorsRoutes from './doctors/doctors.routes';
import slotsRoutes from './slots/slots.routes';

const api = Router();

api.use('/doctors', doctorsRoutes);
api.use('/slots', slotsRoutes);

export default api;

import express from 'express';
import {
    userAuth
} from '../middleware/AuthMiddleware';
import {
    createLocation,
    updateLocation,
    getLocations,
    deleteLocation
} from '../controllers/orgLocationController';

const LocRouter = new express();

LocRouter.get('/', userAuth(['SUPER_ADMIN_ROLE', 'ADMIN_ROLE', 'USER_ROLE']), getLocations);
LocRouter.post('/', userAuth(['SUPER_ADMIN_ROLE', 'ADMIN_ROLE']), createLocation);
LocRouter.put('/:id', userAuth(['SUPER_ADMIN_ROLE', 'ADMIN_ROLE']), updateLocation);
LocRouter.delete('/:id', userAuth(['SUPER_ADMIN_ROLE', 'ADMIN_ROLE']), deleteLocation);

export default LocRouter;
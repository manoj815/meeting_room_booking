import express from 'express';
import {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    authenticate
} from '../controllers/UserController';
import {
    userAuth,
    adminAuth,
} from '../middleware/AuthMiddleware';
import {
    validateUser
} from '../middleware/UserValidateMiddleware';
const userRoute = express();

userRoute.get('/', userAuth(['SUPER_ADMIN_ROLE','ADMIN_ROLE','USER_ROLE']), getAllUser);
userRoute.get('/:id', userAuth(['SUPER_ADMIN_ROLE','ADMIN_ROLE','USER_ROLE']), getUserById);
userRoute.post('/', validateUser,userAuth(['ADMIN_ROLE','SUPER_ADMIN_ROLE']), createUser);
userRoute.post('/login', authenticate);
userRoute.put('/:id', userAuth(['ADMIN_ROLE','USER_ROLE']), updateUser);
userRoute.delete('/:id', userAuth(['SUPER_ADMIN_ROLE','ADMIN_ROLE','USER_ROLE']), deleteUser);

export default userRoute;
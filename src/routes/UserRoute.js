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

userRoute.get('/', userAuth, getAllUser);
userRoute.get('/:id', userAuth, getUserById);
userRoute.post('/', validateUser, createUser);
userRoute.post('/login', authenticate);
userRoute.put('/:id', userAuth, updateUser);
userRoute.delete('/:id', userAuth, deleteUser);

export default userRoute;
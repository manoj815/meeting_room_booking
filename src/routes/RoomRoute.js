import express from 'express';
const RoomRoute = new express();
import {
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
    deleteRoom
} from '../controllers/RoomController';

import {
    userAuth, adminAuth
} from '../middleware/AuthMiddleware';

RoomRoute.get('/', userAuth, getAllRooms);
RoomRoute.get('/:id', userAuth, getRoomById);
RoomRoute.post('/', adminAuth, createRoom);
RoomRoute.put('/:id', adminAuth, updateRoom);
RoomRoute.delete('/:id', adminAuth, deleteRoom);

export default RoomRoute;
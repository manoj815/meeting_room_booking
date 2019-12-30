import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from './src/config/Db';
import userRoute from './src/routes/UserRoute';
import roomRoute from './src/routes/RoomRoute';
import RoomImagesRoute from './src/routes/RoomImagesRoute';
import OrganizationRoute from './src/routes/OrganizationRoute';
import LocRouter from './src/routes/OrgLocationRoute';
import {
    log
} from './src/helpers/Log';
import {
    config
} from './src/config/config';


const app = express();
app.use(express.json());
app.use(cors());

app.set('secretKey', 'noderestapi');

app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    return res.status(200).send({
        'message': 'your first end point is working'
    });

});

app.listen(3002, () => {
    log.info('app is running on port 3002');
});

app.use('/user', userRoute);
app.use('/room', roomRoute);
app.use('/room-images', RoomImagesRoute);
app.use('/organization', OrganizationRoute);
app.use('/location', LocRouter);
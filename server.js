import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from './src/config/Db';
import userRoute from './src/routes/UserRoute';
import roomRoute from './src/routes/RoomRoute';
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('secretKey', 'noderestapi');
app.use(bodyParser.json());
app.get('/', (req, res) => {
    return res.status(200).send({
        'message': 'your first end point is working'
    });

});

app.listen(3002, () => {
    console.log('app is running on port 3002');
});

app.use('/user', userRoute);
app.use('/room', roomRoute);

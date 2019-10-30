import mongoose from 'mongoose';

const db = mongoose.connect('mongodb://localhost:27017/booking_db', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log(`mongo database connected ...`)
    })
    .catch(err => {
        console.log(err);
    });

module.exports = db;
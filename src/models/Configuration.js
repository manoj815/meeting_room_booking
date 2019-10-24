import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const configSchema = new Schema({
    _id: {
        type: Number,
    },

}, {
    strict: false
});

export default configSchema;
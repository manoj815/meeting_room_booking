import mongoose from 'mongoose';
import Organization from './Organization';

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    _id: {
        type: Number,
    },
    orgId: {
        ref: 'Organization',
        type: Number,

    },
    locationName: {
        type: String,
        required: [true, 'Location name cant be empty']
    },
    address: {
        type: String,
        required: [true, 'Address cant be empty']
    },
    contactNo: {
        type: Number,
    },
    email: {
        type: String
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        //default: Date.now
    },
    updatedAt: {
        type: Date,
    }

});
// Use pre middleware
// Arrow Operator will not work in this case
LocationSchema.pre('save', function (next) {
    const LocationModel = mongoose.model('Location', LocationSchema);
    // Only increment when the document is new
    if (this.isNew) {
        LocationModel.countDocuments().then(res => {
            this._id = res + 1;
            next();
        });
    }
});

export const Location = mongoose.model('Location', LocationSchema, 'locations');
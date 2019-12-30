import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import {
    Location
} from './OrgLocation';

const Schema = mongoose.Schema;
const organizationSchema = new Schema({
    _id: {
        type: Number,
    },
    organizationName: {
        type: String,
        //unique: true,
        required: [true, 'Organization name required'],
    },
    logo: {
        type: String,
    },
    
    status: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
    Locations: [{
        ref: 'Location',
        type: Number,
        
    }],

});

// Use pre middleware
// Arrow Operator will not work in this case
organizationSchema.pre('save', function (next) {

    const orgModel = mongoose.model('Organization', organizationSchema);
    // Only increment when the document is new
    if (this.isNew) {
        orgModel.countDocuments().then(res => {

            console.log(res + 1);
            this._id = res + 1;
            console.log(this._id);
            next();
        });
    }

    // var doc = this;
    // orgModel.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter)   {
    //     if(error)
    //         return next(error);
    //     doc.testvalue = counter.seq;
    //     console.log(doc.testvalue);
    //     next();
    // });
    // next();
});

organizationSchema.plugin(uniqueValidator, {
    message: '{PATH} must be unique',
});

//export default organizationSchema;
 export const Organization = mongoose.model('Organization', organizationSchema);
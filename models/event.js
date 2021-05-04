const mongoose = require('mongoose');

//constructor function
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    firstName: {
        type: String,
        required: true   
    },
    lastName: {
        type: String,
        required: true   
    },
    number:{
        type: String,
        required:true
    },
    purpose:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true,
        default: Date.now()
    },
    createdBy:{
        type: String,
        required: true
    },
    doctor:{
        type:String,
        required:true
    }
});

//Creating the models just like blueprints
module.exports = mongoose.model('Event', eventSchema);
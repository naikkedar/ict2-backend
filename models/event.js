const mongoose = require('mongoose');

//constructor function
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true   
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

//Creating the models just like blueprints
module.exports = mongoose.model('Event', eventSchema);
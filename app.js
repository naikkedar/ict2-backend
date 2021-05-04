// Node express server
require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Event = require('./models/event');
const morgan = require('morgan')
const cors = require('cors');




//db connection
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@appointments.l2g9s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=> console.log('connected to DB'))
.catch(err => console.log(err));

app.use(cors())
app.use(express.json());
app.use(morgan('common'));


app.get('/events', async (req, res, next) => {
    try {
        const events = await Event.find({})
        res.json({data:events})
    } catch (error) {
        throw new Error(error)
    }
})

app.post('/events', async(req, res, next) => {
    try {
        const incomingData = req.body;
        console.log(incomingData)
        const {firstName, lastName} = incomingData;
        const createdBy = `${firstName} ${lastName}`
        if(createdBy){
            const foundUser = await Event.find({createdBy:createdBy})
            if(foundUser.length) throw new Error('user already exists') 
            const events = await Event.create({...incomingData, createdBy})
            res.json({data:events})
        }else {
            throw new Error('something went wrong')
        }
    } catch (error) {
        const err =  new Error(error)
        next(err);
    }
    
    
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handler
app.use(function (err, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err.stack : {}
    })
});



app.listen(4000, () => console.log('server listening at port 4000'));

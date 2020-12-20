const mongoose = require('mongoose')
const workOrderSchema = require('./workOrder1')

const workerSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    phone:{
        type:Number,
    },
    equipment:{
        type: String,
    },
    shifts:{
        type:String,
    },
    latitude:{
        type:Number,
    },
    longitude:{
        type:Number,
    },
    available:{
        type:Boolean,
    },
    order : {
            type: mongoose.Schema.Types.ObjectId,
           ref: "WorkOrder"
    }
    
    
},{timestamps: true})
const Worker = new mongoose.model('Worker1', workerSchema)

module.exports = Worker

      // CreatedBy:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    // ,
    // upvotes:{
    //     type:Number,
    //     default: 0
    // }
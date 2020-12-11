const mongoose = require('mongoose')

const workerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type:Number,
        required: true
    },
    equipment:{
        type: String,
        required: true
    },
    shifts:{
        type:String,
        required: true,
    },
    latitude:{
        type:Number,
        required: true
    },
    longitude:{
        type:Number,
        required:true
    },
    available:{
        type:Boolean,
        required:true
    }
    
})

workerSchema.set('toObject', { virtuals: true });

workerSchema.methods.toJSON = async function(){
    const worker = this
    const workerObject = worker.toObject()
    return workerObject
}

workerSchema.methods.getName = function(){
    return this.name
}

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
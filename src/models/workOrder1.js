const mongoose = require('mongoose')

const workOrderSchema = new mongoose.Schema({
    location:{
        type:String,
    },
    latitude:{
        type:Number,
    },
    longitude:{
        type:Number,
    },
    rescueType:{
        type:String,
        trim: true,
        lowercase:true,
    },
    disasterType:{
        type:String,
    },
    priority:{
        type: Number
    },
    rescueInstructions:{
        type: String,
    }
},{
    timestamps: true
})


workOrderSchema.virtual('worker', {
    ref: 'Worker',
    localField: '_id',
    foreignField: 'order'

})

const WorkOrder = mongoose.model('WorkOrder', workOrderSchema)

module.exports = WorkOrder
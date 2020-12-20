const express = require('express')
const router = new express.Router()
const Worker = require('../models/worker1')
const WorkOrder = require('../models/workOrder1')
const {assignedTask, findValidWorkers} = require('../utils/algos')


// Create a WorkOrder
router.post('/api/workOrder', async (req,res) => {
    const order = new WorkOrder(req.body)
    try{
        await order.save()
        res.status(201).send({order})
    }
    catch(e){
        res.status(500).send()
    }
})


// Create a worker
router.post('/api/workers', async (req,res) => {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    const worker = new Worker(req.body)
    try{
        await worker.save()
        res.status(201).send({worker})
    }
    catch(e){
        res.status(500).send()
    }
})

//Worker notifies that the order is complete and it is deleted from his queue
router.patch('/api/workers/:id',async (req,res) => {
    const _id = req.params.id
    try{
        const worker = await Worker.findById({_id})
        if(!worker)
            return res.status(404).send()
        if(worker["order"] != undefined){
            const order = await WorkOrder.findByIdAndRemove({_id: worker["order"]})
        }
        worker["order"] = undefined
        await worker.save()
        res.send(worker)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/api/assignOrder/:id', async (req,res) => {
    const _id = req.params.id
    try{
        const order = WorkOrder.findById({_id})
        assignedTask(order)

    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router
const express = require('express')
const router = new express.Router()
const Worker = require('../models/worker1')

var cors = require('cors');
router.use(cors())


//Retrieving workers
router.get('/api/workers', async (req,res) => {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
    const workers = await Worker.find({})
    res.send(workers)
})

//Retrieving worker
router.get('/api/worker/:id', async (req,res) => {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    const workers = await Worker.find({_id: req.params.id})
    res.send(workers)
})


//delete worker
router.delete('/api/workers/:id', async (req,res) => {
    try{
        // const task = await Task.findByIdAndDelete(req.params.id)
        const worker = await Worker.findOneAndDelete({_id:req.params.id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router
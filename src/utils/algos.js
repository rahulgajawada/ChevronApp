const Worker = require('../models/worker1')
const WorkOrder = require('../models/workOrder1')
const sendMessage = require('../twilio/send_sms')

let date_ob = new Date();

console.log(date_ob.getHours());


const assignedTask = async (order) => {
    let q = []
    let Order = await order
    q.push(Order)
    for(let i = Order.priority-1; i >= 0; i--){
        let priorityOrder = await WorkOrder.find({"priority": i})
        for(let i = 0; i < priorityOrder.length; ++i)
            q.push(priorityOrder[i])
    }
    while(q.length != 0){
        let pop = q.shift()
        const {morn, even} = await findValidWorkers(pop)
        let minTime = 1000000000000000000000;
        let minIndex = 0;
        let currentTime = date_ob.getHours();
        if(currentTime > 12){
            for(let i = 0; i < morn.length; i++){
                let t = avgTime(morn[i],pop.facility)
                if(t < minTime){
                     minTime = t
                     minIndex = i
                }
             }
             if(morn[minIndex] != null){
                morn[minIndex]["order"] = pop._id
                morn[minIndex].save()
             }
        }
        else{
            for(let i = 0; i < even.length; i++){
                let t = avgTime(even[i],pop.facility)
                if(t < minTime){
                     minTime = t
                     minIndex = i
                }
             }
             if(even[minIndex] != null){
                even[minIndex]["order"] = pop._id
                even[minIndex].save()
             }
            
        }
        
    }
}
    // while(q.length != 0){



const degreesToRadians = (degrees) => degrees * Math.PI / 180

const avgTime = async (worker, target_facility) => {
    let lat1 = await target_facility.latitude;
    let lat2 = await worker.latitude;
    let lng1 = await target_facility.longitude;
    let lng2 = await worker.longitude;
      // The radius of the planet earth in kilometers
    let radiusEarth = 6378.137;
    let dLat = degreesToRadians(lat2 - lat1);
    let dLong = degreesToRadians(lng2 - lng1);
    let a = Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.cos(degreesToRadians(lat1), 2)) +
    Math.pow(Math.sin(dLong / 2), 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = radiusEarth * c;
    return distance/40;
}




const findValidWorkers = async(workOrder) => {
    const order = await workOrder
    let validWorkers = await Worker.find({})
    validWorkers = validWorkers.filter((worker) => {
        if(worker.equipment)
            return worker.equipment.includes(order.equipment)
        return false
    })
    validWorkers = validWorkers.reduce((acc, worker) => {
        if(worker.shifts === "morning"){
            acc["morn"].push(worker)
            return acc
        }
        else if(worker.shifts === "evening"){
            acc["even"].push(worker)
            return acc
        }
    }, {"morn": [], "even": []})
    // console.log(validWorkers)
    return validWorkers
}
// findValidWorkers(order)
// assignedTask(order)

const order = WorkOrder.findById("5f6666865fb0bd66ef68fb2a")
assignedTask(order)


module.exports = {findValidWorkers, assignedTask}



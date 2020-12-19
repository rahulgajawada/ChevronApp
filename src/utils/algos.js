const Worker = require('../models/worker1')
const WorkOrder = require('../models/workOrder1')
const sendMessage = require('../twilio/send_sms')

let date_ob = new Date();
 
let orders = []
const mornEndTime = 16
const mornStartTime = 8
const evenEndTime = 23
const evenStartTime = 17



const assignedTask = async (order) => {
    let q = []
    let Order = await order
    q.push(Order)
    for(let i = Order.priority-1; i >= 0; i--){
        let priorityOrder = await WorkOrder.find({"priority": i})
        for(let i = 0; i < priorityOrder.length; ++i)
            q.push(priorityOrder[i])
    }
    // console.log(q)

    // console.log(q)
    while(q.length != 0){
        let pop = q.shift()
        const {morn, even} = await findValidWorkers(pop)
        let maxTime = 0;
        let maxIndex = 0;
        let currentTime = date_ob.getHours()
        console.log(currentTime)
         for(let i = 0; i < morn.length; i++){
            //  currentTime = mornStartTime + 1
             let t = mornEndTime - Math.max(currentTime,mornStartTime) - avgTime(morn[i],pop.facility)
             if(t > maxTime){
                maxTime = t
                maxIndex = i
             }
         }
        //  console.log(maxIndex)
        //  console.log(morn[maxIndex])
        //  morn[maxIndex]["worker"].push(ptr)
        break;

    }
    // while(q.length != 0){
    //     let ptr = q.pop()
    //     let valid_morn = [];
    //     let valid_eve = [];
    //     for(let i = 0; i < workers.length; i++){
    //         if(workers[i].equipment.includes(order.equipment)){
    //             if(workers[i].shift.includes("morning")){
    //                valid_morn.push(workers[i])
    //             }
    //             else{
    //                 valid_eve.push(workers[i])
    //             }
    //         } 
    //     }
    //     let maxTime = 0;
    //     let maxIndex = -1;
    //      for(let i = 0; i < valid_morn.length; i++){
    //          let t = mornEndTime - Math.max(currentTime,mornStartTime) - avgTime(valid_morn[i],ptr.facility)
    //          if(t > maxTime){
    //             maxTime = t
    //             maxIndex = i
    //          }
    //      }
    //      valid_morn[maxIndex]["worker"].push(ptr)

    //     maxTime = 0;
    //     maxIndex = -1;
    //      for(let i = 0; i < valid_morn.length; i++){
    //          let t = mornEndTime - Math.max(currentTime,mornStartTime) - avgTime(valid_morn[i],ptr.facility)
    //          if(t > maxTime){
    //             maxTime = t
    //             maxIndex = i
    //          }
    //      }
    //      valid_morn[maxIndex]["worker"].push(ptr)

    // }
    
}



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


module.exports = findValidWorkers



// const f = async(workers) => {
//     const worker = await workers
//     let str = "Sam"
//     let arr = []
//     for(let i = 0; i < worker.length; ++i){
//         arr.push(worker[i]["name"])
//     }
//     arr[0] = "bam"
//     return arr
    // if(str.includes(worker[0]["name"])){
    //     console.log(1)
    // }   
// }
// const arr = f(workers)
// arr[0] = "app"
// arr
// .then((x) => console.log(x))

// let arr = []
// Worker.find({})
// .then((worker) => {
//     arr[0] = worker[0]
//     return worker
// })
// .catch((err) => console.log(err))
// console.log(arr)

// const id = "5f66a8fac516bb6f2242ea1d"
// Worker.findById(id)
//     .then((worker) => console.log(worker.name))
//     .catch((err) => console.log(err))
// let arr = []
// workers[0]["name"] = "sammy"
// workers
// .then((res) => console.log(res))
// .catch((error) => console.log(error)) 
// console.log(arr)
// for(let i = 0; i < workers.length; i++){
//     workers[i]
//     .then((worker) => console.log(worker))
//     .catch((err) => console.log(err))
// }

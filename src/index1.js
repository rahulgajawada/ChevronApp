const express = require('express')
require('./db/mongoose')
const path = require('path')
const app = express()
const port = process.env.port || 4000
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))
const workerRouter = require('./routers/worker')
const workOrderRouter = require('./routers/workOrder')
const properRouter =  require('./routers/routes')


app.use(express.json())
app.use(workerRouter)
app.use(workOrderRouter)
app.use(properRouter)


app.listen(port, () => {
    console.log("Server is on port " + port)
})

// const User = require('./models/user')
// const Post = require('./models/post')
// const main = async () => {

//     const user = User.findById('5f2ef6f319e72f17083d7cc4')
//     await user.populate('posts').execPopulate()
//     console.log(user.posts)

//     const post = Post.findById('5f2f9e7d5a85f22043917bb5')
//     await post.populate('CreatedBy').execPopulate()
//     console.log(post.owner)

// }
// main()





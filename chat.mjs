import socket from 'socket.io'
import http from 'http'
import mongodb from 'mongodb'
const mongo = mongodb.MongoClient

let chat = app => {
  mongo.connect('mongodb://00alloc00:01VerySafePassword10@ds111370.mlab.com:11370/alloc', (err, client) => {
    if (err) throw err
    console.log(' -- Connected to database')

    // Module's global variable
    let chat = {
      users : [],
      connections : []
    }

    // Constants
    const server = http.Server(app)
    const io = socket.listen(server).sockets

    // Listen to port 8000 or generated one
    let port = ( process.env.PORT || 8000 )
    server.listen(port)
    console.log(` -- Server started running on port ${port}`)

    io.on('connection', socket => {
      let chats = client.db('alloc').collection('chats')

      // Get chats from mongo collection
      chats.find().limit(100).sort({_id:1}).toArray((err, res) => {
        if (err) throw err
        socket.emit('output', res)
      })

      // Handle input event
      socket.on('input', data => {
        let name = data.name
        let message = data.message

        // Insert to db
        chats.insert({name, message}, () => {
          io.emit('output', [data])
        })
      })
    })
  })
}

export default chat

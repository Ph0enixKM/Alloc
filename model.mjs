import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
  fname : {
    type : String
  },
  lname : {
    type : String
  },
  email : {
    type : String,
    index : true
  },
  password : {
    type : String
  }
})

let user = mongoose.model('User', userSchema)

user.createUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash
      newUser.save(callback)
    })
  })
}

user.getUserByEmail = (email, callback) => {
  user.findOne({email}, callback)
}

user.comparePassword = (password, hash, callback) => {
  bcrypt.compare(password, hash, (err, isMatch) => {
    if (err) throw err
    callback(null, isMatch)
  })
}

user.getUserById = (id, callback) => {
  user.findById(id, callback)
}

export default user

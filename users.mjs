import express from 'express'
import User from './model.mjs'
import passport from 'passport'
import passportLocal from 'passport-local'

const LocalStrategy = passportLocal.Strategy
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('index')
})

router.post('/register', (req, res) => {
  let data = {
    fname : req.body.fname,
    lname : req.body.lname,
    email : req.body.email,
    password : req.body.password,
    password2 : req.body.password2,
  }

  // Validation
  if (data.email == '') {
    res.render('index',{ error : 'Email cannot be empty' })
  } else if (data.password == '') {
    res.render('index',{ error : 'Password cannot be empty' })
  } else if (data.password2 != data.password) {
    res.render('index',{ error : 'Passwords doesn\'t match' })
  } else {
    let newUser = new User(data)
    User.createUser(newUser, (err, user)=>{
      if (err) throw err
      console.log(user)
    })
    req.flash('success_msg', 'You are successfully registered')
    res.redirect('/users/login')
  }
})

passport.use(new LocalStrategy((email, password, done) => {
  User.getUserByEmail(email, (err, user) => {
    if (err) throw err
    if (!user) {
      return done(null, false, {message: 'Invalid Email'})
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err
      if (isMatch) {
        return done(null, user)
      } else {
        return done(null, false, {message: 'Invalid Password'})
      }
    })
  })
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => {
    done(err, user)
  })
})

router.post('/login', passport.authenticate('local', {
  successRedirect : '/dashboard',
  failureRedirect : '/users/login',
  failureFlash : true
}), (req, res) => {
  res.redirect('/')
})

export default router

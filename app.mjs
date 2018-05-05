import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import flash from 'connect-flash'
import session from 'express-session'
import passport from 'passport'
import passportLocal from 'passport-local'
import mongo from 'mongodb'
import mongoose from 'mongoose'

mongoose.connect('mongodb://00alloc00:01VerySafePassword10@ds111370.mlab.com:11370/alloc')
let db = mongoose.connection

// Modules
import routes from './routes.mjs'
import users from './users.mjs'
import chat from './chat.mjs'

const app = express()
const LocalStrategy = passportLocal.Strategy
app.use(express.static(process.cwd() + '/public'))

// Set View Engine to be EJS
app.set('view engine', 'ejs')
app.set('views', process.cwd() + '/public/html')

// BodyParser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// Session Middleware
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}))

// Passport initialization
app.use(passport.initialize())
app.use(passport.session())

// Use Flash
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  res.locals.user = req.user || null
  next()
})

app.use('/', routes)
app.use('/users', users)

chat(app)

import express from 'express'
import _ from 'lodash'
const router = express.Router()

router.get('/', (req, res) => {
  if (req.user)
    res.redirect('/dashboard')
  else
    res.render('index')
})

router.get("/chat", (req, res) => {
  res.render('chat')
})

router.get("/dashboard", (req, res) => {
  if (req.user)
    res.render('dashboard', _.pick(req.user, ['fname','lname','email']) )
  else
    res.redirect('/users/login')
})

export default router

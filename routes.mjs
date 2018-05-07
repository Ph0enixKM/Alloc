import express from 'express'
import _ from 'lodash'
const router = express.Router()

router.get('/', (req, res) => {
  if (req.user)
    res.redirect('/dashboard')
  else
    res.render('index')
})

router.get("/user", (req, res) => {
  res.render('user')
})

router.get("/dashboard", (req, res) => {
  if (req.user)
    res.render('dashboard', _.pick(req.user, ['fname','lname','email']) )
  else
    res.redirect('/users/login')
})

export default router

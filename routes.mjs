import express from 'express'
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
  res.render('dashboard')
})

export default router

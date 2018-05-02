import express from 'express'
const router = express.Router()

router.get("/", (req, res) => {
  res.render('index')
})

router.get("/chat", (req, res) => {
  res.render('chat')
})

router.get("/dashboard", (req, res) => {
  res.render('dashboard')
})

export default router

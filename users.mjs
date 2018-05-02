import express from 'express'
const router = express.Router()

router.get("/login", (req, res) => {
  res.render('index')
})

router.post("/register", (req, res) => {
  let data = {
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

  }
})

export default router

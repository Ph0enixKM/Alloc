import express from 'express'
const app = express()

// Set View Engine to be EJS
app.set('view engine', 'ejs')
app.set('views', process.cwd() + '/public/html')

// Open index.ejs when home page request
app.get("/", (req, res) => {
  res.render('index')
})

// Listen to port 8000
app.listen(8000, () => console.log("Server started on port 8000"))

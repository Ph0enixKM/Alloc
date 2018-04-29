import express from 'express'
const app = express()

// Set View Engine to be EJS
app.set('view engine', 'ejs')
app.set('views', process.cwd() + '/public/html')

// Open index.ejs when home page request
app.get("/", (req, res) => {
  res.render('index')
})

app.get("/chat", (req, res) => {
  res.render('chat')
})

app.get("/dashboard", (req, res) => {
  res.render('dashboard')
})
app.use(express.static(process.cwd() + '/public'))

// Listen to port 8000
app.listen(8000, () => console.log("Server started on port 8000"))

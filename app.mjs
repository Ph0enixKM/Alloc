import express from 'express'
const app = express()

app.set('view engine', 'ejs')
app.set('views', process.cwd() + '/public/html')

app.get("/", (req, res) => {
  res.render('index')
})

app.listen(8000, () => console.log("Server started on port 8000"))

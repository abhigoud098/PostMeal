import express from 'express'

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static('views'))

app.get('/', (req, res) => {
  res.render('index');
})
app.get('/add', (req, res) => {
  res.render('addMeal');
})
app.get('/myRes', (req, res) => {
  res.render('index');
})
app.get('/login', (req, res) => {
  res.render('login');
})
app.get('/signup', (req, res) => {
  res.render('signup');
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'

await mongoose.connect('mongodb+srv://abhigoud198484:snapcode09@cluster0.hkwptbc.mongodb.net/users')

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))

// Add session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}))

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  pass: String
})
const mealSchema = new mongoose.Schema({
  title: String,
  meal: String,
  email: String
})

const dbWaleBhiya = mongoose.model('User', userSchema, 'userData')
const mealWaleBhiya = mongoose.model('Meal', mealSchema, 'mealData')

app.set('view engine', 'ejs')
app.use(express.static('views'))

// Middleware to make user available in all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null
  next()
})

app.get('/', (req, res) => {
  res.render('index', { user: res.locals.user });
})
app.get('/add', (req, res) => {
  res.render('addMeal', { user: res.locals.user });
})
app.get('/myRes', (req, res) => {
  res.render('index', { user: res.locals.user });
})
app.get('/login', (req, res) => {
  res.render('login');
})
app.get('/signup', (req, res) => {
  res.render('signup');
})

// post

app.post('/formsubmit', async (req, res) => {
  const { name, email, pass } = req.body
  const nayaUser = new dbWaleBhiya({ name, email, pass })
  await nayaUser.save()
  res.redirect('/login')
})

app.post('/login', async (req, res) => {
  const { email, pass } = req.body
  const user = await dbWaleBhiya.findOne({ email, pass })
  if (user) {
    req.session.user = user // Save user in session
    res.redirect('/')
  } else {
    res.send('Invalid credentials')
  }
})

app.post('/add', async (req, res) => {
  const { title, meal } = req.body
  const email = req.session.user.email
  const nayaMeal = new mealWaleBhiya({ title, meal, email })
  await nayaMeal.save()
  res.redirect('/')
})

// Optional: Logout route
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login')
  })
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
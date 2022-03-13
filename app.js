const express = require('express');
const app = express();
const db = require('./database');
//app.use(morgan('short'));
let Student = require('./model');
db.sync().then(() => 'DB initted...');

app.use('/static', express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'pug');

app.get('/', async (req, res) => {
  let students = null;
  try {
    students = await Student.findAll();
    res.render('home', {
      students: students,
    });
  } catch {
    res.render('home', { students: students, title: 'Home' });
  }
});

app.get('/all-students', async (req, res) => {
  let students = null;
  try {
    students = await Student.findAll();
    res.render('all-students', {
      students: students,
    });
  } catch {
    res.render('all-students', { title: 'All records', students: students });
  }
});

app.get('/create', (req, res) => {
  res.render('add', { title: 'Crete' });
});

app.post('/create-record', async (req, res) => {
  const newStudent = Student.create(req.body);
  console.log(req.body);
  res.redirect(`/`);
});

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

const express = require('express');
const { Op } = require('sequelize');

const app = express();
const morgan = require('morgan');
const db = require('./database');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
let Student = require('./model');
// Routes
const homeRouter = require('./routes/homeRoute');
const studentsRoute = require('./routes/studentsRoute');
const { searchController } = require('./controllers/searchController');
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
db.sync().then(() => 'DB initted...');

app.use('/static', express.static('public'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'webtech', saveUninitialized: false, resave: true }));
app.use(morgan('short'));

app.use('/', homeRouter);
app.use('/all-students', studentsRoute);
app.get('/all-students/search', searchController);

app.get('/create', (req, res) => {
  res.render('add', {
    title: 'Crete',
    success: req.session.success,
    errors: req.session.errors,
  });
  req.session.errors = null;
  req.session.success = false;
});

app.post(
  '/create',
  urlEncodedParser,
  [
    check(
      'firstName',
      'First name can not be empty and min 6 character long'
    ).notEmpty(),
    check(
      'lastName',
      'Last name can not be empty and min 6 character long'
    ).notEmpty(),
    check('address', 'Address can not be empty').notEmpty(),
    check('email', 'The email is not valid').isEmail().normalizeEmail(),
    check(
      'studentID',
      'The student ID is not valid. It must be 6 character long'
    )
      .notEmpty()
      .isLength({ min: 6 }),
  ],
  async (req, res) => {
    req.session.success = false;
    req.session.errors = null;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.session.success = false;
      req.session.errors = errors.array();
      res.redirect('/create');
    } else {
      req.session.success = true;
      const newStudent = Student.create(req.body);
      res.status(200).redirect(`/create`);
    }
  }
);

app.get('/update/:id', async (req, res) => {
  const id = req.params.id;
  const student = await Student.findOne({
    where: {
      id: id,
    },
  });
  res.render('add', { student: student });
});

app.post('/update/:id', async (req, res) => {
  const id = req.params.id;
  const updatedStudent = await Student.update(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      studentID: req.body.studentID,
      email: req.body.email,
    },
    {
      where: {
        id: id,
      },
    }
  );
  res.redirect('/all-students/?updated=true');
});

app.get('/delete/:id', async (req, res) => {
  const id = req.params.id;
  const updatedList = Student.destroy({ where: { id: id } });
  res.redirect('/all-students?deleted=true');
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

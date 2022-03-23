const { check } = require('express-validator');
exports.validationChain = [
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
  check('studentID', 'The student ID is not valid. It must be 6 character long')
    .notEmpty()
    .isLength({ min: 6 }),
];

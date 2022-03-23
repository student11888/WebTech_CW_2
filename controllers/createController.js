const session = require('express-session');

exports.createController = (req, res) => {
  res.render('add', {
    title: 'Crete',
    success: req.session.success,
    errors: req.session.errors,
  });
  req.session.errors = null;
  req.session.success = false;
};

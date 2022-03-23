let Student = require('../model');

exports.homeController = async (req, res) => {
  let students = null;
  try {
    students = await Student.findAll();
    const deleted = req.query.deleted == 'true' ? true : false;
    res.render('home', {
      title: 'Home',
      students: students,
      deleted: deleted,
    });
  } catch {
    res.render('home', { title: 'Home', students: students });
  }
};

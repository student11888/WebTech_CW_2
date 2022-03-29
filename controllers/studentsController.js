let Student = require('../model');
const db = require('../database');
db.sync().then(() => 'DB initted...');

exports.studentsController = async (req, res) => {
  let students = null;
  const updated = req.query.updated == 'true' ? true : false;
  const deleted = req.query.deleted == 'true' ? true : false;
  try {
    students = await Student.findAll();
    res.render('all-students', {
      title: 'All records',
      students: students,
      updated: updated,
      deleted: deleted,
    });
  } catch {
    res.render('all-students', {
      title: 'All records',
      students: students,
      updated: false,
      search: true,
      deleted: deleted,
    });
  }
};

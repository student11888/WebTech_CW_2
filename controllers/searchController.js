const { Op } = require('sequelize');
let Student = require('../model');

exports.searchController = async (req, res) => {
  let searchResult;
  let query = req.query.search;
  query = query.toLowerCase();
  searchResult = await Student.findAll({
    where: {
      firstName: {
        [Op.like]: '%' + query,
      },
    },
  });
  if (Object.keys(searchResult).length <= 0) {
    res.render('all-students', {
      title: 'All records',
      error: true,
    });
  } else {
    res.render('all-students', {
      title: 'All records',
      students: searchResult,
    });
  }
};

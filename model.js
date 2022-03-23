let { DataTypes } = require('sequelize');
let db = require('./database');

let Student = db.define(
  'Student',
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    studentID: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.CHAR,
    },
  },
  {
    tableName: 'students',
  }
);

module.exports = Student;

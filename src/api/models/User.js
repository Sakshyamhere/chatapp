const { Sequelize, DataTypes } = require('sequelize');
const sequelize =require('../../../db')

const User = sequelize.define(
  'User',
  {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : true
      },
      image : {
        type : DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type : DataTypes.STRING,
        allowNull:false
      }
  },
);
module.exports = {User}
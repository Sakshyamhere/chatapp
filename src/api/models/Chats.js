const { Sequelize, DataTypes } = require('sequelize');
const sequelize =require('../../../db');
const { User } = require('./User');

const Chat = sequelize.define(
  'Chat',
  {
    sender: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    receiver: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
          },
      },
      message : {
        type: DataTypes.STRING,
        allowNull: false,
      },
  },
);
module.exports = {Chat}
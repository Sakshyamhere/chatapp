const { Op } = require("sequelize");
const { User } = require("../models/User");

const search = async (req, res) => {
  const { query } = req.query;
  try {
    const users = await User.findAll({
      where: {
        fullname: {
          [Op.like]: `%${query}%`,
        },
      },
      attributes: { exclude: ["password"] },
    });
    res.status(200).send({ users });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

const getAllPeople = async (req, res) => {
  const { id } = req.query;
  try {
    const users = await User.findAll({
      where: {
        id: {
          [Op.not]: id,
        },
      },
      attributes: { exclude: ["password"] },
    });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

const getUserWithId = async(req,res) => {
  const {id} = req.query
  console.log(id)
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] }
    });
  
     res.status(200).send({user})
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
}

module.exports = { search, getAllPeople,getUserWithId };

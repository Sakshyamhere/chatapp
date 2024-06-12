require("dotenv").config();
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const secret = process.env.SECRET;

const userSignUp = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body)
  const image = req.file.path || "https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email must be unique" });
    }

    // Hash the password
    const hash = await bcrypt.hash(password, saltRounds);

    // Create JWT token without the password
    const payLoad = { name, email };
    const token = jwt.sign(payLoad, secret, { expiresIn: "7d" });

    // Create new user
    const user = await User.create({
      fullname: name,
      email: email,
      password: hash,
      image : image,
      token: token,
    });

    res.status(201).json({
      message: "SignUp successful",
      token: user.token,
      user: {
        id:user.id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.parent?.errno === 1062) {
      res.status(409).json({ message: "Email must be unique" });
    } else {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }
}

const userLogIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
 
    if (isPasswordValid) {
      const payLoad = { fullname: user.fullname, email };
      const token = jwt.sign(payLoad, process.env.SECRET, { expiresIn: "7d" });

      await user.update({ token: token });

      res.status(200).json({
        message: "Login successful",
        token: token,
        user: {
          id : user.id,
          fullname: user.fullname,
          email: user.email,
        },
      });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = { userSignUp, userLogIn };

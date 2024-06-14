const express = require('express')
const app = express()
const cors = require("cors");
app.use(express.json());
app.use(cors());
const user = require('./src/api/routes/user');
const search = require('./src/api/routes/search');
const chat = require('./src/api/routes/chat');
const sequelize = require('./db');

const syncDB = async() => {
  try {
    sequelize.sync()
console.log("Connected to database")
  } catch (error) {
    console.log(error)
  }
}
syncDB()

app.use("/api/v1/user", user);
app.use("/api/v1/find",search)
app.use("/api/v1/chat",chat)

const port = 5000;
app.listen(port, () => {
  console.log(`Server running in port http://localhost:${port}`);
});
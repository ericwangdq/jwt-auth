const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = 8888;
const SECRET_KEY = "mykey";

const users = [
  { id: 1, username: "Eric", password: "1103" },
  { id: 2, username: "Juju", password: "0909" }
];

app.use(bodyParser.json());
app.use(cors());

app.get("/time", (req, res) => {
  const time = new Date().toLocaleTimeString();
  res.status(200).send(`The time is ${time}`);
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.post("/login", (req, res) => {
  const user = req.body;
  const validUser = users.find(
    u => u.username === user.username && u.password === user.password
  );

  if (!user.username || !user.password || !validUser) {
    res
      .status(400)
      .send("Error. Please enter the correct username and password");
    return;
  }

  const token = jwt.sign(
    {
      userid: validUser.id,
      username: validUser.username
    },
    "mykey",
    { expiresIn: "3 hours" }
  );

  res
    .status(200)
    .send(`User's name is ${user.username}, access token is ${token}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

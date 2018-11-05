const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");

const app = express();
const PORT = process.env.API_PORT || 5555;
const SECRET_KEY = "mykey";
const jwtCheck = expressjwt({
  secret: SECRET_KEY
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  const time = new Date().toLocaleTimeString();
  console.log(`request time is ${time}`);
  next();
});

app.get("/asset", (req, res) => {
  res.status(200).send("Everybody can see this");
});

app.get("/asset/secret", jwtCheck, (req, res) => {
  const authToken = req.get("Authorization").replace(/^Bearer /, "");
  console.log(`Authorization token is ${authToken}`);
  jwt.verify(authToken, SECRET_KEY, function(err, decoded) {
    console.log(decoded);
    res
      .status(200)
      .send(
        `Only logged in people can see me, result: ${JSON.stringify(decoded)}`
      );
  });
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

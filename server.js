// IMPORTS
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const knex = require("knex");
const knexLogger = require("knex-logger");
const morgan = require("morgan");

const { handleSignIn } = require("./controllers/signIn");
const { handleRegister } = require("./controllers/register");
const { handleProfile } = require("./controllers/profile");
const { handleImage, handleApiCall } = require("./controllers/image");
const { getUsersHistory, postUsersHistory } = require("./controllers/history");

const port = process.env.PORT || 3000;

// CONNECTING TO DATABASE
const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI
});
// EXPRESS INIT
const app = express();
// APPLYING MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(knexLogger(db));
// ROUTES
app.get("/", (req, res) => res.send("It works!"));
app.post("/signIn", handleSignIn(db, bcrypt));
app.post("/register", handleRegister(db, bcrypt));
app.get("/profile/:id", handleProfile(db));
app.put("/image", handleImage(db));
app.post("/imageUrl", (req, res) => handleApiCall(req, res));

app.route("/history/:user_id")
  .get(getUsersHistory(db))
  .post(postUsersHistory(db));

// LISTENING TO PORT
app.listen(port);

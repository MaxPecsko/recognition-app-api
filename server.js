// IMPORTS
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const signIn = require('./controllers/signIn');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// CONNECTING TO DATABASE
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '',
        database: 'recognition-app-db'
    }
});

db.select('*').from('users');

// EXPRESS INIT
const app = express();

// APPLYING MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {res.send('It works!')});
app.post('/signIn', signIn.handleSignIn(db, bcrypt));  
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfile(db));
app.put('/image', image.handleImage(db));
app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)});

// LISTENING TO PORT
app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}`);
});
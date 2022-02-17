const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require ('cors');
const knex = require('knex');
const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');


const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'fatclient',
        password: 'keleop',
        database: 'smart_brains'
    }
});

db.select('*').from('users');

const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('success')
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => { image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
    console.log(`the sever is running on port ${PORT}`)
});
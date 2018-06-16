const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js');
const signIn = require('./controllers/signIn.js');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'Home',
    password : '',
    database : 'smartbrain'
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/signin', (req, res) => signIn.handleSignIn(req, res, db, bcrypt));

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));


app.get('/profile/:id', (req, res) => {
  const {id} = req.params;
  db.select('*').from('users').where({
    id: id
  }).then(user => {
    if (user.length) {
      res.json(user[0]);
    } else {
      res.status(400).json('ID not found')
    }
  })
  .catch(err => res.status(400).json('Error getting user'))
})

app.put('/image', (req, res) => {
  const {id} = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('Unable to get entries'))
})

app.listen(3000, () => {
  console.log('app is running on port 3000');
})

/*
/ ---> res = this is working
/signin --> POST = success/fail
/register --> POST = new user
/profile/:userId --> GET = user
/image --> PUT --> user
*/

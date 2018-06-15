const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex')

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

const database = {
  users: [
    {
      id: '123',
      name: 'luci',
      email: 'lucifer@dogmail.com',
      password: 'bullysticks',
      entries: 0,
      joined: new Date()
    },
    {
      id: '831',
      name: 'andrew',
      email: 'druu831@gmail.com',
      password: 's3cr3t',
      entries: 0,
      joined: new Date()
    }
  ]
};

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    return res.json(database.users[0]);
  } else {
    return res.status(400).json('error logging in');
  }
})

app.post('/register', (req, res) => {
  const {email, name, password} = req.body;
  db('users')
  .returning('*')
  .insert({
    email: email,
    name: name,
    joined: new Date()
  })
  .then(user => {
    res.json(user[0]);
  })
  .catch(err => res.status(400).json('Unable to register'))
})

app.get('/profile/:id', (req, res) => {
  const {id} = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  })
  if (!found) {
    res.status(400).json('ID not found')
  }
})

app.put('/image', (req, res) => {
  const {id} = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++
      return res.json(user.entries);
    }
  })
  if (!found) {
    res.status(400).json('ID not found')
  }
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

const express = require('express');

const app = express();

const database = {
  users: [
    {
      id: 123,
      name: 'luci',
      email: 'lucifer@dogmail.com',
      password: 'bullysticks',
      entries: 0,
      joined: new Date()
    },
    {
      id: 831,
      name: 'andrew',
      email: 'druu831@gmail.com',
      password: 's3cr3t',
      entries: 0,
      joined: new Date()
    }
  ]
};
app.get('/', (req, res) => {
  res.send('this is working');
})

app.post('/signin', (req, res) => {
  res.json('signin!');
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

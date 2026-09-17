require('dotenv').config();  // 1st — always at the very top, before anything else

const express = require('express');
const app = express();

app.use(express.json());



app.get('/', (req, res) => {
  res.send('SERVER ACTIVATED');
});

app.get('/about', (req, res) => {
  res.send('THIS IS MY BACKEND LEARNING JOURNEY');
});

app.post('/hello', (req, res) => {
  console.log(req.body);
  res.send(`Hello, ${req.body.name}! You are ${req.body.age} years old.`);
});

app.put('/hello', (req, res) => {
  console.log(req.body);
  res.send(`Updated! New name is ${req.body.name}`);
});

app.delete('/hello', (req, res) => {
  res.send('Item deleted successfully');
});

app.listen(3000, () => {
  console.log('server running on http://localhost:3000');
});
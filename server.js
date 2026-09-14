const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('SERVER ACcTIVATED');
});

app.get('/about', (req, res) => {
  res.send('THIS IS MY BACKEND LEARNING JOURNEY');
});
app.post('/hello', (req, res) => {
  res.send('you just sent a post request');
});

app.listen(3000, () => {
  console.log('server running on http://localhost:3000');
});
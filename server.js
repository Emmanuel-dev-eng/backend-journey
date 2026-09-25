require('dotenv').config();

const express = require('express');
const { Query } = require('mongoose');
const mysql = require('mysql2');   // Step 2 — import

const app = express();
app.use(express.json());

// Step 3 — the connection block goes here
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.log('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database!');
  }
});

app.get('/' , (req , res) => {
  res.send("success");
}); 
app.put('/post' , (req , res) => {
  res.send(`success put ,  ${req.body.age}`);
}); 
app.delete('/post' , (req , res) => {
  res.send(`success put ,  ${req.body.age}`);
}); 

app.post('/users', (req, res) => {
  const { name, age } = req.body;
  const sql = 'INSERT INTO users (name, age) VALUES (?, ?)';
  db.query(sql, [name, age], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error saving user');
    } else {
      res.send('User saved successfully!');
    }
  });
});


app.listen(3000 , () => {
  console.log('app running on http://localhost:3000')
});
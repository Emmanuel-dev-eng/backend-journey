
require('dotenv').config();

const express = require('express');
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


app.get('/' , (req , res)=>{
  res.send('SERVER ACTIVATED');
});
app.post('/hello',(req , res) =>{
  console.log(req.body)
  res.send(`successfully registred ${req.body.name}`)
});
app.put('/hello' ,(req , res) => {
  res.send(`successfully updated to ${req.body.name}`);
});
app.delete('/hello' , (req , res) =>{
  res.send('successfully sent message');
}) ;

app.listen(3000 , () =>{
  console.log('server redirected http://localhost:3000');
})
;
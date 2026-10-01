require('dotenv').config();
const express =require('express');
const app =express();
const mysql =require('mysql2');
app.use(express.json());

const db =mysql.createConnection({

    host:process.env.DB_HOST, 
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME

}); 
   
db.connect((err) => {
  if (err) {
    console.log('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database!');
  }
});


app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching users');
    } else {
      res.json(results);
    }
  });
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

app.put('/users/:id' ,(req , res) =>{
   const { id } = req.params;
    const { name, age } = req.body;
   const sql ='UPDATE users SET name = ?, age = ?   WHERE id =?';
   db.query(sql , [name , age , id] , (err , results) => {
    if (err){
      console.log(err);
      res.status(500).send('failed to update user data');
    }else{
      res.send('USER DATA SUCCESSFULLY UPDATED ');
    }
   })
   

});
 

app.listen(3000 , () => {
  console.log('server running on http://localhost:3000')
});
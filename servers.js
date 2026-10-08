require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// ---------- DATABASE CONNECTION ----------
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

// ---------- USERS ROUTES ----------

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

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  const sql = 'UPDATE users SET name = ?, age = ? WHERE id = ?';
  db.query(sql, [name, age, id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('FAILED TO UPDATE USER DATA');
    } else {
      res.send('USER DATA SUCCESSFULLY UPDATED');
    }
  });
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('FAILED TO DELETE USER DATA');
    } else {
      res.send('SUCCESS DELETED USER DATA');
    }
  });
});

// ---------- TASKS ROUTES ----------

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  const sql = 'INSERT INTO tasks (title) VALUES (?)'; // fixed: VALUES, not VALUE
  db.query(sql, [title], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('ERROR CREATING TASK');
    } else {
      res.send('TASK SUCCESSFULLY CREATED');
    }
  });
});

app.get('/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching tasks');
    } else {
      res.json(results);
    }
  });
});

app.get('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM tasks WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('FAILED TO GET TASK');
    } else {
      res.json(results);
    }
  });
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  console.log('ID received:', id);
  console.log('Completed value received:', completed);
  const sql = 'UPDATE tasks SET completed = ? WHERE id = ?';
  db.query(sql, [completed, id], (err, results) => {
    if (err) {
      console.log('SQL ERROR:', err);
      res.status(500).send('ERROR UPDATING TASK');
    } else {
      console.log('SQL RESULT:', results);
      res.send('TASK SUCCESSFULLY UPDATED');
    }
  });
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM tasks WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('ERROR DELETING TASK');
    } else {
      res.send('TASK SUCCESSFULLY DELETED');
    }
  });
});




app.get('/notes/:id' , (req , res) =>{
  const { id } =req.params;
  db.query('SELECT * FROM notes WHERE id =?' , [ id ] , (err , results) =>{
     if (err) {
      console.log(err);
      res.status(500).send('UNABLE TO GET USER TASK')
     }else{
      res.send(results);
     }
  } );
});

app.get('/notes' , (req , res) =>{
 
  db.query('SELECT * FROM notes' ,  (err , results) =>{
     if (err) {
      console.log(err);
      res.status(500).send('UNABLE TO GET USER TASK')
     }else{
      res.send(results);
     }
  } );
});

app.post('/notes' , (req , res)=>{

   const { title , content } = req.body; 
   const sql ='INSERT INTO notes (title , content) VALUES (? ,?)';
   db.query(sql , [title , content] , (err , results) => {
      if (err){
        console.log(err);
        res.send('FAILED POSTING INTO DATABASE');
      }else{
        res.status(500).send('SUCCESSFULLY POSTED DATA')
      }
   });
});

app.put('/notes/:id' , (req , res ) =>{
  const { id } = req.params;
  const { title , content } = req.body;
  db.query('UPDATE notes  SET title = ? , content = ?   WHERE id = ?' , [  title , content , id] , (err , results) =>{
     if (err){
      console.log(err);
      res.status(500).send('FAILED UPDATING SPECIFIC TASK INFO');
     } else if ( results.affectedRows === 0){
      res.status(404).send('NOTE NOT FOUND') ;
     } else{
         res.send('TASK SUCCESSFULLY UPDATED');
     }
  });

});

app.delete('/notes/:id' , (req , res) => {
  const { id } = req.params;
  db.query('DELETE FROM notes WHERE id = ? ' , [ id ] , (err , results) =>{
    if (err){
      console.log(err);
      res.status(500).send('FAILED DELETING NOTE DATA')
    }else if ( results.affectedRows === 0){
      res.status(404).send('ROW NOT FOUND');
    }
    else{
      res.send('NOTE DATA SUCCESSFULLY DELETED');
    }
  });
});


// ---------- START SERVER ----------
app.listen(3000, () => {
  console.log('server running on http://localhost:3000');
});
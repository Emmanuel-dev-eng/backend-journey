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
   
db.connect ((err) =>{
  if (err){
    console.log(`exit saving user `(err));
  }else{
    console.log('database connected successfully');
  };

});


app.get('/users' , (req , res) => {
res.send(`welcome  `) 
    
});

app.post('/'  , (req , res ) => {
  console.log(req.body);
  res.send(`welcome ${req.body.name}`)
});

app.listen(3000 , () => {
  console.log('server running on http://localhost:3000')
});
const express=require("express");
const app =express();

app.use(express.json());

app.get('/', (req , res) => {
  res.send('welcome home');
});

app.get('/about', (req , res) => {
  res.send('welcome home about');
});

app.post('/hello' , (req , res) =>{
  console.log(req.body);
  res.send(`welcome MR  ${req.body.name} !`);
});



app.listen(3000 ,() =>{
  console.log('app running at http://localhost:3000');
});

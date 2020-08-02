const express = require('express')
const path = require('path')
const firstRoute=require("./routes/firstRoute");
const getFile=require("./routes/getFile");
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


app.use("/bronzer", firstRoute);
app.use("/getfile", getFile);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render(process.cwd()+"/public/index.html");
});

app.post('/admin',(req, res) => {
  let password=req.body.password;
  if(password=="mypass"){
    res.sendFile(process.cwd()+"/public/admin.html");
  }else{
    res.sendFile(process.cwd()+"/public/index.html");
  }
  
});

app.get('/getData', (req, res) => {
  res.json([{ name: "sharath", age: "26" }]);

})


app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const express = require('express')
const path = require('path')
const firstRoute=require("./routes/firstRoute");
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000
const app = express();


// app.post('/bronzer', upload.array('photos', 12), (req, res) => {
//   console.log(req.body);
//   res.send("ok")
// })
// app.post('/bronzer',upload.single('avatar'), (req, res) => {
//   console.log(req.body);
//   res.send("ok")
// })



app.use("/bronzer", firstRoute);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send("super secret api");
});

app.get('/getData', (req, res) => {
  res.json([{ name: "sharath", age: "26" }]);

})


app.listen(PORT, () => console.log(`Listening on ${PORT}`));

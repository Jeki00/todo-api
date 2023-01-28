const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const mongoose = require('mongoose')
var path = require('path');


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
mongoose.set('strictQuery', true);
app.use(express.static(__dirname + '/public'))
app.use(methodOverride('_method'))

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  task: { type: String },
  completed: { type: Boolean },
  is_deleted:{ type: Boolean },
});

const TASK = mongoose.model('TASK', taskSchema);

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/task', (req, res) => {
  TASK.find((err, data) => {
    if (err) res.send('tidak dapat mengambil data')
    res.render('index', { data })
  })
})

app.post('/task/create', (req, res) => {
  const task = req.body.task;
  const status = false
  const is_delete = false 
  let newTask = new TASK({
    task: task,
    completed: status,
    is_deleted: is_delete
  })
  newTask.save((err, data) => {
    if (err) res.send('tidak dapat memasukkan data')
    res.redirect('/task')
  })
})

app.get('/task/edit/:id', (req, res) => {
  const id = req.params.id;
  TASK.findById(id, (err, data) => {
    if (err) res.send('data tidak ditemukan atau diambil')
    res.render('edit', { data })
  })
})

app.put('/task/done/:id', (req, res) => {
  const id = req.params.id;
  TASK.findByIdAndUpdate(id, { completed: true }, (err, data) => {
    if (err) res.send('data tidak ditemukan atau diambil')
    res.redirect('/task')
  })
})

app.delete('/task/delete/:id',(req,res)=>{
  const id = req.params.id;
  TASK.findByIdAndUpdate(id,{is_deleted:true},(err,data)=>{
    if(err) res.send('tidak dapat menghapus data')
    res.redirect('/task')
  })
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port 3000`)
})
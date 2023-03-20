require('dotenv').config()
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
app.use(methodOverride('_method'))

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const taskRoute = require('./routes/taskRoute')
const userRoute = require('./routes/userRoute');


app.use('/api/user', userRoute)
app.use('/api/task', taskRoute);



app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port 3000`)
})
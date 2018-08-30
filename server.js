var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');

//mongoose conn with mongodb
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://rebby:reebecca1@ds243055.mlab.com:43055/expenses', { useNewUrlParser: true })
.then(() => { console.log('Start')})
.catch(err => { console.log('errrrrr:'+ err.stack);
process.exit(1);
});

// Required application specific custom router module
// Required application specific custom router module
var expenseRouter = require('./src/routes/expenseRouter');

// Use middlewares to set view engine and post json data to the server
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/expenses', expenseRouter);
// Start the server
app.listen(process.env.PORT, function(){
  console.log('Server is running on Port: '+ process.env.PORT);
});

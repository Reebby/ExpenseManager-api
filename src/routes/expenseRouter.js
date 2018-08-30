var express = require('express');
var app = express();
var expenseRouter = express.Router();
var Expense = require('../models/expense');

//create
expenseRouter.route('/insert').post(function(req, res) {
var expense = new Expense(req.body);
expense.save()
.then(exp => {
	res.json('expense added successfully')
})
.catch(err => {
	res.status(400).send('unable to store expense in database');
});
});

//get data from the database
expenseRouter.route('/getData').get(function (req, res) {
  Expense.find(function (err, exp){
    if(err){
      console.log(err);
    }
    else {
      res.json(exp);
    }
  }); 
});

//edit the data
expenseRouter.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Expense.findById(id, function (err, expense){
      res.json(expense);
  });
});

//update the edited data
expenseRouter.route('/update/:id').post(function (req, res) {
  Expense.findById(req.params.id, function(err, expense) {
    if (!expense)
      return next(new Error('Could not load Document'));
    else {
      // do your updates here
      expense.description = req.body.description;
      expense.amount = req.body.amount;
      expense.month = req.body.month;
      expense.year = req.body.year;

      expense.save().then(exp => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
expenseRouter.route('/delete/:id').get(function (req, res) {
  Expense.findOneAndDelete({_id: req.params.id},
       function(err, item){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = expenseRouter;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Expense = new Schema({
  description: { type: String },
  amount: {type: Number},
  month: {type: String},
  year: {type: Number}
},
{
	collection: 'expenses'
});
module.exports = mongoose.model('Expense', Expense);


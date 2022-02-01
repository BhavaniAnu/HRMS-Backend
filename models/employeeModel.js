const mongoose = require("mongoose");

const employee = new Schema({
  name: String,
  mobile: Number,
  email: String,
  _id: String,
  address: String,
  languages: String,
  achievements: String,
  hobbies: String

});

module.exports = mongoose.model('employee', employee);
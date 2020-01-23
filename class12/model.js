const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const studentCollection = mongoose.Schema({
  name : { type : String },
  last : { type : String },
  id : {
    type : Number,
    required : true,
    unique : true
  }
});

const Student = mongoose.model('students', studentCollection);

const StudentList = {
  getAll: function(){
    return Student.find()
      .then(students => {
        return students;
      })
      .catch(error => {
        throw Error(error);
      });
  }
};

module.exports = {StudentList};
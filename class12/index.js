const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

// fake db
let students = [
  {
    firstName: 'Osvaldo',
    lastName: 'Alvarez',
    id: 821228
  },
  {
    firstName: 'Mariano',
    lastName: 'Uvalle',
    id: 819720
  },
  {
    firstName: 'Osvaldo',
    lastName: 'Sanchez',
    id: 815090
  }
];

app.get('/api/students/', (req, res) => {
  res.status(200).json(students);
});

app.get('/api/getById', (req, res) => {
  const {firstName, lastName, id} = req.query;
  
  let result = students.find( student => {
    if(student.id == id)
      return student;
  });

  if(result){
    res.status(200).json(result);
  }else{
    res.statusMessage = 'Student was not found';
    res.status(404).send();
  }

});

app.get('/api/getByName/:name', (req, res) => {
  const {name} = req.params;

  let result = students.filter( student => {
    if(student.firstName === name)
      return student;
  });

  if(result.length > 0){
    res.status(200).json(result);
  }else{
    res.statusMessage = 'Student was not found';
    res.status(404).send();
  }

});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
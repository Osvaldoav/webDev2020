const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const {StudentList} = require('./model'); 

const jsonParser = bodyParser.json();
const app = express();

app.use(express.static('public'));
app.use(morgan('dev'));

// fake db
let students = [
  {
    name: 'Osvaldo',
    last: 'Alvarez',
    id: 821228
  },
  {
    name: 'Mariano',
    last: 'Uvalle',
    id: 819720
  },
  {
    name: 'Osvaldo',
    last: 'Sanchez',
    id: 815090
  }
];

app.get('/api/students/', (req, res) => {
  StudentList.getAll()
    .then( studentList => {
      return res.status(200).json(studentList);
    })
    .catch( error => {
      
    });
  // return res.status(200).json(students);
});

app.get('/api/getById', (req, res) => {
  const {name, last, id} = req.query;
  
  let result = students.find( student => {
    if(student.id == id)
      return student;
  });

  if(result){
    return res.status(200).json(result);
  }
  else{
    res.statusMessage = 'Student was not found';
    return res.status(404).send();
  }

});

app.get('/api/getByName/:name', (req, res) => {
  const {name} = req.params;

  let result = students.filter( student => {
    if(student.name === name)
      return student;
  });

  if(result.length > 0){
    return res.status(200).json(result);
  }
  else{
    res.statusMessage = 'Student was not found';
    return res.status(404).send();
  }

});

app.post('/api/newStudent', jsonParser, (req, res) => {
  const {name, last, id} = req.body;

  if(!(name && last && id)){
    res.statusMessage = 'Information misssing';
    return res.status(406).send();
  }

  let uniqueId = true;

  students.forEach(student => {
    if(student.id === id)
      uniqueId = false;
  });

  if(!uniqueId){
    res.statusMessage = 'A student with such Id already exists';
    return res.status(409).send();
  }

  return res.status(201).json(req.body);
});

app.put('/api/updateStudent/:id', jsonParser, (req, res) => {
  const {name, last, id} = req.body;
  const idParam = req.params.id;

  if(!((name || last) && id)){
    res.statusMessage = 'You must provide Id and at least one of their names';
    return res.status(406).send();
  }

  if(idParam != id){
    res.statusMessage = 'Student Id must be the same as the parameter';
    return res.status(409).send();
  }

  let studentFound = null;

  students.forEach(student => {
    if(student.id == id){
      studentFound = student;
      studentFound.name = name;
      studentFound.last = last;
    }
  });

  if(studentFound){
    return res.status(202).json(studentFound);
  }
  else{
    res.statusMessage = 'Student with such Id was not found';
    return res.status(404).send();
  }

});

app.delete('/api/deleteStudent', jsonParser, (req, res) => {
  const idParam = req.query.id;
  const {name, last, id} = req.body;

  // console.log(req.query);
  
  if(!idParam){
    res.statusMessage = 'Id parameter was not found';
    return res.status(406).send();
  }

  if(idParam != id){
    res.statusMessage = 'Student Id must be the same as the parameter';
    return res.status(409).send();
  }

  let idExists = false;

  students.forEach(student => {
    // delete student
    if(student.id === id)
      idExists = true;
  });

  if(idExists){
    return res.status(204).send();
  }
  else{
    res.statusMessage = 'Student with such Id was not found';
    return res.status(404).send();
  }

});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
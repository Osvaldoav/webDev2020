function loadStudents(){
  let url = '/api/students';
  let settings = {
    method: 'GET'
    // method: 'POST',
    // headers: {
    //   contentType: 'application/json'
    // },
    // body: JSON.stringify(obj)
  }
  
  fetch(url, settings)
    .then( response => {
      if (response.ok){
        return response.json();
      }
    })
    .then( responseJSON => {
      displayResults(responseJSON);
    });
}

function displayResults(responseJSON){
  $('#studentsList').empty();

  responseJSON.forEach(student => {
    $('#studentsList').append(`
      <li>
        ${student.name} ${student.last} ${student.id}
      </li>
    `);
  });
}

function init(){
  loadStudents();
}

init();
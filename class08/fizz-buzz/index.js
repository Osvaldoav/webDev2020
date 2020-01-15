let form = $('#number-chooser');
let results = $('.js-results');

$(form).on("submit", function(e){
  let limit = $(this).find('input').val();

  for(let i = 1; i <= limit; i++){
    let content = i %3 === 0 && i %5 === 0 ? 'fizzbuzz' : i;
    if(content === i && i % 3 == 0)
      content = 'fizz';
    if(content === i && i % 5 == 0)
      content = 'buzz';
    
    let element = $(`<div class="fizz-buzz-item"><span>${content}</span></div>`);
    
    switch(content){
      case 'fizzbuzz':
        element.addClass('fizzbuzz');
        break;
      case 'fizz':
        element.addClass('fizz');
        break;
      case 'buzz':
        element.addClass('buzz');
        break;
    }
    
    $(results).append(element);
  }
});
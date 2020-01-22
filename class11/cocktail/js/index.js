$('#searchItem').on('submit', function(e){
  e.preventDefault();
  const name = $(this).find('input').val();

  if(name === ''){
    alert('Please provide a valid item');
    return;
  }
  $(this).find('input').val('');
  
  $.ajax({
    url: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`,
    method: 'GET',
    dataType: 'json',
    success: function(response){
      let list = $('<ul class="list"></ul>');

      response.drinks.forEach(result => {
        console.log(result);
        let listItems = '';
        for(let i = 1; i <= 15; i++){
          let strI = 'strIngredient'+i;
          let strM = 'strMeasure'+i;

          if(result[strI] !== null && result[strM] !== null){
            listItems += `<li>${result[strI]} - ${result[strM]}</li>`;
          }else{
            break;
          }
        }

        $(list).append(`
          <li class="item">
            <h3>${result.strDrink}</h3>
            <img src="${result.strDrinkThumb}">
            ${listItems}
          </li>
        `);
      });

      $('.list').html(list);
    },
    error: function(err){
      console.log('ERROR: ', err);
    }
  });
});
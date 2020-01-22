const APIKey = '1b48504ac06b45918356a81ec04e0644';

$('#searchItem').on('submit', function(e){
  e.preventDefault();
  const name = $(this).find('input').val();

  if(name === ''){
    alert('Please provide a valid item');
    return;
  }
  $(this).find('input').val('');
  
  $.ajax({
    url: `https://newsapi.org/v2/top-headlines?apiKey=${APIKey}&q=${name}`,
    method: 'GET',
    dataType: 'json',
    success: function(response){
      let list = $('<ul class="list"></ul>');
      response.articles.forEach(result => {
        $(list).append(`
          <li class="item">
            <h3>${result.title}</h3>
            <p>${result.author}</p>
            <img src="${result.urlToImage}">
            <p>${result.description}</p>
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
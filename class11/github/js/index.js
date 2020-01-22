$('#searchItem').on('submit', function(e){
  e.preventDefault();
  const name = $(this).find('input').val();

  if(name === ''){
    alert('Please provide a valid item');
    return;
  }
  $(this).find('input').val('');
  
  $.ajax({
    url: `https://api.github.com/users/${name}/repos`,
    method: 'GET',
    dataType: 'json',
    success: function(response){
      let list = $('<ul class="list"></ul>');
      response.forEach(result => {
        console.log(result);
        $(list).append(`
          <li class="item">
            <h3>${result.name}</h3>
            <a href="${result.clone_url}">${result.clone_url}</a>
          </li>
        `);
      });

      $('.list').html(list);
    },
    error: function(err){
      console.log('ERROR: ', err);
      alert('User was not found! :(');
    }
  });
});
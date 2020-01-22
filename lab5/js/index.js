const key = 'AIzaSyAaoS5_S1u8jKH27ZDHo4vag1PeYvxX9Ic';
let prevPageToken = '';
let nextPageToken = '';
let lastSearch = '';

const get = (search, token = '') => {
  if(token)
    token = `&pageToken=${token}`;

  $.ajax({
    url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${search}${token}&key=${key}`,
    method: 'GET',
    dataType: 'json',
    success: response => {
      prevPageToken = response.prevPageToken;
      nextPageToken = response.nextPageToken;

      let list = $('<ul class="list"></ul>');

      listContent = response.items.forEach(item => {
        const id = item.id.videoId;
        const {title, thumbnails} = item.snippet;
        const imageSrc = thumbnails.medium.url;
        
        $(list).append(`
          <li>
            <a href='https://www.youtube.com/watch?v=${id}' target="_blank">
              <h3>${title}</h3>
              <img src='${imageSrc}'>
            </a>
          </li>
        `);
      });

      $('.list').html(list);
      
      $('#previous').attr('disabled', prevPageToken === undefined);
      $('#next').attr('disabled', nextPageToken === undefined);
    },
    error: err => {
      console.log('ERROR: ', err);
    }
  });

  lastSearch = search;
};


$('#searchItem').on('submit', function(e){
  e.preventDefault();
  const search = $(this).find('input').val();

  if(search === ''){
    alert('Please provide a valid search');
    return;
  }
  $(this).find('input').val('');

  get(search);
});

$('#next').on('click', () => {
  get(lastSearch, nextPageToken);
  $('body').scrollTop(0);
});

$('#previous').on('click', () => {
  get(lastSearch, prevPageToken);
  $('body').scrollTop(0);
});
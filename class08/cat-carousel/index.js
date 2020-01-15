let images = $('.thumbnail');
let hero = $('.hero');


$(images).on("click", function(e){
  let image = $(this).children();
  let src = $(image).attr('src');
  let alt = $(image).attr('alt');
  
  $(hero).children().attr('src', src);
  $(hero).children().attr('alt', alt);
});
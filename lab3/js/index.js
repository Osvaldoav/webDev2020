let todoList = $('.listOfTodos')

$('.listOfTodos').delegate('.checkbox', 'change', function(e){
  let container = $(this).parent();
  
  if($(this).is(":checked"))
    $(container).addClass('isChecked');
  else
    $(container).removeClass('isChecked');
});

// Post ToDo
$('.todoForm').on('submit', function(e){
  e.preventDefault();
  let content = $(this).find('textarea').val();
  $(this).find('textarea').val('');
  $(todoList).append(`
    <div class="todoItem">
      <span>${content}</span>
      <input type="checkbox" name="Todo" class="checkbox">
    </div>
  `);
});

// Clear all Todo's
$('.clearButton').on('click', function(e){
  $(todoList).find('.checkbox').prop('checked', false).change();
});

// Mark all Todo's
$('.markAllButton').on('click', function(e){
  $(todoList).find('.checkbox').prop('checked', true).change();
});

// Delete all Todo's
$('.deleteButton').on('click', function(e){
  $(todoList).empty();
});
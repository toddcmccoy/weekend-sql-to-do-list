console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners();
  // load existing koalas on page load
  getTasks();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', saveTask);
  $('#viewTasks').on('click', '.complete', completeTask);
    console.log( 'in addButton on click' );
  $('#viewTasks').on('click', '.delete-button', deleteTask);
   
}

function getTasks(){
  console.log( 'in getTasks' );
  $('#viewTasks').empty();
  // ajax call to server to get tasks
  $.ajax ({
    url:'/tasks',
    method: 'GET'
  }).then((response) => {
    console.log('response from GET:', response);
    renderTable(response);
  }).catch((error)=> {
    console.log('error in GET:', error);
  })
} // end getTasks

function saveTask(){
  // ajax call to server to get tasks
  // Get info to send to the server
      let newTask = {
        name: $('#nameIn').val(), 
        due_date: $('dueDate').val(),
        notes: $('#notesIn').val()
    };
    // Send the new task to the server as data
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask,
    }).then(function(response) {
        console.log(response);
        getTasks();
    }).catch(function(error) {
        console.log('error in task post', error); 
        alert('Error adding task in client. Please try again later.')       
    });
    console.log('Adding task in client', newTask);
}

function renderTable(tasks) {
  
  for (let i=0; i < tasks.length; i += 1) {
    let task = tasks[i];
    $('#viewTasks').append(`
    <tr>
      <td>${task.name}</td>
      <td>${task.due_date}</td>
      <td>${task.notes}</td>
      <td>
        <button data-id = ${task.id} class = "delete-button" >Delete</button>
      </td>
      <td><button data-status="${task.complete}" data-id=${task.id} class="button complete" >Complete Task</button></td>
    </tr>
  `)
  }
}

// function to delete task
function deleteTask() {
  let taskId = $(this).data('id');

  $.ajax({
    method: 'DELETE',
    url: `/tasks/${taskId}`,
    data: {id: taskId}
  }).then(function() {
    console.log('Here');
    // Once delete is sent, refresh the koala table
    getTasks()
    // getKoalas();
  }).catch(function(error) {
    alert('Something went wrong in the DELETE /Tasks :(', error)
  })
}

function completeTask() {
  let id = $(this).data('id');
  let completed = $(this).data('status');
  console.log('this should be the task id:', id );
  $.ajax({
    method: 'PUT',
    url: `/tasks/${id}`,
    data: {status: !completed}
  })
  .then(function() {
    getTasks();
  })
  .catch(function(error) {
    alert('ERROR in Complete Task FUNCTION IN CLIENT', error);
  })
}


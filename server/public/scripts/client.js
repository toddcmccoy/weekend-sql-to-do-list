$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners();
  // load existing tasks on page load
  getTasks();
}); // end document ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', saveTask);
  $('#viewTasks').on('click', '.complete', completeTask);
    console.log( 'in addButton on click' );
  $('#viewTasks').on('click', '.delete', deleteTask);
}

//function to get all tasks from the database
function getTasks(){
  console.log( 'in getTasks' );
  $('#viewTasks').empty();
  // ajax call to server to get tasks
  $.ajax ({
    url:'/weekend-to-do-app',
    method: 'GET'
  }).then((response) => {
    console.log('response from GET:', response);
    renderTable(response);
  }).catch((error)=> {
    console.log('error in GET:', error);
  })
} // end getTasks


//function to input new tasks into the database
function saveTask(){
  // ajax call to server to get tasks
  // Get info to send to the server
      let newTask = {
        name: $('#nameIn').val(), 
        due_date: $('#dueDate').val(),
        notes: $('#notesIn').val(),
        complete: false
    };
    // Send the new task to the server as data
    $.ajax({
        method: 'POST',
        url: '/weekend-to-do-app',
        data: newTask
    }).then(function(response) {
        console.log(response);
        getTasks();
    }).catch(function(error) {
        console.log('error in task post', error); 
        alert('Error adding task in client. Please try again later.')       
    });
    console.log('Adding task in client', newTask);
//Clearing out the inputs after task is added
      $('#nameIn').val('');
      $('#dueDate').val('');
      $('#notesIn').val('');
}
//end saveTask function

// function to display the tasks from the database onto the page
function renderTable(tasks) {
  
  for (let i=0; i < tasks.length; i += 1) {
    let task = tasks[i];
    $('#viewTasks').append(`
    <tr data-status="${task.complete}" class="status">
      <td>${task.name}</td>
      <td>${task.due_date}</td>
      <td>${task.notes}</td>
      <td>${task.complete}</td>
      <td>
      <button data-id = ${task.id} class = "button delete" >Delete</button>
      </td>
      <td>
      <button id="completed" data-status="${task.complete}" data-id=${task.id} class="button complete" >Complete Task</button>
      </td>
    </tr>
  `)
  }
}
//end of renderTasks function

// function to delete task
function deleteTask() {
  let taskId = $(this).data('id');

  $.ajax({
    method: 'DELETE',
    url: `/weekend-to-do-app/${taskId}`,
    data: {id: taskId}
  }).then(function() {
    console.log('Here');
    // Once delete is sent, refresh the task table
    getTasks()
  }).catch(function(error) {
    alert('Something went wrong in the DELETE /Tasks :(', error)
  })
}
//end delete function

//function to mark a task as completed
function completeTask() {
  let id = $(this).data('id');
  let complete = $(this).data('status');
  
  console.log('this should be the task id:', id );
  $.ajax({
    method: 'PUT',
    url: `/weekend-to-do-app/${id}`,
    data: {status: !complete}
  })
  .then(function() {
    getTasks();
  })
  .catch(function(error) {
    alert('ERROR in Complete Task FUNCTION IN CLIENT', error);
  })
}
// end completeTask function


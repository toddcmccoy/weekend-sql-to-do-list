const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// Get all tasks
router.get('/', (req, res) => {
  let queryText = 'SELECT * FROM "weekend-to-do-app" ORDER BY "due_date";';
  pool.query(queryText).then(result => {
    // Sends back the results in an object
    res.send(result.rows);
  })
  .catch(error => {
    console.log('error getting tasks', error);
    res.sendStatus(500);
  });
});

// Adds a new task to the list of tasks
router.post('/',  (req, res) => {
  let newTask = req.body;
  console.log(`Adding task`, newTask);

  const queryText = `INSERT INTO "weekend-to-do-app" ("name", "due_date", "notes", "complete")
    VALUES ($1, $2, $3, $4);
    `;
  pool.query(queryText, [newTask.name, newTask.due_date, newTask.notes, newTask.complete])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error adding new task`, error);
      res.sendStatus(500);
    });
});
//changes tasks from incomplete to complete
router.put('/:id', (req, res) => {
  let taskId = req.params.id;
  let complete = req.body.status;
  let queryText;

  console.log( 'This is the put request', complete);

  if( complete !== true){
  queryText = 'UPDATE "weekend-to-do-app" SET "complete" = true WHERE id = $1;';
  } else { res.sendStatus(500); 
  }
  pool.query(queryText, [taskId])
  .then((dbResponse) => {
    res.send(dbResponse.rows);
  })
  .catch((error) => {
    console.log(`ERROR IN ROUTER WITH UPDATING /PUT ${queryText} ${error}`);
    res.sendStatus(500);
  }) 
})


// Removes a task from the database and from displaying on the page

router.delete('/:id', (req, res) => {
  let reqId = req.params.id;
  console.log(`Delete request sent for id ${reqId}`);
  let queryText = 'DELETE FROM "weekend-to-do-app" WHERE id = $1;';
  pool.query(queryText, [reqId])
    .then(() => {
      console.log('Task completed and deleted!')
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error deleting with query ${queryText}: ${error}`);
      res.sendStatus(500); //good server always responds
    })
} )


module.exports = router;
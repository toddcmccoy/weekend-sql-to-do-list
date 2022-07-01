const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// Get all books
router.get('/', (req, res) => {
  let queryText = 'SELECT * FROM "tasks" ORDER BY "task_name";';
  pool.query(queryText).then(result => {
    // Sends back the results in an object
    res.send(result.rows);
  })
  .catch(error => {
    console.log('error getting tasks', error);
    res.sendStatus(500);
  });
});

// Adds a new book to the list of awesome reads
// Request body must be a book object with a title and author.
router.post('/',  (req, res) => {
  let newTask = req.body;
  console.log(`Adding task`, newTask);

  let queryText = `INSERT INTO "tasks" ("name", "due_date", "notes",)
    VALUES ($1, $2, $3);`;
  pool.query(queryText, [newTask.name, newTask.due_date, newTask.notes])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error adding new task`, error);
      res.sendStatus(500);
    });
});

// router.put('/:id', (req, res) => {
//   let bookId = req.params.id;
//   let queryText = 'UPDATE "books" SET "isRead" = true WHERE id = $1;';
//   pool.query(queryText, [bookId])
//     .then((result) => {
//       // Sends back the results in an object
//       res.send(result.rows);
//     })
//     .catch((error) => {
//       console.log('error getting books', error);
//       res.sendStatus(500);
//     });
// });


// TODO - DELETE 
// Removes a book to show that it has been read
// Request must include a parameter indicating what book to update - the id

router.delete('/:id', (req, res) => {
  let reqId = req.params.id;
  console.log(`Delete request sent for id ${reqId}`);
  let queryText = 'DELETE FROM "tasks" WHERE id = $1;';
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


// Working with booleans in SQL:
// SELECTing:
// If you want the rows with True in the boolean_column: SELECT * FROM “table” WHERE “boolean_column”;
// If you want the rows with False in the boolean_column: SELECT * FROM “table” WHERE NOT “boolean_column”;
// UPDATEing:
// Setting a value to True:  UPDATE “table” SET “boolean_column” = True;
// Setting a value to False: UPDATE “table” SET “boolean_column” = False;
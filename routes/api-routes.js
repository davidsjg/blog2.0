const db = require('../models');
var express = require("express");



module.exports = (app) => {

app.get('/api/quotes', (req, res) => {


    db.Quote.findAll({}).then((quotes) => {
      console.log("BACKEND FOO quote = " + quotes)
      return res.render('index', { results: quotes });
      // res.json(quotes);

    })
});
      // POST route for saving a new post
app.post('/api/quotes', (req, res) => {
  console.log(req.body);
  db.Quote.create({
    author: req.body.author,
    quote: req.body.quote,

  }).then((dbPost) => res.json(dbPost));
});




}

// app.delete('/api/quotes/:id', (req, res) => {
//   connection.query(
//     'DELETE FROM quotes WHERE id = ?',
//     [req.params.id],
//     (err, result) => {
//       if (err) {
//         // If an error occurred, send a generic server failure
//         return res.status(500).end();
//       }
//       if (result.affectedRows === 0) {
//         // If no rows were changed, then the ID must not exist, so 404
//         return res.status(404).end();
//       }
//       res.status(200).end();
//     }
//   );
// });

// // Update a quote by an id and then redirect to the root route.
// app.put('/api/quotes/:id', (req, res) => {
//   connection.query(
//     'UPDATE quotes SET author = ?, quote = ? WHERE id = ?',
//     [req.body.author, req.body.quote, req.params.id],
//     (err, result) => {
//       if (err) {
//         // If an error occurred, send a generic server failure
//         return res.status(500).end();
//       }
//       if (result.changedRows === 0) {
//         // If no rows were changed, then the ID must not exist, so 404
//         return res.status(404).end();
//       }
//       res.status(200).end();
//     }
//   );
// });

// }
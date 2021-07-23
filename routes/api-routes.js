const db = require('../models');
var express = require("express");



module.exports = (app) => {

app.post('/api/quotes', (req, res) => {
  connection.query(
    'INSERT INTO quotes (author, quote) VALUES (?, ?)',
    [req.body.author, req.body.quote],
    (err, result) => {
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      }

      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    }
  );
});

app.delete('/api/quotes/:id', (req, res) => {
  connection.query(
    'DELETE FROM quotes WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      }
      if (result.affectedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

// Update a quote by an id and then redirect to the root route.
app.put('/api/quotes/:id', (req, res) => {
  connection.query(
    'UPDATE quotes SET author = ?, quote = ? WHERE id = ?',
    [req.body.author, req.body.quote, req.params.id],
    (err, result) => {
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      }
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

}
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 8080;
const db =require("./models")

var compression = require('compression')

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(compression())

var hbs = exphbs.create({
  defaultLayout: "main",

  extname: ".hbs",
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,

  },
  helpers: {
    section: function(name, options) { 
      if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this); 
        return null;
      }
  }    
});
// app.engine('hbs', hbs.engine, exphbs({ defaultLayout: 'main' }));
app.engine('hbs', hbs.engine, exphbs ({ defaultLayout: "main", partialsDir: __dirname + './public/views'}));
app.set('view engine', '.hbs');

const HTMLrouter = require("./routes/html-routes");
// app.use(router);
HTMLrouter(app);

const APIrouter = require("./routes/api-routes");
APIrouter(app);

// const connection = mysql.createConnection({
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: 'Colorado23',
//   database: 'quotes_db',
// });

// connection.connect((err) => {
//   if (err) {
//     console.error(`error connecting: ${err.stack}`);
//     return;
//   }
//   console.log(`connected as id ${connection.threadId}`);
// });

// Serve index.handlebars to the root route.
// app.get('/', (req, res) => {
//   connection.query('SELECT * FROM quotes;', (err, data) => {
//     if (err) {
//       return res.status(500).end();
//     }

//     res.render('index', { quotes: data });
//   });
// });

// // Show the user the individual quote and the form to update the quote.
// app.get('/:id', (req, res) => {
//   connection.query(
//     'SELECT * FROM quotes where id = ?',
//     [req.params.id],
//     (err, data) => {
//       if (err) {
//         return res.status(500).end();
//       }

//       console.log(data);
//       res.render('single-quote', data[0]);
//     }
//   );
// });

// app.post('/api/quotes', (req, res) => {
//   connection.query(
//     'INSERT INTO quotes (author, quote) VALUES (?, ?)',
//     [req.body.author, req.body.quote],
//     (err, result) => {
//       if (err) {
//         // If an error occurred, send a generic server failure
//         return res.status(500).end();
//       }

//       // Send back the ID of the new quote
//       res.json({ id: result.insertId });
//     }
//   );
// });

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

// Start our server so that it can begin listening to client requests.
// Log (server-side) when our server has started
db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});
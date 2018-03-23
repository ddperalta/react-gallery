let express = require('express');

let app = express();
let port = 8080;

app.get("/", (req, res) => res.json({message: "Welcome to our Bookstore!"}));
app.get("/images/", (req, res) => res.json([]));
app.get("/images/:id/", (req, res) => res.json({id: req.params.id}));
app.post("/images/", (req, res) => res.json({id: 0}));

app.listen(port);
console.log(`Listening on port ${port}`);

module.exports = app;

let express = require('express');
let path = require("path");
let app = express();
let port = 8080;

// export PUBLIC_URL="/" on env
app.use("/static", express.static(__dirname + '/build/static'));
app.get("/", (req, res) => res.sendFile(path.join(__dirname + "/build/index.html")));

app.get("/images/", (req, res) => res.json([]));
app.get("/images/:id/", (req, res) => res.json({id: req.params.id}));
app.post("/images/", (req, res) => res.json({id: 0}));

app.listen(port);
console.log(`Listening on port ${port}`);

module.exports = app;

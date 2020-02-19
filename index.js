const config = require('./config')
// const knex = require('knex')(config.db)
// const models = require('./models')(knex);
const apiRouter = require('./controllers')
// (models);
const morgan = require('morgan')
const bodyParser = require('body-parser')
const express = require('express');
const app = express()
const path = require("path");


app.use(morgan('dev'))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,OPTIONS,PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  next();
});
app.use(bodyParser.json({ type: "application/json", limit: "50mb" }));
app.use('/api', apiRouter)
app.use(express.static(path.resolve(__dirname, "..", "build")));



app.use((err, req, res, next) => {
  if (err.stack) {
    if (err.stack.match("node_modules/body-parser"))
      return res.status(400).send("Invalid JSON");
  }

  console.log(err);
  return res.status(500).send("Internal Error.");
});

app.listen(config.express.port, () => {
  console.log(`Server up and listening on port ${config.express.port}`);
});
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const cors = require('cors');

//initialising express - Just mount express-graphql as a route handler:
const app = express();

//Allow cross-origin
app.use(cors());



app.use(
  '/graphql',
  graphqlHTTP({
  schema,
  graphiql: true        // to disable graphiql: false
  })
);

//listening port 5000 for dev environment
const PORT = process.env.PORT || 5000  

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

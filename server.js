/*
Info:
1. https://www.youtube.com/watch?v=SEMTj8w04Z8&list=PLillGF-RfqbZrjw48EXLdM4dsOhURCLZx
2. https://github.com/graphql/express-graphql
3. cli: npm run server
*/

const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const cors = require('cors');

//initialising express - Just mount express-graphql as a route handler:
const app = express();

//Allow cross-origin - https://medium.com/@baphemot/understanding-cors-18ad6b478e2b

app.use(cors());



app.use(
  '/graphql',
  graphqlHTTP({
  schema,
  graphiql: true        // to disable graphiql: false
  })
);

const PORT = process.env.PORT || 5000  //listening port 5000 for dev environment

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

/*
Info:
1. https://www.youtube.com/watch?v=SEMTj8w04Z8&list=PLillGF-RfqbZrjw48EXLdM4dsOhURCLZx
   https://www.youtube.com/watch?v=-XwkFm5a9lw&t=14s
2. https://github.com/graphql/express-graphql
3. cli: npm run server
4. https://www.apollographql.com/docs/react/essentials/get-started (APOLLO)
*/

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

const axios = require('axios');

// Launch type
const LaunchType = new GraphQLObjectType({
  name: 'launch',
  fields: () => ({
    flight_number: { type: GraphQLString },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: RocketType }
  })
});

//Rocket type
const RocketType = new GraphQLObjectType({
  name: 'rocket',
  fields: () => ({
    flight_number: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
});

//Root Query - creating similar to endpoints which are resolvers that will resolve our data
const RootQuery = new GraphQLObjectType ({
  name: 'RootQueryType',
  fields: {
    launches: {                       //GET a list an array of launches
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {      // inside the resolve object is where we access the data
          return axios
          .get('https://api.spacexdata.com/v3/launches')
          .then(res => res.data);
          }
      },
      launch: {                    //GET a launch within an array ofmlaunch
        type: LaunchType,
        args: {
          flight_number: { type: GraphQLInt }
        },
        resolve(parent, args) {
          return axios
          .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
          .then(res => res.data);
        }
      },

//const RocketType
      rockets: {
        type: new GraphQLList(RocketType),
        resolve(parent, args) {
            return axios
            .get('https://api.spacexdata.com/v3/rockets')
            .then(res => res.data);
            }
        },
        rocket: {
          type: LaunchType,
          args: {
            id: { type: GraphQLInt }
          },
          resolve(parent, args) {
            return axios
            .get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
            .then(res => res.data);
          }
        }
    }
});
// export GraphQL schema (database)
module.exports = new GraphQLSchema({
  query: RootQuery
});

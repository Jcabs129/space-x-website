const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

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
    //GET a list an array of launches
    launches: {
      type: new GraphQLList(LaunchType),
      // inside the resolve object is where we access the data
      resolve(parent, args) {
          return axios
            .get('https://api.spacexdata.com/v3/launches')
            .then(res => res.data);
          }
      },
      //GET a launch within an array ofmlaunch
      launch: {        
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

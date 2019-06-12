/*
https://www.youtube.com/watch?v=-XwkFm5a9lw&t=14s - part 2 15.00 mins

cli - npm run dev
graphQL - http://localhost:5000/graphql
client spacex - http://localhost:3000/
*/

import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';          // use to make the queries
import { Query } from 'react-apollo';   // react apollo library

import LaunchItem from './LaunchItem';
import MissionKey from './MissionKey';

// graphQL-tag Query accessing the database defined as LAUNCHES_QUERY
const LAUNCHES_QUERY = gql `
query LaunchesQuery {
  launches {
    flight_number
    mission_name
    launch_date_local
    launch_success
  }
}
`;

export class Launches extends Component {
  render() {
    return (
      //dummy DOM 'Fragment' we use it to wrap our code
        <Fragment>
            <h1 className="h1.display-4.my-3">Launches</h1>
            <MissionKey/>
            <Query query={LAUNCHES_QUERY}>
            {
              ({ loading, error, data }) => {
                if(loading) return <h4>Loading...</h4>
                if(error) console.log(error);
                console.log(data);          // view console on the data you are accessing (LAUNCHES_QUERY)

                return <Fragment>
                {
                //accessing the data query that has an array of launches 'data.launches'
                  data.launches.map(launch => (
                    <LaunchItem key={launch.flight_number} launch={launch} />
                  ))
                }
                </Fragment>;
            }
          }
          </Query>
        </Fragment>
    )
  }
}

export default Launches;

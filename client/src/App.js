import React, { Component } from 'react';
//apollo-boost: Package containing everything you need to set up Apollo Client
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import spacex from './spacex.png'   // src file/module

import Launches from './components/Launches';
import Launch from './components/Launch';


// /graphQL is hitting the server database which we are accessing it via ./server.js file (view it)
const client = new ApolloClient({
  uri: '/graphql'
})

class App extends Component {
  render() {
      return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <img
          src={spacex}
          alt="spacex"
          style={{ width: 300, display: 'block', margin: 'auto'}}
          />

          <Route exact path="/" component={Launches} />
          <Route exact path="/launch/:flight_number" component={Launch} />
        </div>
      </Router>
    </ApolloProvider>
        );
  }
}
export default App;

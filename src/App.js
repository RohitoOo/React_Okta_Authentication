import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar'
import Home from './components/pages/Home'
import Staff from './components/pages/Staff'
import {Security, SecureRoute, ImplicitCallback } from '@okta/okta-react'
import Login from './components/auth/Login'

import { BrowserRouter as Router, Route} from 'react-router-dom'



const config = {
  issuer: 'https://poly-swarm2018.okta.com/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oak38ezp4ysSggcE355'
}


function onAuthRequired({history}){
  history.push('/login')
}

class App extends Component {
  render() {
    return (
      <Router>
        <Security
          issuer={config.issuer}
                  client_id={config.client_id}
                  redirect_uri={config.redirect_uri}
                  onAuthRequired={onAuthRequired}
          >
          <div className="App">
            <Navbar/>
          <div className="container">
              <Route path="/" exact={true} component={Home}/>
               {/* Making Staff Route Secure */}
              <SecureRoute path="/staff" exact={true} component={Staff}/>
              <Route
                path='/login'
                render={() => (
                  <Login baseUrl='https://poly-swarm2018.okta.com' />
              )}
              />
              <Route path='/implicit/callback' component={ImplicitCallback}/>

          </div>
          </div>
        </Security>
      </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

export default withAuth(class Home extends Component {

    state = { authenticated: null };


checkAuthentication = async() => {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

login = async() => {
    this.props.auth.login('/');
  }

logout = async() => {
    this.props.auth.logout('/');
  }

  render() {
    if (this.state.authenticated === null) return null;

    const content = this.state.authenticated ?

      <div> <p className="lead"></p>
        You have Entered The Staff Portal,
        <Link to='/staff'>Click Here</Link>
        <button className="btn btn-light btn-lg" onClick={this.logout}>Logout
        </button>
      </div>
      :
      <div className="lead">
        <p className="lead">Contact Your Supervisor To Get Set Up</p>
        <button className="btn btn-dark btn-lg" onClick={this.login}>Login
        </button>
      </div>

    return (
      <div className="jumbotron">
        <h1 className="display-5">Staff Portal</h1>
        {content}
      </div>
    );
  }
});

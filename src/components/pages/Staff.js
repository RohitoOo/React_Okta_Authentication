import React, { Component } from 'react';

class Staff extends Component {

componentDidMount(){
  const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));

  this.setState ({
    currentUserName: idToken.idToken.claims.email,
    currentUserEmail: idToken.idToken.claims.name
  })

}


  render() {

    const  {currentUserName , currentUserEmail}  = this.state;

    return (
      <div>
        <h1>Welcome {currentUserName} </h1>
        <h4>Active Email : {currentUserEmail} </h4>
      </div>
    );
  }

}

export default Staff;

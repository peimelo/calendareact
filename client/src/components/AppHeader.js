import React, { Component } from 'react';
import { Link, Redirect } from  'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'

import * as AuthAPI from '../utils/AuthAPI';

class AppHeader extends Component {
  componentDidMount() {
    AuthAPI.validate_token()
      .catch(() => this.props.history.push('/login'));
  }

  handleSignOut = (e) => {
    e.preventDefault();

    AuthAPI.sign_out()
      .then(() => {
        this.props.history.push('/login');
      });
  };

  render() {
    if (sessionStorage.getItem('user')) {
      return (
        <div>
          {sessionStorage.getItem('user') && (
            <p>
              {JSON.parse(sessionStorage.getItem('user')).uid}
              <a href="#" onClick={this.handleSignOut}>Sign out</a>
            </p>
          )}
          <Link to="/">
            <h1>CalendaReact</h1>
          </Link>
        </div>
      )
    } else {
      return (
        <Redirect to='/login' />
      )
    }
  }
}

export default AppHeader;

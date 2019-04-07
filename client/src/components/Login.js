import React, { Component } from 'react';
import { Container } from 'reactstrap';

import * as AuthAPI from '../utils/AuthAPI';

export default class Login extends Component {
  handleLogin = (e) => {
    e.preventDefault();

    AuthAPI.sign_in(this.email.value, this.password.value)
      .then(() => this.props.history.push('/'));
  };

  render() {
    return (
      <Container>
        <h2>Sign in</h2>
        <form onSubmit={this.handleLogin}>
          <input name="email" ref={(input) => this.email = input} />
          <input name="password" type="password"
            ref={(input) => this.password = input} />
          <input type="submit" />
        </form>
      </Container>
    )
  }
}

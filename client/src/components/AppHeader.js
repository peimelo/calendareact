import React, { Component } from 'react';
import { Link, Redirect } from  'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'


import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';


import * as AuthAPI from '../utils/AuthAPI';

class AppHeader extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
  componentDidMount() {
    // AuthAPI.validate_token()
      // .catch(() => this.props.history.push('/login'));
  }

  handleSignOut = (e) => {
    e.preventDefault();

    AuthAPI.sign_out();
      // .then(() => {
        // this.props.history.push('/login');
      // });
  };

  render() {
  //   if (sessionStorage.getItem('user')) {
  //     return (
  //       <div>
  //         {sessionStorage.getItem('user') && (
  //           <p>
  //             {JSON.parse(sessionStorage.getItem('user')).uid}
  //             <a onClick={this.handleSignOut}>Sign out</a>
  //           </p>
  //         )}
  //         <Link to="/">
  //           <h1>CalendaReact</h1>
  //         </Link>
  //       </div>
  //     )
  //   } else {
  //     return (
  //       // <Redirect to='/login' />
  //       <h1>tchau</h1>
  //     )
  //   }

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/login/" onClick={this.handleSignOut}>Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );

  }

  
}

export default AppHeader;

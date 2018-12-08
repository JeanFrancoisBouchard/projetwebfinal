import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuthorization } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import { Button, Jumbotron, Collapse, Navbar, NavbarBrand, 
  NavbarToggler, Nav, NavItem, NavLink,
  UncontrolledDropdown, DropdownToggle,
  DropdownMenu, DropdownItem } from 'reactstrap';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    }

    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  toggleNavbar() {
    this.setState ({
      isOpen: !this.state.isOpen
    });
  }
  
  render() {
    return(
      <div>
        <div>
          <Jumbotron>
            <h1>Ciné au 6863 !</h1>
            <p>Pour voir les meilleurs films en ville ou les noix à Thom, c'est l'endroit parfait !</p>
            <hr />
            <p className="lead">
                <Button color="primary" href={ROUTES.ABOUT}>Pour en savoir plus</Button>
            </p>
          </Jumbotron>
        </div>
        <AuthUserContext.Consumer>
          {authUser =>
            authUser ? <NavigationAuth /> : <NavigationNonAuth />
          }
        </AuthUserContext.Consumer>
      </div>
    );
  }
}

const NavigationAuth = () => (
  <div>
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href={ROUTES.LANDING}>Ciné au 6863 !</NavbarBrand>
      <NavbarToggler onClick={this.toggle} />
      <Collapse isOpen={this.state.isOpen} navbar>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
          Compte
          </DropdownToggle>
          <DropdownMenu right>
          <DropdownItem>
              Changer le mot de passe
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem>
              Déconnexion
          </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Collapse>
    </Navbar>
  </div>
);

const NavigationNonAuth = () => (
  <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Ciné au 6863</NavbarBrand>
          <NavbarToggler/>
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href={ROUTES.SIGN_IN}>Se connecter</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
);

export default Navigation;
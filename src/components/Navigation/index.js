import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuthorization } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import { Collapse, Navbar, NavbarBrand, 
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
        <Navbar color="faded" light>
          <NavbarBrand href={ROUTES.LANDING} className="mr-auto">Ciné au 6863</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={this.state.collapsed} navbar>
            <AuthUserContext.Consumer>
              {authUser =>
                authUser ? <NavigationAuth /> : <NavigationNonAuth />
              }
            </AuthUserContext.Consumer>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const NavigationAuth = () => (
  <Nav>
    <DropdownItem href={ROUTES.CHANGEPW}>
      Changer votre mot de passe
    </DropdownItem>
    <DropdownItem href={ROUTES.ADMIN}>
      Admin
    </DropdownItem>
    <DropdownItem>
      <SignOutButton />
    </DropdownItem>
  </Nav>
);

const NavigationNonAuth = () => (
  <Nav>
    <DropdownItem href={ROUTES.SIGN_IN}>
      Connexion
    </DropdownItem>
  </Nav>
);

export default Navigation;
import React, { Component } from 'react';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
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
      collapsed: !this.state.collapsed
    });
  }

  NavigationNonAuth = () => (
    <Nav className="ml-auto" navbar>
      <NavItem>
        <NavLink href={ROUTES.SIGN_IN}>Se connecter</NavLink>
      </NavItem>
    </Nav>
  );

  NavigationAuth = () => (
    <Nav className="ml-auto" navbar>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Options
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem href={ROUTES.HOME}>
            Gérer mes critiques
          </DropdownItem>
          <DropdownItem href={ROUTES.CHANGEPW}>
            Changer le mot de passe
          </DropdownItem>
          <AuthUserContext.Consumer>
            {authUser =>
              authUser.roles.includes(ROLES.ADMIN) ? <AdminLink /> : null
            }
          </AuthUserContext.Consumer>
          <DropdownItem divider />
          <SignOutButton />
        </DropdownMenu>
      </UncontrolledDropdown>
    </Nav>
  );

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
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Ciné au 6863</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} />
            <Collapse isOpen={this.state.collapsed} navbar>
              <AuthUserContext.Consumer>
                {authUser =>
                  authUser ? this.NavigationAuth() : this.NavigationNonAuth()
                }
              </AuthUserContext.Consumer>
            </Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}

const AdminLink = () => (
  <DropdownItem href={ROUTES.ADMIN}>
    Admin
  </DropdownItem>
)

export default Navigation;
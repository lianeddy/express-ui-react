import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
              <Link to='/login'>
                <NavItem>
                  <NavLink>Login</NavLink>
                </NavItem>
              </Link>
              <Link to='/register'>
                <NavItem>
                  <NavLink>Register</NavLink>
                </NavItem>
              </Link>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
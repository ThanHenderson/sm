import React from 'react';
import {
  Nav, Navbar, Container, NavLink,
} from 'react-bootstrap';
import Link from 'next/link';

export type LinkNames = 'Home' | 'Statistics' | 'JetStream' | 'Run';

const NavbarElements: { name: LinkNames, href: string }[] = [
  { name: 'Statistics', href: '/stat' },
  { name: 'JetStream', href: '/jetstream' },
  { name: 'Run', href: '/run' },
];

type NavbarProps = {
  active?: LinkNames
};

const NavbarElement = ({ active }: NavbarProps) => (

  <Navbar bg="dark" expand="lg" variant="dark" fixed="top">

    <Container>

      <Link href="/" passHref>
        <Navbar.Brand>IC Explorer</Navbar.Brand>
      </Link>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {NavbarElements.map(({ name, href }) => (
            <NavLink key={name} href={href} active={active === name}>
              {name}
            </NavLink>
          ))}
        </Nav>
      </Navbar.Collapse>

    </Container>

  </Navbar>
);

NavbarElement.defaultProps = {
  active: 'Home',
};

export default NavbarElement;

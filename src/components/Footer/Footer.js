/*eslint-disable*/
import React from "react";
import { Container, Nav, NavItem, NavLink } from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <Nav>
          <NavItem>
            <NavLink href="#">
              RealSpace Game
            </NavLink>
          </NavItem>
        </Nav>
        <div className="copyright">
          © {new Date().getFullYear()} Powered by{" "}
          <a
            href="#"
            target="_blank"
          >
            Paúl Alvarez.
          </a>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;

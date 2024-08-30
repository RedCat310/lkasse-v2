import React, { Component } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

class NavBar extends Component {
    state = { 
        user: null
     } 
    componentDidMount() {
        onAuthStateChanged(auth, (user) =>{
            this.setState({user: user})
        })
    }
    render() { 
        return <Navbar sticky="top" expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">LKasse</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <LinkContainer to="/">
                    <Nav.Link >Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/verkäufe">
                    <Nav.Link>Verkäufe</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/admin">
                    <Nav.Link >Verwalten</Nav.Link>
                </LinkContainer>
                {/* <Nav.Link onClick={this.props.screen()}>Als Kundenanzeige verwenden</Nav.Link> */}
                <Button variant="primary" onClick={() => this.props.screen()}>
                    Dieses Gerät als Anzeige für Kunden verwenden
                </Button>
                <LinkContainer to="/login">
                    <Nav.Link>{this.state.user ? "Konto verwalten" : "Anmelden"}</Nav.Link>
                </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>;
    }
}
 
export default NavBar;
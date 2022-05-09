import React from "react";
import {Navbar, Container, Nav} from 'react-bootstrap';
import {Link} from "react-router-dom";

class NavigationBar extends React.Component {

    render() {
        return <Navbar className="shadow-lg" bg="dark" variant="dark" expand="lg">
            <Container>
                <Link style={{textDecoration: 'none'}} to="/"><Navbar.Brand href="#home">Lunalogic React Minter</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Link style={{textDecoration: 'none'}} to="/"><Nav.Link href="#home">Accueil</Nav.Link></Link>
                        <Link style={{textDecoration: 'none'}} to="/create"><Nav.Link href="#link">Créer</Nav.Link></Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    }

}

export default NavigationBar;
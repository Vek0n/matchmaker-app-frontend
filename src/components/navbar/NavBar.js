import React from 'react';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { getUsername } from '../app/useUsername';

class NavBar extends React.Component {
    state={
        username:""
    }

    componentDidMount(){
        const username = getUsername()
        this.setState({username:username})
    }

    render() {
        return (
            <div style={{ marginBottom: '3em' }}>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/main">The Matchmaker</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/main">Home</Nav.Link>
                            <Nav.Link href="/myroom">My Room</Nav.Link>
                            <Nav.Link href="/history">History</Nav.Link>
                        </Nav>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Signed in as: <a href="#login">{getUsername()}</a>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }


}

export default NavBar
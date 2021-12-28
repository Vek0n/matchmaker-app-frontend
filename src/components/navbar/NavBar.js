import React from 'react';
import { getToken } from '../app/useToken';
import { getUserId } from '../app/useUserId';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { getUsername } from '../app/useUsername';

class NavBar extends React.Component {
    state={
        username:"",
        userRole:""
    }

    getUserRole() {
        const token = getToken()
        const userId = getUserId()
        axios.get('http://localhost:8080/users/role/' + userId, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                const userRole = res.data;
                this.setState({ userRole: userRole });
            })
    }

    componentDidMount(){
        const username = getUsername()
        this.getUserRole()
        this.setState({username:username})
    }

    logout(){
        sessionStorage.clear()
        window.location.reload(false);
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
                            {this.state.userRole == "ADMIN" &&        
                                <Nav.Link href="/admin-dashboard">Admin dashboard</Nav.Link>
                            }

                        </Nav>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Signed in as: <a href="#login">{getUsername()}</a>
                                <Button style={{ marginLeft: '1em' }} variant="secondary" onClick={() => this.logout()}>
                                    Logout
                                </Button>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }


}

export default NavBar
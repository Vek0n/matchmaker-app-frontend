import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getToken } from '../app/useToken';
import { getUserId } from '../app/useUserId';
import axios from 'axios';
import GameRoomsList from './GameRoomsList';
import Nav from 'react-bootstrap/Nav';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RoomControl from './RoomControl';
import GamesControl from './GamesControl';

export default class AdminDashboard extends Component {
    state = {
        userRole: ""
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

    componentDidMount() {
        this.getUserRole()
    }

    render() {

        if (this.state.userRole == "ADMIN") {
            return (
                <>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="rooms">
                        <Row>
                            <Col sm={2}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="rooms">Rooms</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="games">Games</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="rooms">
                                        <RoomControl />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="games">
                                        <GamesControl />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </>
            )
        } else {
            return (
                <div style={{ margin: 'auto', width: '50%' }}>
                    <h1>Unauthorized (401)</h1>
                </div>
            )
        }
    }
}

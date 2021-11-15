import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Button from 'react-bootstrap/Button';
import lol from '../../resources/LoL.png'
import csgo from '../../resources/CSGO.png'
import { getToken } from '../app/useToken';
import Modal from 'react-bootstrap/Modal';
import RoomInfo from './RoomInfo'

class Room extends React.Component {

    state = {
        gameRooms: [],
        showRoomInfo: false,
    }
    chooseGameAvatar() {
        if (this.props.gameName == "Counter-Strike: Global Offensive") {
            return csgo
        } else if (this.props.gameName == "League of Legends") {
            return lol
        } else {
            return lol
        }
    }
    
    handleShow = () => this.setState({ showRoomInfo: true });
    handleClose = () => this.setState({ showRoomInfo: false });

    handleJoin(){
        const token = getToken()
        axios.get('http://localhost:8080/room/', {
            headers: {
                'Authorization': 'Bearer ' + token
            },

        })
            .then(res => {
                const gameRooms = res.data;
                this.setState({ gameRooms });
            })
    }

    render() {
        return (
            <>
                <div>
                    <Card style={{ width: '15rem' }}>
                        <Card.Img variant="top" src={this.chooseGameAvatar()} />
                        <Card.Body>
                            <Card.Title>{this.props.gameRoom.game.gameName}</Card.Title>
                            <Card.Text>
                                <p>Players: {this.props.gameRoom.playersList.length} / {this.props.gameRoom.maxPlayers}</p>
                            </Card.Text>
                            {/* <Button variant="primary" onClick={this.props.onClick}>Player list</Button> */}
                            <Button variant="primary" onClick={this.handleShow}>Player list</Button>

                        </Card.Body>
                    </Card>
                    </div>
                    
                    <Modal show={this.state.showRoomInfo} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.props.gameRoom.game.gameName}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <RoomInfo gameRoom={this.props.gameRoom}/>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={this.handleClose}>
                                Join
                            </Button>
                        </Modal.Footer>
                    </Modal>
                
                </>
                
        )
    }
}

export default Room
import React from 'react';
import axios from 'axios';
import { getToken } from '../app/useToken';
import Room from '../roomCard/Room'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class GameRoom extends React.Component {
    state = {
        gameRooms: [],
        showRoomInfo: false,
        currentGameName:"",
        currentPlayersCount:0,
        currentMaxPlayers:0
    }

    componentDidMount() {
        const token = getToken()
        axios.get('http://localhost:8080/room', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                const gameRooms = res.data;
                this.setState({ gameRooms });
            })
    }

    handleShow = () => this.setState({ showRoomInfo: true });
    handleClose = () => this.setState({ showRoomInfo: false });

    render() {
        return (
            <>
                <div>
                    {this.state.gameRooms.map(room =>
                        <div style={{ float: 'left', marginLeft: '1em', marginRight: '1em' }}>
                            <Room gameRoom={room}
                                onClick={this.handleShow} />
                        </div>
                        
                    )}
                </div>

                {/* <Modal show={this.state.showRoomInfo} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.currentGameName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal> */}
            </>
        )
    }
}

export default GameRoom
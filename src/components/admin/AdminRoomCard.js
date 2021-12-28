import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import { getToken } from '../app/useToken';
import { getUserId } from '../app/useUserId';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import RoomInfo from '../roomCard/RoomInfo';

export default class AdminRoomCard extends Component {
    state = {
        showRoomInfoModal: false,
        showConfirmDelete: false
    }

    getCreationDate() {
        var date = new Date(this.props.room.creationDate)
        var d = date.toLocaleDateString()
        var t = date.toLocaleTimeString()
        return d + ", " + t
    }

    deleteRoom(roomId) {
        const token = getToken()
        axios.delete('http://localhost:8080/room/' + roomId, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            // .then(res => {
            //     const rooms = res.data;
            //     this.setState({ openRooms: rooms });
            // })
    }

    handleDelete = () => {
        this.deleteRoom(this.props.room.id)
        this.setState({ showConfirmDelete: false });
    }

    handleShow = () => {
        this.setState({ showRoomInfoModal: true });
    }

    handleShowDeleteConfirmation = () => {
        this.setState({ showConfirmDelete: true });
    }

    handleClose = () => {
        this.setState({ showRoomInfoModal: false });
        this.setState({ showConfirmDelete: false });
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Header>Created: {this.getCreationDate()}</Card.Header>
                    <Card.Body>
                        <Card.Title>{this.props.room.game.gameName}</Card.Title>
                        <Card.Text>
                            {this.props.room.gameType},
                            Players: {this.props.room.playersList.length}/{this.props.room.maxPlayers}
                        </Card.Text>
                        <Button variant="primary" onClick={this.handleShow} style={{ marginRight: "1em" }}>Room details</Button>
                        <Button variant="danger" onClick={this.handleShowDeleteConfirmation}>Delete room</Button>
                    </Card.Body>
                </Card>

                <Modal show={this.state.showConfirmDelete} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete room?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                    <Button variant="danger" onClick={this.handleDelete}>Delete</Button>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showRoomInfoModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.room.game.gameName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <RoomInfo gameRoom={this.props.room} />
                            <p>Created: {this.getCreationDate()}</p>

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import { getToken } from '../app/useToken';
import { getUserId } from '../app/useUserId';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import RoomInfo from '../roomCard/RoomInfo';
import Table from 'react-bootstrap/Table';

export default class AdminGameCard extends Component {
    state = {
        showRoomInfoModal: false,
        showConfirmDelete: false
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
            <div style={{ marginBottom: '1em' }}>
                <Card>
                    <Card.Header></Card.Header>
                    <Card.Body>
                        <Card.Title>{this.props.game.gameName}</Card.Title>
                        <Card.Text>

                        </Card.Text>
                        <Button variant="primary" onClick={this.handleShow} style={{ marginRight: "1em" }}>Game details</Button>
                        <Button variant="danger" onClick={this.handleShowDeleteConfirmation}>Delete game</Button>
                    </Card.Body>
                </Card>

                {/* <Modal show={this.state.showConfirmDelete} onHide={this.handleClose}>
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
                */}
                <Modal show={this.state.showRoomInfoModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.game.gameName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Available ranks</th>
                                    </tr>
                                </thead>
                                {this.props.game.availableRanks.map(rank => (
                                    <tr>
                                        {rank}
                                    </tr>
                                ))}
                            </Table>

                            <Table sstriped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Available game types</th>
                                    </tr>
                                </thead>
                                {this.props.game.gameTypes.map(gameType => (
                                    <tr>
                                        {gameType}
                                    </tr>
                                ))}
                            </Table>
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

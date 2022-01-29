import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GameRoomsList from './GameRoomsList'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import GamesList from './GamesList';
import Button from 'react-bootstrap/Button';
import { BsPlusLg } from 'react-icons/bs';
import Modal from 'react-bootstrap/Modal';
import GameCreation from './GameCreation';
import axios from 'axios';
import { getToken } from '../app/useToken';

export default class GamesControl extends Component {

    state = {
        showGameAddingModal: false,
        gameCreationInfo:"",
        isCreationDataFilled:false
    }

    handleModalShow = () => {
        this.setState({ showGameAddingModal: true });
    }


    handleClose = () => {
        this.setState({ showGameAddingModal: false })
    }

    getGameCreationData = (game) => {
        this.setState({ gameCreationInfo: game })
        this.setState({ isCreationDataFilled: true })
    }

    addGame(game) {
        const token = getToken()
        // const userId = getUserId()
        let parsedGame = JSON.parse(game);
        axios.post('http://localhost:8080/games/', {
            gameName: parsedGame.gameName,
            availableRanks: parsedGame.availableRanks,
            gameTypes: parsedGame.gameTypes,
            gameLogoImageLink: parsedGame.gameLogoImageLink
        }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
    }

    handleRoomCreation = () => {
        this.addGame(
            this.state.gameCreationInfo
        )
        this.setState({ showGameAddingModal: false })
        // this.props.history.push('/myroom')
    }

    render() {
        return (
            <div style={{ margin: 'auto', width: '90%' }}>

                <div>
                    <h3>Games</h3>
                    <Button variant="primary" onClick={this.handleModalShow}> <BsPlusLg /> Add game</Button>
                </div>

                <div style={{ marginTop: '1em' }}>
                    <GamesList />
                </div>


                <Modal show={this.state.showGameAddingModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add game</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <GameCreation gameCreationCallback={this.getGameCreationData}/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleRoomCreation}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>


            </div>
        )
    }
}

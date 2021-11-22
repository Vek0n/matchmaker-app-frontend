import React from 'react';
import axios from 'axios';
import { getToken } from '../app/useToken';
import { getUserId } from '../app/useUserId';
import Room from '../roomCard/Room'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ChooseGame from './ChooseGame';

class GameRoom extends React.Component {
    state = {
        gameRooms: [],
        games:[],
        choosenGame: "",
        showRoomInfo: false,
        currentGameName:"",
        currentPlayersCount:0,
        currentMaxPlayers:0,
        showRoomCreationModal: false,
        roomCreationInfo: "",
        isCreationDataFilled: false
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
        this.getAvailableGames()
    }


    getAvailableGames(){
        const token = getToken()
        axios.get('http://localhost:8080/games', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                const games = res.data;
                this.setState({ games });
            })
    }

    createGameRoom(game){
        const token = getToken()
        const userId = getUserId()
        let parsedGame = JSON.parse(game);
        axios.post('http://localhost:8080/room/',{
            userId: userId,
            gameId: parsedGame.gameId,
            maxPlayers: 5,
            gameType: parsedGame.gameType,
            player: {
                gameRank: parsedGame.gameRank,
                level: parsedGame.level
            }
            },{
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => {
            // const gameRooms = res.data;
            // this.setState({ gameRooms })
            // this.setState({ showRoomInfo: false })
        })
    }


    handleShow = () => this.setState({ showRoomInfo: true });
    handleClose = () => this.setState({ showRoomInfo: false });
    handleRoomCreationClose = () => this.setState({showRoomCreationModal: false})
    handleRoomCreationShow = () => this.setState({ showRoomCreationModal: true })

    getRoomCreationData = (game) => {
        this.setState({roomCreationInfo: game})
        this.setState({isCreationDataFilled: true})
    }

    handleRoomCreation = () => {
        this.createGameRoom(
            this.state.roomCreationInfo
        )
        this.setState({showRoomCreationModal: false})
        setTimeout(() => window.location.reload(), 1000);
    }


    render() {
        return (
            <>
                <div>
                    <Button variant="primary" onClick={() => this.handleRoomCreationShow()}>
                                Create room
                    </Button>
                    {this.state.gameRooms.map(room =>
                        <div style={{ float: 'left', marginLeft: '1em', marginRight: '1em' }}>
                            <Room gameRoom={room}
                                onClick={this.handleShow} />
                        </div>
                    )}
                </div>


                <Modal show={this.state.showRoomCreationModal} onHide={this.handleRoomCreationClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create room</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <ChooseGame games={this.state.games} gameChoiceCallback={this.getRoomCreationData}/>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleRoomCreationClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => this.handleRoomCreation()} disabled={!this.state.isCreationDataFilled}>
                                Create
                            </Button>
                        </Modal.Footer>
                    </Modal>
            </>
        )
    }
}

export default GameRoom
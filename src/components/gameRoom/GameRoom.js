import React from 'react';
import axios from 'axios';
import { getToken } from '../app/useToken';
import { getUserId } from '../app/useUserId';
import Room from '../roomCard/Room'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ChooseGame from './ChooseGame';
import { BsPlusLg } from 'react-icons/bs';
import {withRouter} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class GameRoom extends React.Component {
    intervalID;

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
        isCreationDataFilled: false,
        disableCreateNewRoomButton: true
    }

    componentDidMount() {
        this.getGameRooms()
        this.getAvailableGames()
        this.getAllRoomsWithPlayer()
    }

    componentWillUnmount() {
        clearTimeout(this.intervalID);
    }


    getGameRooms = () =>{
        const token = getToken()
        const userId = getUserId()
        axios.get('http://localhost:8080/room/without/' + userId, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                const gameRooms = res.data;
                this.setState({ gameRooms });
        })
        this.intervalID = setTimeout(this.getGameRooms.bind(this), 1000);
        this.getAllRoomsWithPlayer()
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

    getAllRoomsWithPlayer(){
        const token = getToken()
        const userId = getUserId()
        axios.get('http://localhost:8080/room/with/' + userId, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => {
            const gameRooms = res.data
            if(gameRooms.length == 0 ){
                this.setState({disableCreateNewRoomButton: false})
            }
        })
    }


    createGameRoom(game){
        const token = getToken()
        const userId = getUserId()
        let parsedGame = JSON.parse(game);
        axios.post('http://localhost:8080/room/',{
            userId: userId,
            gameId: parsedGame.gameId,
            maxPlayers: parsedGame.maxPlayers,
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
        this.props.history.push('/myroom')
    }


    render() {
        return (
            <>
                <div style={{ float: 'left', marginLeft: '1em', marginRight: '1em' }} >
                    <Button style={{ width:'200px', height:'360px'}} disabled={this.state.disableCreateNewRoomButton} variant="outline-secondary" onClick={() => this.handleRoomCreationShow()}>
                    <BsPlusLg />
                    </Button>
                </div>
                <div>

                    {this.state.gameRooms.map(room =>
                        <div style={{ float: 'left', marginLeft: '1em', marginRight: '1em' }}>
                            <Room gameRoom={room}
                                onClick={this.handleShow}
                                canPlayerCreateNewRoom={this.state.disableCreateNewRoomButton} />
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


                    <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                /> 
            </>
        )
    }
}


export default withRouter(GameRoom)
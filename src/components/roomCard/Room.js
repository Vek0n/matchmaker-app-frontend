import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Button from 'react-bootstrap/Button';
import { getToken } from '../app/useToken';
import { getUserId } from '../app/useUserId';
import Modal from 'react-bootstrap/Modal';
import RoomInfo from './RoomInfo'
import PlayerCreation from '../player/PlayerCreation';
import {withRouter} from 'react-router-dom'
import PlayerSocial from '../player/PlayerSocial';

class Room extends React.Component {

    state = {
        gameRooms: [],
        showPlayerCreationModal: false,
        showPlayerCreation: false,
        showClosedRoomInfoModal: false,
        gameType: "",
        level:0,
        choosenRank: "",
        buttonText: "Proceed",
        isPlayerCreated: false
    }
    
    handleShow = () => {
        if(this.props.gameRoom.roomStatus == "OPEN"){
            this.setState({ showPlayerCreationModal: true });
        }else if(this.props.gameRoom.roomStatus == "CLOSED"){
            this.setState({ showClosedRoomInfoModal: true });
        }
    }

    handleClose = () => {
        this.setState({ showPlayerCreationModal: false });
        this.setState({ showClosedRoomInfoModal: false });
    }   

    handleJoin(roomId){
        // console.log(roomId)
        const token = getToken()
        const userId = getUserId()
        // const history = useHistory();
        if(this.state.isPlayerCreated){ 
            axios.post('http://localhost:8080/room/' + roomId ,{
                gameRank: this.state.choosenRank,
                level: this.state.level
                },
                {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    userId: userId
                },
            })
            .then(res => {
                const gameRooms = res.data;
                this.setState({ gameRooms })
                this.setState({ showPlayerCreationModal: false })
            })
            this.props.history.push('/myroom')
        }else{
            this.setState({ showPlayerCreation: !this.state.showPlayerCreation });
        }
    }

    handleRankChoice = (rank) => {
        this.setState({choosenRank: rank})
        this.setState({buttonText: "Join"})
        this.setState({isPlayerCreated: true})
    }


    handleLevelChoice = (lvl) => {
        this.setState({level: lvl})
    }

    getCreationDate(){
        var date = new Date(this.props.gameRoom.creationDate)
        var d = date.toLocaleDateString()
        var t = date.toLocaleTimeString()
        return d + ", " + t
    }

    render() {
        return (
            <>
                <div>
                    <Card style={{ width: '15rem' }}>
                        <Card.Img variant="top" src={this.props.gameRoom.game.gameLogoImageLink} />
                        <Card.Body>
                            <Card.Title>{this.props.gameRoom.game.gameName}</Card.Title>
                            <Card.Text>
                                <p><h6>{this.props.gameRoom.gameType}</h6></p>
                                <p>Players: {this.props.gameRoom.playersList.length} / {this.props.gameRoom.maxPlayers}</p>
                            </Card.Text>
                            <Button variant="primary" onClick={this.handleShow}>Player list</Button>
                        </Card.Body>
                    </Card>
                    </div>
                    

                    <Modal show={this.state.showPlayerCreationModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.props.gameRoom.game.gameName}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <RoomInfo gameRoom={this.props.gameRoom}/>
                                <p>Created: {this.getCreationDate()}</p>
                                {this.state.showPlayerCreation && 
                                <PlayerCreation 
                                    game = {this.props.gameRoom.game} 
                                    rankChoiceCallback={this.handleRankChoice} 
                                    levelChoiceCallback={this.handleLevelChoice}
                                />}
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" disabled={this.props.canPlayerCreateNewRoom} onClick={() => this.handleJoin(this.props.gameRoom.id)}>
                                {this.state.buttonText}
                            </Button>
                        </Modal.Footer>
                    </Modal>


                    <Modal show={this.state.showClosedRoomInfoModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.props.gameRoom.game.gameName}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <RoomInfo gameRoom={this.props.gameRoom}/>
                                <h4>Player's social:</h4>
                                <PlayerSocial playersList={this.props.gameRoom.playersList}/>
                                <p>Created: {this.getCreationDate()}</p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </>
                
        )
    }
}

export default withRouter(Room)
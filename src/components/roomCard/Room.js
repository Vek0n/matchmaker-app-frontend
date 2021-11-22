import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Button from 'react-bootstrap/Button';
import lol from '../../resources/LoL.png'
import csgo from '../../resources/CSGO.png'
import { getToken } from '../app/useToken';
import { getUserId } from '../app/useUserId';
import Modal from 'react-bootstrap/Modal';
import RoomInfo from './RoomInfo'
import PlayerCreation from '../player/PlayerCreation';

class Room extends React.Component {

    state = {
        gameRooms: [],
        showRoomInfo: false,
        showPlayerCreation: false,
        gameType: "",
        level:0,
        choosenRank: "",
        buttonText: "Proceed",
        isPlayerCreated: false
    }
    chooseGameAvatar() {
        if (this.props.gameRoom.game.gameName == "Counter-Strike: Global Offensive") {
            return csgo
        } else if (this.props.gameRoom.game.gameName == "League of Legends") {
            return lol
        } else {
            return lol
        }
    }
    
    handleShow = () => this.setState({ showRoomInfo: true });
    handleClose = () => this.setState({ showRoomInfo: false });

    handleJoin(roomId){
        // console.log(roomId)
        const token = getToken()
        const userId = getUserId()
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
                this.setState({ showRoomInfo: false })
            })
            setTimeout(() => window.location.reload(), 1000);
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

    render() {
        return (
            <>
                <div>
                    <Card style={{ width: '15rem' }}>
                        <Card.Img variant="top" src={this.chooseGameAvatar()} />
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
                    

                    <Modal show={this.state.showRoomInfo} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.props.gameRoom.game.gameName}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <RoomInfo gameRoom={this.props.gameRoom}/>
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
                            <Button variant="primary" onClick={() => this.handleJoin(this.props.gameRoom.id)}>
                                {this.state.buttonText}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
                
        )
    }
}

export default Room
import React from 'react';
import axios from 'axios';
import { getToken } from '../app/useToken';
import { getUserId } from '../app/useUserId';
import PlayerInfo from '../player/PlayerInfo';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';

class CurrentRoom extends React.Component {
    intervalID;

    state = {
        gameRooms: [],
        time: null,
        isRoomFull: false
    }


    getData = () => {
        const token = getToken()
        const userId = getUserId()
        axios.get('http://localhost:8080/room/newest/' + userId, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                const gameRooms = res.data;
                this.setState({ gameRooms });
            })
        this.intervalID = setTimeout(this.getData.bind(this), 1000);
    }

    leaveRoom = () => {
        const token = getToken()
        const userId = getUserId()
        const roomId = this.state.gameRooms[0].id
        axios.get('http://localhost:8080/room/' + roomId + "/" + userId, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        this.props.history.push('/main')
    }

    componentDidMount() {
        this.getData()
    }


    componentWillUnmount() {
        clearTimeout(this.intervalID);
    }


    render() {
        if (this.state.gameRooms.length > 0) {
            if (this.state.gameRooms[0].playersList.length < this.state.gameRooms[0].maxPlayers) {
                return (
                    <div style={{ margin: 'auto', width: '50%' }}>
                        <div style={{ textAlign: 'center', marginBottom: '3em' }}>
                            <h1>Waiting for other players...</h1>
                            <Spinner animation="border" role="status" size="lg">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            <h1>{this.state.gameRooms[0].playersList.length} / {this.state.gameRooms[0].maxPlayers}</h1>
                        </div>
                        <h3>{this.state.gameRooms[0].game.gameName} </h3>
                        <h4>{this.state.gameRooms[0].gameType}</h4>
                        <div>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Rank</th>
                                        <th>Level</th>
                                    </tr>
                                </thead>
                                {this.state.gameRooms[0].playersList.map(player => (
                                    <tr>
                                        <PlayerInfo player={player} />
                                    </tr>
                                ))}
                            </Table>
                        </div>
                        <div style={{ float: 'left', marginRight: '3em' }}>
                            <Button variant="danger" visible={false} onClick={this.leaveRoom}>Leave room</Button>
                        </div>
                        <div>
                            {this.state.isRoomFull ? <Button variant="primary" onClick={this.leaveRoom}>View players info</Button> : null}
                        </div>
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
                    </div>
                )
            } else if (this.state.gameRooms[0].roomStatus == "CLOSED") {
                return (

                    <div style={{ margin: 'auto', width: '50%' }}>
                        <div style={{ textAlign: 'center', marginBottom: '3em' }}>
                            <h1>All players found!</h1>
                        </div>
                        <h3>{this.state.gameRooms[0].game.gameName} </h3>
                        <h4>{this.state.gameRooms[0].gameType}</h4>
                        <div>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Rank</th>
                                        <th>Level</th>
                                    </tr>
                                </thead>
                                {this.state.gameRooms[0].playersList.map(player => (
                                    <tr>
                                        <PlayerInfo player={player} />
                                    </tr>
                                ))}
                            </Table>
                        </div>
                        <div>
                            <Button variant="primary" onClick={this.leaveRoom}>View players info</Button>
                        </div>
                    </div>
                )
            }
        }
        else {
            return (
                <div style={{ margin: 'auto', width: '50%' }}>
                    <h1>Join to existing game room or create your own</h1>
                </div>
            )
        }
    }
}

export default withRouter(CurrentRoom)




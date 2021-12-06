import React, { Component } from 'react'
import axios from 'axios';
import { getToken } from '../app/useToken';
import { getUserId } from '../app/useUserId';
import Room from '../roomCard/Room';
import PlayerInfo from '../player/PlayerInfo';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';


export default class HistoryRooms extends Component {
    state = {
        gameRooms: [],
    }
    componentDidMount() {
        this.getData()
    }
    getData = () => {
        const token = getToken()
        const userId = getUserId()
        axios.get('http://localhost:8080/room/closed/' + userId, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                const gameRooms = res.data;
                this.setState({ gameRooms });
            })
        this.intervalID = setTimeout(this.getData.bind(this), 10000);
    }
    render() {
        return (
            <div>
                {this.state.gameRooms.map(room =>
                        <div style={{ float: 'left', marginLeft: '1em', marginRight: '1em' }}>
                            <Room gameRoom={room}
                                onClick={this.handleShow}
                                canPlayerCreateNewRoom={this.state.disableCreateNewRoomButton} />
                        </div>
                    )}
            </div>
        )
    }
}

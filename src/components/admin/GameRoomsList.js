import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import { getToken } from '../app/useToken';
import { getUserId } from '../app/useUserId';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import AdminRoomCard from './AdminRoomCard';

export default class GameRoomsList extends Component {
    intervalID;
    state = {
        openRooms: []
    }



    getAllOpenRooms() {
        const token = getToken()
        axios.get('http://localhost:8080/room/open', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => {
            const rooms = res.data;
            this.setState({ openRooms: rooms });
        })
        this.intervalID = setTimeout(this.getAllOpenRooms.bind(this), 1000);
    }

    getAllHistoryRooms() {
        const token = getToken()
        axios.get('http://localhost:8080/room/closed', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => {
            const rooms = res.data;
            this.setState({ openRooms: rooms });
        })
        this.intervalID = setTimeout(this.getAllHistoryRooms.bind(this), 1000);
    }


    componentDidMount() {
        if(this.props.roomType == "OPEN"){
            this.getAllOpenRooms()
        }else{
            this.getAllHistoryRooms()
        }
    }

    componentWillUnmount() {
        clearTimeout(this.intervalID);
    }

    render() {
        return (
            <div>
                {this.state.openRooms.map(room =>
                    <div>
                        <AdminRoomCard room={room} />
                    </div>
                )}
            </div>
        )
    }
}

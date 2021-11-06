import React from 'react';
import axios from 'axios';
import {getToken} from '../app/useToken';

class GameRoom extends React.Component {
    state = {
        gameRooms: [],
      }

    componentDidMount() {
        const token = getToken()
        axios.get('http://localhost:8080/room',{
            headers: {
            'Authorization': 'Bearer ' + token
            }
        })
        .then(res => {
            const gameRooms = res.data;
            this.setState({ gameRooms });
        })
    }

    render() {
        return (
            <ul>
                {this.state.gameRooms.map(room => <li>{room.game.gameName}</li>)}
            </ul>
        )
    }
}

export default GameRoom
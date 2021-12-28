import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import { getToken } from '../app/useToken';
import { getUserId } from '../app/useUserId';
import axios from 'axios';
import AdminGameCard from './AdminGameCard';


export default class GamesList extends Component {
    intervalID;
    state = {
        gameList: []
    }


    getAllGames() {
        const token = getToken()
        axios.get('http://localhost:8080/games', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => {
            const games = res.data;
            this.setState({ gameList: games });
        })
        this.intervalID = setTimeout(this.getAllGames.bind(this), 1000);
    }

    componentDidMount() {
        this.getAllGames()
    }

    componentWillUnmount() {
        clearTimeout(this.intervalID);
    }

    render() {
        return (
            <div>
                {this.state.gameList.map(game =>
                    <div>
                        <AdminGameCard game={game} />
                    </div>
                )}
            </div>
        )
    }
}

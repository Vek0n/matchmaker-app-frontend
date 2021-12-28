import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GameRoomsList from './GameRoomsList'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import GamesList from './GamesList';

export default class GamesControl extends Component {

    render() {
        return (
            <div style={{ margin: 'auto', width: '90%' }}>
                <h3>Games</h3>
                <GamesList />
            </div>
        )
    }
}

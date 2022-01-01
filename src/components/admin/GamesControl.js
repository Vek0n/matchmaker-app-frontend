import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GameRoomsList from './GameRoomsList'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import GamesList from './GamesList';
import Button from 'react-bootstrap/Button';
import { BsPlusLg } from 'react-icons/bs';

export default class GamesControl extends Component {

    render() {
        return (
            <div style={{ margin: 'auto', width: '90%' }}>
                
                <div>
                    <h3>Games</h3>
                    <Button variant="primary"> <BsPlusLg/> Add game</Button>
                </div>

                <div style={{ marginTop:'1em' }}>
                    <GamesList />
                </div>
            </div>
        )
    }
}

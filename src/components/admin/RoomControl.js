import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GameRoomsList from './GameRoomsList'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

export default class RoomControl extends Component {

    render() {
        return (
            <div style={{ margin: 'auto', width: '90%' }}>
                <h3>Rooms</h3>
                <Tabs defaultActiveKey="open">
                    <Tab eventKey="open" title="Active">
                        <GameRoomsList roomType="OPEN" />
                    </Tab>
                    <Tab eventKey="closed" title="Closed">
                        <GameRoomsList roomType="HISTORY" />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

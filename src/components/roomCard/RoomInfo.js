import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import PlayerInfo from '../player/PlayerInfo'
class RoomInfo extends React.Component {



    render() {
        return (
            <div>
                <h4>Players list:</h4>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Rank</th>
                            <th>Level</th>
                        </tr>
                    </thead>
                    {this.props.gameRoom.playersList.map(player =>(
                        <tr>
                            <PlayerInfo player={player} />
                        </tr>
                    ))}
                </Table>
            </div>
        )
    }
}

export default RoomInfo


// [{
//     "id": 1,
//     "playersList": [   {
//        "id": 2,
//        "user":       {
//           "userId": 1,
//           "username": "admin"
//        },
//        "gameRank": "gold 2",
//        "level": 23
//     }],
//     "game":    {
//        "gameName": "League of Legends",
//        "availableRanks":       [
//           "Silver 1",
//           "Silver 2",
//           "Silver 3",
//           "Silver 4"
//        ],
//        "gameTypes":       [
//           "Ranked",
//           "Un-ranked"
//        ],
//        "id": 2
//     },
//     "maxPlayers": 0
//  }]
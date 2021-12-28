import React from 'react';
import Table from 'react-bootstrap/Table';
import steam from '../../resources/steam.png'
import epic from '../../resources/epic.png'
import origin from '../../resources/origin.png'
import uplay from '../../resources/ubi.png'
class PlayerSocial extends React.Component {
    state = {
        choosenRank: "",
    }

    render() {
        return (
            <div>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th style={{textAlign: 'center', verticalAlign: 'middle'}}>Player</th>
                            <th style={{textAlign: 'center', verticalAlign: 'middle'}}><img src={steam} alt="Logo" width="35" height="35"/></th>
                            {/* <th>Discord</th> */}
                            <th style={{textAlign: 'center', verticalAlign: 'middle'}}><img src={epic} alt="Logo" width="30" height="35"/></th>
                            <th style={{textAlign: 'center', verticalAlign: 'middle'}}><img src={origin} alt="Logo" width="30" height="40"/></th>
                            <th style={{textAlign: 'center', verticalAlign: 'middle'}}><img src={uplay} alt="Logo" width="40" height="35"/></th>
                        </tr>
                    </thead>
                    {this.props.playersList.map(player =>
                        <tr>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                                {player.user.username}
                            </td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                                {player.user.userSocial.steamUsername}
                            </td>
                            {/* <td>
                                {player.user.userSocial.discordUsername}
                            </td> */}
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                                {player.user.userSocial.epicGamesUsername}
                            </td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                                {player.user.userSocial.originUsername}
                            </td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                                {player.user.userSocial.uplayUsername}
                            </td>
                        </tr>
                    )}
                </Table>
            </div>
        )
    }
}

export default PlayerSocial
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
                                <a href={"https://steamcommunity.com/id/" + player.user.userSocial.steamUsername}>{player.user.userSocial.steamUsername}</a>
                            </td>
                            {/* <td>
                                {player.user.userSocial.discordUsername}
                            </td> */}
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                                {player.user.userSocial.epicGamesUsername}
                            </td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                            <a href={"https://www.origin.com/pol/pl-pl/profile/user/" + player.user.userSocial.originUsername}>{player.user.userSocial.originUsername}</a>
                                
                            </td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                            <a href={"https://ubisoftconnect.com/pl-PL/profile/" + player.user.userSocial.uplayUsername}>{player.user.userSocial.uplayUsername}</a>
                            </td>
                        </tr>
                    )}
                </Table>
            </div>
        )
    }
}

export default PlayerSocial
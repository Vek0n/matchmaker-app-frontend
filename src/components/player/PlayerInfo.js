import React from 'react';


class PlayerInfo extends React.Component {



    render() {
        return (
            <>
                <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                    {this.props.player.user.username}
                </td>
                <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                    {this.props.player.gameRank}
                </td>
                <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                    {this.props.player.level}
                </td>
            </>
        )
    }
}

export default PlayerInfo




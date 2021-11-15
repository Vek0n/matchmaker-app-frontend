import React from 'react';


class PlayerInfo extends React.Component {



    render() {
        return (
            <>
                <td>
                    {this.props.player.user.username}
                </td>
                <td>
                    {this.props.player.gameRank}
                </td>
                <td>
                    {this.props.player.level}
                </td>
            </>
        )
    }
}

export default PlayerInfo




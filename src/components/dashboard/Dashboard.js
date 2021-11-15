import React from 'react';
import GameRoom from '../gameRoom/GameRoom';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

    };
    

    render() {
        return (
            <div style={{ margin: 'auto', width: '70%'}}>
                <GameRoom />
            </div>
        )
    }

}

export default Dashboard
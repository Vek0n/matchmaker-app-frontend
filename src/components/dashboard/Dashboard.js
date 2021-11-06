import React from 'react';
import GameRoom from '../gameRoom/GameRoom';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

    };
    

    render() {
        return (
            <div>
                <h1>Elo</h1>
                <GameRoom />
            </div>
        )
    }

}

export default Dashboard
import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import Login from '../login/Login';
import { useToken } from './useToken';
import { useUserId } from './useUserId';
import { useUsername } from './useUsername';
import CurrentRoom from '../current_room/CurrentRoom';
import NavBar from '../navbar/NavBar';
import HistoryRooms from '../history_rooms/HistoryRooms';

function App() {

    const { token, setToken } = useToken();
    const { userId, setUserId } = useUserId();
    const { username, setUsername } = useUsername();

    if (!token) {
        return <Login setToken={setToken}
            setUserId={setUserId}
            setUsername={setUsername} />
    }

    return (
        <div className="wrapper">
            <BrowserRouter>
                <NavBar />
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => {
                            return(
                                <Redirect to="/main" /> 
                            )
                        }}
                    />
                    <Route exact path="/main" component={Dashboard} />
                    <Route exact path="/myroom" component={CurrentRoom} />
                    <Route exact path="/history" component={HistoryRooms}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;

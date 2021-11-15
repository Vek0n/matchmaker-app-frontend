import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import Login from '../login/Login';
import {useToken} from './useToken';
import {useUserId} from './useUserId';

function App() {

  const { token, setToken } = useToken();
  const {userId, setUserId } = useUserId();

    if(!token) {
        return <Login setToken = {setToken} 
                      setUserId = {setUserId}/>
    }

    return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

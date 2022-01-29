import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Register from '../register/Register';


async function loginUser(credentials) {
    return fetch('http://localhost:8080/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then((response) => {
            if (!response.ok) throw new Error(response.status);
            else return response.json();
        })
        .catch((error) => {
            console.log('error: ' + error);
        });
}


export default function Login({ setToken, setUserId, setUsername}) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [registerOrLogin, setRegisterOrLogin] = useState(true);
    var [isLoginSuccesful, setIsLoginSuccesful] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await loginUser({
            username,
            password
        });
        if (response != null) {
            setToken(response.token)
            setUserId(response.userId)
            setUsername(username)
        } else {
            alert("Wrong username or password")
        }
    }

    if(registerOrLogin == true){
        return (
            <div 
            style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <h1 style={{marginBottom: '2em'}}>The Matchmaker</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label >Username</Form.Label>
                        <Form.Control onChange={e => setUserName(e.target.value)} name="username" placeholder="Enter username" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                    </Form.Group>
                
                    <Button variant="primary" type="submit">
                        Sign in
                    </Button>
                </Form>
                <br></br>
                <p>Doesn't have an account? <a href="#" onClick={() => setRegisterOrLogin(false)}>Register here</a>
                </p>
                {/* <LoginStatus status = {isLoginSuccesful} /> */}
                {/* <div><p>{isLoginSuccesful ? 'currently' : 'not'}</p></div> */}
            </div>
        )  
    }else{
        return(
            <>
            <div 
            style={{
                // position: 'absolute', left: '50%', top: '50%',
                // transform: 'translate(-70%, -70%)'
            }}>
                <Register />
            </div>
            <div style={{
                position: 'absolute', left: '30%', top: '11%',
                transform: 'translate(-50%, -50%)'
            }}>
                <a href="#" onClick={() => setRegisterOrLogin(true)}>Back to login</a>
            </div>
            </>
            
        )
    }

}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { FcOk, FcHighPriority } from 'react-icons/fc';
import axios from 'axios';
import { getToken } from '../app/useToken';

export default class Register extends Component {
    state = {
        username: "",
        password: "",
        confirmPassword: "",
        steamUsername: "",
        epicGamesUsername: "",
        originUsername: "",
        uplayUsername: "",
        passwordGiven: false,
        usernameGiven: false,
        passwordsMatch: false,
        checkUsername: 0,
        formCompleted:false
    }

    checkUsername = (username) => {
        axios.post('http://localhost:8080/users/check/' + username)
            .then(res => {
                const response = res.data;
                this.setState({ checkUsername: response }, () => {
                    if (response) {
                        this.setState({ usernameGiven: 1 })
                        if(this.state.passwordsMatch == true){
                            this.setState({ formCompleted: true })    
                        }
                    } else {
                        this.setState({ usernameGiven: -1 })
                        this.setState({ formCompleted: false })
                    }
                });
            })
    }

    registerUser = () => {
        axios.post('http://localhost:8080/register', {
            username: this.state.username,
            password: this.state.password,
            userRole: "USER",
            userSocial:{
                steamUsername: this.state.steamUsername,
                epicGamesUsername: this.state.epicGamesUsername,
                originUsername: this.state.originUsername,
                uplayUsername: this.state.uplayUsername
            }
        }).then(res => {
            const responseStatus = res.status
            if(responseStatus == 200){
                window.location.reload();
            }
        })
    }


    componentDidMount() {
        this.formCompleted()
    }

    handleUsernameInput = (username) => {
        this.setState({ username: username }, () => {
            if(username != ""){
                this.checkUsername(username)
                this.formCompleted()
            }
        })
    }

    handlePasswordInput = (pass) => {
        this.setState({ password: pass }, () => {
            this.checkPasswords()
        })
    }

    handleConfigmPasswordInput = (pass) => {
        this.setState({ confirmPassword: pass }, () => {
            this.checkPasswords()
        })
    }

    checkPasswords() {
        if (this.state.confirmPassword === this.state.password && this.state.password != "") {
            this.setState({ passwordsMatch: true }, () => {
                this.formCompleted()
            })
            // this.setState({ passwordGiven: true })   
        }else {
            this.setState({ passwordsMatch: false }, () => {
                this.formCompleted()
            })
        }
    }

    handleSteamInput = (username) => {
        this.setState({ steamUsername: username })
    }

    handleEpicGamesInput = (username) => {
        this.setState({ epicGamesUsername: username })
    }

    handleOriginInput = (username) => {
        this.setState({ originUsername: username })
    }

    handleUplayInput = (username) => {
        this.setState({ uplayUsername: username })
    }


    formCompleted = () => {
        if(this.state.usernameGiven == 1 && this.state.passwordsMatch == true){
            this.setState({formCompleted: true})
        }else{
            this.setState({formCompleted: false})
        }
    }

    // handleSubmit = () => {
    //     this.registerUser
    // }



    render() {
        return (
            <div
                style={{
                    // position: 'absolute', left: '50%', top: '50%',
                    // transform: 'translate(-50%, -50%)'
                    margin: 'auto', width: '20%', marginTop:'4em'
                }}>
                {/* <h1 style={{ marginBottom: '2em' }}>The Matchmaker</h1> */}
                {/* <Form onSubmit={this.registerUser}> */}
                <h4>Register</h4>
                    <Form.Group className="mb-3" >
                        <Form.Label >Username</Form.Label>
                        <Row >
                            <Col xs="auto">
                                <Form.Control onChange={e => this.handleUsernameInput(e.target.value)} name="username" placeholder="Enter username" />
                                {/* </FloatingLabel> */}
                                <br></br>
                            </Col>
                            <Col xs="auto">
                                {this.state.usernameGiven == 1 &&
                                    <div>
                                        <FcOk />
                                    </div>
                                }
                                {this.state.usernameGiven == -1 &&
                                    <div>
                                        <FcHighPriority />
                                    </div>
                                }
                            </Col>
                        </Row>

                    {/* </Form.Group> */}
                    {/* <Form.Group className="mb-3" controlId="formBasicPassword"> */}
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={e => this.handlePasswordInput(e.target.value)} type="password" placeholder="Password" />
                        <br></br>
                    {/* </Form.Group> */}

                    
                    {/* <Form.Group className="mb-3" controlId="formBasicPassword"> */}
                        <Form.Label>Confirm Password</Form.Label>
                        <Row>   
                            <Col xs="auto">
                                <Form.Control onChange={e => this.handleConfigmPasswordInput(e.target.value)} type="password" placeholder="Confirm password" />
                                <br></br>
                                <br></br>
                            </Col> 
                            <Col xs="auto">
                                {this.state.passwordsMatch &&
                                    <div styles={{ float: 'left' }}>
                                        <FcOk />
                                    </div>
                                }
                            </Col>
                        </Row>
                    {/* </Form.Group> */}
                    

                    <h4>Where can we find you?</h4>
                    {/* <Form.Group className="mb-3" > */}
                        <Form.Label>Steam username</Form.Label>
                        <Form.Control onChange={e => this.handleSteamInput(e.target.value)} placeholder="Enter username" />
                        <br></br>
                    {/* </Form.Group> */}
                    {/* <Form.Group className="mb-3" > */}
                        <Form.Label>Epic games username</Form.Label>
                        <Form.Control onChange={e => this.handleEpicGamesInput(e.target.value)} placeholder="Enter username" />
                        <br></br>
                    {/* </Form.Group> */}
                    {/* <Form.Group className="mb-3"> */}
                        <Form.Label>Origin username</Form.Label>
                        <Form.Control onChange={e => this.handleOriginInput(e.target.value)} placeholder="Enter username" />
                        <br></br>
                    {/* </Form.Group> */}
                    {/* <Form.Group className="mb-3" > */}
                        <Form.Label>Uplay username</Form.Label>
                        <Form.Control onChange={e => this.handleUplayInput(e.target.value)} placeholder="Enter username" />
                        <br></br>
                    {/* </Form.Group> */}

                    <Button variant="primary" type="submit" onClick = {this.registerUser} disabled={!this.state.formCompleted}>
                        Sign up
                    </Button>
                    </Form.Group>
                {/* </Form> */}

                {/* <LoginStatus status = {isLoginSuccesful} /> */}
                {/* <div><p>{isLoginSuccesful ? 'currently' : 'not'}</p></div> */}
            </div>
        )
    }
}

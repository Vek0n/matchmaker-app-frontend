import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form';
import GameRank from './GameRank';
import Button from 'react-bootstrap/Button';
import { BsPlusLg } from 'react-icons/bs';


export default class GameCreation extends Component {
    state = {
        gameTitle: "",
        gameLogoImageLink: "",
        gameAvailableRanks: [],
        gameAvailableTypes: [],
        gameLogoImageLinkGiven: false,
        currentGameRank: "",
        currentGameType: ""
    }


    handleTitleInput = (rank) => {
        this.setState({ gameTitle: rank })
    }

    handleRankInput = (title) => {
        this.setState({ currentGameRank: title })
    }

    handleGameTypeInput = (type) => {
        this.setState({ currentGameType: type })
    }

    handleGameLogoInput = (link) => {
        this.setState({ gameLogoImageLinkGiven: true })
        
        this.setState({ gameLogoImageLink: link }, () => {
            let x = JSON.stringify({ 
                gameName:this.state.gameTitle,
                availableRanks: this.state.gameAvailableRanks,
                gameTypes: this.state.gameAvailableTypes,
                gameLogoImageLink: this.state.gameLogoImageLink
            });   
            console.log(x)
            this.props.gameCreationCallback(x)
        })
    }

    handleGameRankAdd = () => {
        console.log(this.state.currentGameRank)
        this.setState({
            gameAvailableRanks: this.state.gameAvailableRanks.concat([this.state.currentGameRank])
        })

    }

    handleGameTypeAdd = () => {
        console.log(this.state.currentGameType)
        this.setState({
            gameAvailableTypes: this.state.gameAvailableTypes.concat([this.state.currentGameType])
        })

    }

    render() {
        return (
            <div>
                <h4>Game's title</h4>
                <Form.Control type="text" placeholder="Title" onChange={e => this.handleTitleInput(e.target.value)} />
                <br />
                <h4>Available ranks</h4>
                <div>
                    <Form.Control type="text" placeholder="Rank" onChange={e => this.handleRankInput(e.target.value)} />
                    <Button variant="primary" onClick={this.handleGameRankAdd}> <BsPlusLg /> Add game</Button>
                    <ul className="list-group text-center">
                        {
                            Object.keys(this.state.gameAvailableRanks).map((key) => {
                                // count = count + 1;
                                return (
                                    <GameRank 
                                        key={key}
                                        name={this.state.gameAvailableRanks[key]}
                                    />
                                );
                            })
                        }
                    </ul>
                </div>

                <br />
                <h4>Available game types</h4>
                <div>
                    <Form.Control type="text" placeholder="Rank" onChange={e => this.handleGameTypeInput(e.target.value)} />
                    <Button variant="primary" onClick={this.handleGameTypeAdd}> <BsPlusLg /> Add game type</Button>
                    <ul className="list-group text-center">
                        {
                            Object.keys(this.state.gameAvailableTypes).map((key) => {
                                // count = count + 1;
                                return (
                                    <GameRank 
                                        key={key}
                                        name={this.state.gameAvailableTypes[key]}
                                    />
                                );
                            })
                        }
                    </ul>
                </div>
                <br />
                <h4>Game logo</h4>
                <Form.Control type="text" placeholder="Image link" onChange={e => this.handleGameLogoInput(e.target.value)} />
                {this.state.gameLogoImageLinkGiven &&
                    <div styles={{ marginTop: '2em' }}>
                        <br />
                        Choosen image:
                        <br />
                        <img src={this.state.gameLogoImageLink} width="150" height="150" />
                    </div>
                }
            </div>
        )
    }
}

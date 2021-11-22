import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import InputSpinner from "react-bootstrap-input-spinner";
// import { QuantityPicker } from 'react-qty-picker';
// import NumberPicker from "react-widgets/NumberPicker";
import "react-widgets/styles.css";

class ChooseGame extends Component {

    state = {
        availableRanks: [],
        availableGameTypes: [],
        gameNameDropdownText: "Choose game",
        gameRankDropdownText: "Your rank",
        gameTypeDropdownText: "Choose game type",
        isGameChoosen:false,
        isRankChoosen:false,
        isGameTypeChosen:false,
        isGameRankChosen: false,
        isLevelChosen: false,
        choosenGameName: "",
        choosenRank:"",
        choosenGameType: "",
        choosenGameId: "",
        choosenLevel:0,
        chosenMaxPlayers:0,
        roomCreationInfo: ""

    }


    handleGameChoice = (game) => {
        let parsedGame = JSON.parse(game);
        this.setState({gameNameDropdownText: parsedGame.gameName})
        this.setState({availableRanks: parsedGame.availableRanks})
        this.setState({availableGameTypes: parsedGame.gameTypes})
        this.setState({choosenGameId: parsedGame.id})
        this.setState({isGameChoosen:true})
        this.setState({choosenGameName:parsedGame.gameName})
    }

    handleRankChoice = (gameRank) => {
        this.setState({gameRankDropdownText: gameRank})
        this.setState({isRankChoosen:true})
        this.setState({choosenRank:gameRank})
    }

    handleGameTypeChoice = (gameType) => {
        this.setState({gameTypeDropdownText: gameType})
        this.setState({isGameTypeChosen:true})
        this.setState({choosenGameType:gameType})
    }

    handleLevelChoice = (level) =>{
        this.setState({choosenLevel: level})
        this.setState({isLevelChosen:true})
    }

    handleMaxPlayersChoice = (maxPlayers) => {
        this.setState({chosenMaxPlayers: maxPlayers})

        let x = JSON.stringify({ 
            gameId: this.state.choosenGameId, 
            gameType: this.state.choosenGameType,
            gameRank: this.state.choosenRank,
            level: this.state.choosenLevel,
            maxPlayers: maxPlayers + 1
        });   
        this.props.gameChoiceCallback(x)
    }


  render() {
    return (
        <div>
            <h4>Choose game</h4>
            <div style={{ marginBottom:'2em' }}>
                <DropdownButton onSelect={ (e) => this.handleGameChoice(e)} id="dropdown-basic-button" title={this.state.gameNameDropdownText}>
                {this.props.games.map((game) => {
                    let gameObjectJSON = JSON.stringify(game);
                    return(
                        <Dropdown.Item  eventKey={gameObjectJSON}> {game.gameName} </Dropdown.Item>
                    )
                    })}
                </DropdownButton>
            </div>

            {this.state.isGameChoosen && 
                <div style={{ marginBottom:'2em' }}>
                    <h4>Choose your rank</h4>
                    <DropdownButton onSelect={ (e) => this.handleRankChoice(e)} id="dropdown-basic-button" title={this.state.gameRankDropdownText}>
                    {this.state.availableRanks.map(rank =>
                        <Dropdown.Item eventKey={rank}>{rank}</Dropdown.Item>
                    )}
                    </DropdownButton>
                </div>
            }
            {this.state.isRankChoosen &&
                <div>
                    <h4>What game type would you like to play?</h4>
                    <DropdownButton onSelect={ (e) => this.handleGameTypeChoice(e)} id="dropdown-basic-button" title={this.state.gameTypeDropdownText}>
                    {this.state.availableGameTypes.map(type =>
                        <Dropdown.Item eventKey={type}>{type}</Dropdown.Item>
                    )}
                    </DropdownButton>
                </div>
            }
            {this.state.isGameTypeChosen &&
                <div>
                    <h4>What's your level</h4>
                    <div style={{width:'7em'}}>
                    <InputSpinner
                        type={'int'}
                        precision={0}
                        max={120}
                        min={0}
                        step={1}
                        value={1}
                        onChange={ num => this.handleLevelChoice(num)}
                        variant={'primary'}
                        size="sm"
                    />
                    </div>
                </div>
            }
                {this.state.isLevelChosen &&
                <div>
                    <h4>How many players are you looking for</h4>
                    <div style={{width:'7em'}}>
                    <InputSpinner
                        type={'int'}
                        precision={0}
                        max={4}
                        min={0}
                        step={1}
                        value={1}
                        onChange={ num => this.handleMaxPlayersChoice(num)}
                        variant={'primary'}
                        size="sm"
                    />
                    </div>
                </div>
            }
        </div>
    )
    }
}




export default ChooseGame;
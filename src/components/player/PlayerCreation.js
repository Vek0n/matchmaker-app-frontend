import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import InputSpinner from "react-bootstrap-input-spinner";
// import { QuantityPicker } from 'react-qty-picker';
// import NumberPicker from "react-widgets/NumberPicker";
import "react-widgets/styles.css";

class PlayerCreation extends Component {

    state = {
        choosenRank: "",
        dropdownText: "Choose your rank"
    }


    handleRankChoice = (rank) => {
        this.setState({dropdownText: rank})
        this.props.rankChoiceCallback(rank);
    }

    handleLevelChoice = (lvl) => {
        this.props.levelChoiceCallback(lvl)
    }

  render() {
    return (
        <div>
            <h4>Choose your rank and level</h4>
            <div style={{ float: 'left', marginLeft: '1em', marginRight: '1em' }}>
            <DropdownButton onSelect={ (e) => this.handleRankChoice(e)} id="dropdown-basic-button" title={this.state.dropdownText}>
            {this.props.game.availableRanks.map(rank =>
                <Dropdown.Item eventKey={rank}>{rank}</Dropdown.Item>
            )}
            </DropdownButton>
            </div>
            <div style={{ float: 'left', width:'7em'}}>
                {/* <NumberPicker defaultValue={9000} /> */}
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
    )
  }

}


export default PlayerCreation;
import React, {PureComponent} from 'react';

export default class GameRank extends PureComponent {
  render() {
    console.log('FruitItem render', this.props.name);
    return (
      <li className="list-group-item list-group-item-info">
        {this.props.name}
      </li>
    );
  }
}

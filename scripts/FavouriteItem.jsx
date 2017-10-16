import React, {Component} from 'react';
import moment from 'moment';

export default class FavouriteItem extends Component {

  constructor(props) {
    super(props);
    this.handleClick = () => this.props.onClick(this.props.address);
  }

  render() {
    let lgiClassName = "list-group-item";

    if (this.props.active) {
      lgiClassName += " active-location";
    }

    return (
      <a className={lgiClassName} onClick={this.handleClick}>
        {this.props.address}
        < span className="createdAt" > {moment(this.props.timestamp).fromNow()}</span >
        <span className="glyphicon glyphicon-menu-right"></span>
      </a >
    );
  }
}

import React, {Component} from 'react';

export default class Map extends Component {

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    var map = new GMaps({
      el: '#map',
      lat: this.props.lat,
      lng: this.props.lng
    });
  }

  render() {
    return (
      <div className="map-overlay">
        <p>Loading...</p>
        <div id="map"></div>
      </div>
    )
  }
}

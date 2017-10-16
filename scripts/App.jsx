import React, {Component} from 'react';
import CurrentLocation from './CurrentLocation';
import Map from './Map';
import Search from './Search';
import FavouritesList from './FavouritesList';

export default class App extends Component {
  constructor() {
    super();
    let favourites = [];
    if (localStorage.favourites) {
      favourites = JSON.parse(localStorage.favourites);
    }

    this.state = {
      favourites: favourites,
      currentAddress: 'Oxford St, Manchester, UK',
      mapCoordinates: {
        lat: 53.475586,
        lng: -2.241402
      }
    }
    this.favouriteToggle = (currentAddress) => {
      if (this.isAddressInFavourites(currentAddress)) {
        this.removeFromFavourites(currentAddress);
      }
      else {
        this.addToFavourites(currentAddress);
      }
    }
    this.isAddressInFavourites = (currentAddress) => {
      return this.state.favourites.map(a => a.address).includes(currentAddress);
    }
    this.removeFromFavourites = (currentAddress) => {
      let favourites = this.state.favourites;
      favourites.splice(favourites.findIndex((a) => a.address === currentAddress), 1);
      this.setState({ favourites: favourites });
      localStorage.favourites = JSON.stringify(favourites);
    }
    this.addToFavourites = (currentAddress) => {
      let favourites = this.state.favourites;
      favourites.push({
        address: currentAddress,
        timestamp: Date.now()
      });
      this.setState({ favourites: favourites });
      localStorage.favourites = JSON.stringify(favourites);
    }
    this.searchForAddress = (address) => {
      GMaps.geocode({
        address: address,
        callback: (results, status) => {
          if (status !== 'OK') {
            this.setState({
              currentAddress: "Location not found"
            });

          } else {
            let latlng = results[0].geometry.location;
            this.setState({
              currentAddress: results[0].formatted_address,
              mapCoordinates: {
                lat: latlng.lat(),
                lng: latlng.lng()
              }
            });
          }
        }
      });
    }
  }
  render() {
    return (
      <div>
        <h1>Your Google Map Locations</h1>
        <Search onSearch={this.searchForAddress.bind(this)} />
        <Map lat={this.state.mapCoordinates.lat} lng={this.state.mapCoordinates.lng} />
        <CurrentLocation address={this.state.currentAddress}
          favourite={this.isAddressInFavourites(this.state.currentAddress)}
          onFavouriteToggle={this.favouriteToggle}
        />
        <FavouritesList favouriteLocations={this.state.favourites} activeLocationAddress={this.state.currentAddress}
          onClick={this.searchForAddress} />
      </div>
    );
  }
}

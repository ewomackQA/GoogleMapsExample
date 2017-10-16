import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
    this.handleChange = (event) => {
      this.setState({ value: event.target.value });
    }
    this.handleSubmit = (event) => {
      event.preventDefault();
      this.props.onSearch(this.state.value);
      ReactDOM.findDOMNode(this).querySelector('input').blur();
    }
  }
  
  render() {
    return (
      <form id="geocoding_form" className="form-horizontal" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <div className="col-xs-12 col-md-6 col-md-offset-3">
            <div className="input-group">
              <input type="text" className="form-control" id="address" placeholder="Find a location..."
                value={this.state.value} onChange={this.handleChange} />
              <span className="input-group-btn">
                <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
              </span>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

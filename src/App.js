import React, { Component } from 'react';
import { fetchIndexes } from './Api';
import logo from './logo.svg';
import './App.css';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      prices: [],
    };
  }

  async componentDidMount() {
    let prices = await fetchIndexes();
    this.setState({ isLoading: false })
    //console.log('what is the prices look like', prices)
    this.setState({ prices });
    
  }

  render() {
    let html = "";
    if (this.state.isLoading) {
      html = "...loading";
    } else {
      html = (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              {this.state.prices.map(data => (
                <p>{data.price}, {data.symbol}</p>
              ))}
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
        </a>
          </header>
        </div>
      )
    }
    return html;
  }
}


import React, { Component } from 'react';
import { fetchIndexes, getPrice } from './Api';
import Form from './Form';
import logo from './logo.svg';
import styled from 'styled-components';
import './App.css';

const SearchData = styled.div`
  width: 400px;
  padding: 20px;
  text-align: center;
  display: inline-block;
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      prices: [],
      searchResult: {},
    };
    this.searchPrice = this.searchPrice.bind(this);
  }

  async componentDidMount() {
    let prices = await fetchIndexes();
    this.setState({ isLoading: false })
    this.setState({ prices });
  }

  async searchPrice(symbol) {
    symbol.trim();
    let searchResult = await getPrice(symbol);
    this.setState({ searchResult });
  }

  render() {
    let html = "";
    if (this.state.isLoading) {
      html = "...loading";
    } else {
      html = (
        <div className="App">
          <Form triggerSearch={this.searchPrice} />
          <SearchData>
            {this.state.searchResult.symbol}
            {this.state.searchResult.price}
          </SearchData>
              {this.state.prices.map(data => (
                <p>{data.price}, {data.symbol}</p>
              ))}
        </div>
      )
    }
    return html;
  }
}


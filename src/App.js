import React, { Component } from 'react';
import { fetchIndexes, getPrice } from './Api';
import Form from './Form';
import Portfolio from './Portfolio';
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
      cashBalance: 5000,
      portfolio: [],
      searchResult: {},
      err: "",
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
    this.setState({ err: "" });
    let searchResult = await getPrice(symbol);
    if (searchResult === undefined) {
      this.setState({ err: "invalid symble entered"});
    } else {
      this.setState({ searchResult });
    }
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
            {this.state.err}
          </SearchData>
              {this.state.prices.map(data => (
                <p>{data.price}, {data.symbol}</p>
              ))}
          <Portfolio id="portfolio"
                     cashBalance={this.state.cashBalance}
                     />
        </div>
      )
    }
    return html;
  }
}


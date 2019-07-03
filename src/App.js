import React, { Component } from 'react';
import { fetchIndexes, getPrice } from './Api';
import Form from './Form';
import BuySellForm from './BuySellForm';
import Portfolio from './Portfolio';
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
      showSearch: false,
      prices: [],
      cashBalance: 5000,
      portfolio: [
        { symbol: "AAPL", shares: 30, buyPrice: 110 },
        { symbol: "AMZN", shares: 2, buyPrice: 798 },
        { symbol: "RVLV", shares: 10, buyPrice: 33 },
      ],
      searchResult: {},
      err: "",
    };
    this.searchPrice = this.searchPrice.bind(this);
    this.buyStock = this.buyStock.bind(this);
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
      this.setState({ showSearch: true });
    }
  }

  buyStock(symbol, shares, buyPrice) {
    let newHolding = { symbol, shares, buyPrice };
    this.setState(st => ({
      portfolio: [...this.state.portfolio, newHolding]
    }));
  }

  render() {
    let searchResult = "";
    if (this.state.showSearch) {
      searchResult = (
        <div id="SearchResult">
          Symbol: {this.state.searchResult.symbol} <br/> 
          Price: ${this.state.searchResult.price} <br/>
          <BuySellForm id="resultForm"
                   buySell="buy"
                   symbol={this.state.searchResult.symbol}
                   price={this.state.searchResult.price}
                   triggerBuy={this.buyStock}
          />
        </div>
        
      )
    }
    let html = "";
    if (this.state.isLoading) {
      html = "...loading";
    } else {
      html = (
        <div className="App">
          <Form triggerSearch={this.searchPrice} />
          <SearchData>
            {searchResult}
            {this.state.err}
          </SearchData>
              {this.state.prices.map(data => (
                <p>{data.price}, {data.symbol}</p>
              ))}
          <Portfolio id="portfolio"
                     cashBalance={this.state.cashBalance}
                     holdings={this.state.portfolio}
                     />
        </div>
      )
    }
    return html;
  }
}


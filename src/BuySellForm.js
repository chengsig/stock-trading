import React, { Component } from 'react';
import styled from 'styled-components';

const StyledBuySellForm = styled.form`
  padding: 2px;
  color: #555;
`;

const StyledBuySellInput = styled.input`
  box-sizing: border-box;
  width: 10%;
  border: 1px solid lightgrey;
`;

const initialState = {
    shares: '',
}

class BuySellForm extends Component{
  constructor(props){
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    if (this.props.buySell === 'buy') {
      this.props.triggerBuy(
        this.props.symbol, 
        this.state.shares, 
        this.props.price,
        this.props.price,
        );
    } else if (this.props.buySell === 'sell') {
      this.props.triggerSell(
        this.props.symbol, 
        parseInt(this.state.shares), 
        this.props.price,
        this.props.price,
        );
    }
    this.setState(initialState);
  }

  render() {
    let btn = "";
    if (this.props.buySell === "buy") {
      btn = (
        <button id="buySellBtn"
                    onClick={this.handleSubmit}>Buy</button>
      )
    } else if (this.props.buySell === "sell") {
      btn = (
        <button id="buySellBtn"
                    onClick={this.handleSubmit}>Sell</button>
      )
    }
    return(
        <StyledBuySellForm id="styledForm">
            <label htmlFor="shares">Shares:</label>
            <StyledBuySellInput id="shares" 
                         onChange={this.handleChange} 
                         value={this.state.shares} 
                         name="shares"
                         />
            Total: ${(this.state.shares * this.props.price).toFixed(2)}
            {btn}
        </StyledBuySellForm>
    )}
}

export default BuySellForm;
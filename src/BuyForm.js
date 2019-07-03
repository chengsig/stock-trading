import React, { Component } from 'react';
import styled from 'styled-components';

const StyledBuyForm = styled.form`
  padding: 2px;
  color: #555;
`;

const StyledBuyInput = styled.input`
  box-sizing: border-box;
  width: 10%;
  border: 1px solid lightgrey;
`;

const initialState = {
    shares: '',
}

class BuyForm extends Component{
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
    this.props.triggerSearch(this.state.symbol);
    this.setState(initialState);
  }

  render() {

    return(
        <StyledBuyForm id="styledForm">
            Symbol: {this.props.symbol} <br/> 
            Price: ${this.props.price} <br/>
            <label htmlFor="shares">Shares:</label>
            <StyledBuyInput id="shares" 
                         onChange={this.handleChange} 
                         value={this.state.shares} 
                         name="shares"
                         /><br/>
            Total: ${this.state.shares * this.props.price}
            <button id="buyBtn"
                    onClick={this.handleSubmit}>Buy</button>
        </StyledBuyForm>
    )}
}

export default BuyForm;
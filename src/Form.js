import React, { Component } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  padding: 2px;
  color: #555;
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  width: 15%;
  border: 1px solid lightgrey;
`;

const initialState = {
    symbol: '',
}

class Form extends Component{
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
        <StyledForm id="styledForm">
            <label htmlFor="symbol">Enter Stock Symbol:</label><br/>
            <StyledInput id="symbol" 
                         onChange={this.handleChange} 
                         value={this.state.symbol} 
                         name="symbol"
                         /><br/>
            <button id="searchBtn"
                    onClick={this.handleSubmit}>Search</button>
        </StyledForm>
    )}
}

export default Form;
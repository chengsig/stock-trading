import React, { Component } from 'react';
import styled from 'styled-components';
import BuySellForm from './BuySellForm';

const Holdings = styled.table`
  text-align: center;
  display: inline-block;
`;

const tr = styled.tr`
    background-color: #f2f2f2;
`;

export default class Portfolio extends Component {
    render() {
        let holdings = "";
        
        holdings = this.props.holdings.map(h => (
            <tr id={h.symbol}>
                <th>{h.symbol}</th>
                <th>${h.curPrice}</th>
                <th>{h.shares}</th>
                <th>${(h.curPrice * h.shares).toFixed(2)}</th>
                <th style={{color: (h.curPrice - h.buyPrice) * h.shares >= 0 ? "green" : "red"}}>
                    ${((h.curPrice - h.buyPrice) * h.shares).toFixed(2)}
                </th>
                <th>
                    <BuySellForm id={h.symbol}
                                 buySell="sell"
                                 symbol={h.symbol}
                                 price={h.curPrice}
                                 triggerSell={this.props.triggerSell}
                                />
                </th>
            </tr>
            )
        )
        return (
            <div className="Portfolio">
                <i class="fas fa-folder-open"> Porfolio</i> <br/>
                <Holdings id="currentHoldings">
                    <tr>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>Shares</th>
                        <th>Total</th>
                        <th>Gain/Loss</th>
                        <th>Shares to sell/Proceeds</th>
                        <th> </th>
                    </tr>
                    {holdings}

                </Holdings>
            </div>
        )
    }
}
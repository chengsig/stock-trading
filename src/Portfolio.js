import React, { Component } from 'react';
import styled from 'styled-components';

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
                <th>{h.buyPrice * h.shares}</th>
                <th>gain/loss</th>
            </tr>
            )
        )
        return (
            <div className="Portfolio">
                <i class="fas fa-folder-open"> Porfolio</i> <br/>
                <Holdings id="currentHoldings">
                    <tr>
                        <th>Symbol</th>
                        <th>Total</th>
                        <th>Gain/Loss</th>
                    </tr>
                    {holdings}

                </Holdings>
            </div>
        )
    }
}
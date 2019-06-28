import React, { Component } from 'react';
import styled from 'styled-components';

const Holdings = styled.table`
  text-align: center;
  display: inline-block;
  border-collapse: collapse;
`;

const tr = styled.tr`
    background-color: #f2f2f2;
`;

export default class Portfolio extends Component {
    render() {
        return (
            <div className="Portfolio">
                <Holdings id="currentHoldings">
                    <tr>
                        <th>Symbol</th>
                        <th>total</th>
                        <th>gain/loss</th>
                    </tr>
                    <tr>
                        <th>cash</th>
                        <th>{this.props.cashBalance}</th>
                        <th>gain/loss</th>
                    </tr>
                </Holdings>
            </div>
        )
    }
}
import React, { Component } from 'react';
import styled from 'styled-components';
import BuySellForm from './BuySellForm';
import { genericTypeAnnotation } from '@babel/types';

const Holdings = styled.table`
  text-align: center;
  display: inline-block;
`;

const tr = styled.tr`
    background-color: #f2f2f2;
`;

const sumRowStyle = {
    backgroundColor: '#f5f5f5',
};

export default class Portfolio extends Component {
    render() {
        let total = this.props.cashBalance;
        let holdings = [];
        for (let h of this.props.holdings) {
            total += h.curPrice * h.shares;
            holdings.push(
                <tr id={h.symbol + h.shares}>
                    <td>{h.symbol}</td>
                    <td>${h.curPrice}</td>
                    <td>{h.shares}</td>
                    <td>${(h.curPrice * h.shares).toFixed(2)}</td>
                    <td style={{ color: (h.curPrice - h.buyPrice) * h.shares >= 0 ? "green" : "red" }}>
                        ${((h.curPrice - h.buyPrice) * h.shares).toFixed(2)}
                    </td>
                    <td>
                        <BuySellForm id={h.symbol}
                            buySell="sell"
                            symbol={h.symbol}
                            price={h.curPrice}
                            triggerSell={this.props.triggerSell}
                        />
                    </td>
                </tr>
            )
        }
        let GLcolor = total - 5000 >= 0 ? "green" : "red";
        let gainLoss = (total - 5000).toFixed(2);
        let totalDisplay = total.toFixed(2);

        return (
            <div className="Portfolio">
                <i className="fas fa-folder-open"> Porfolio</i> <br />
                <Holdings id="currentHoldings">
                    <tbody>
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
                        <tr>
                            <td>Cash</td>
                            <td></td>
                            <td></td>
                            <td>${this.props.cashBalance}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr style={sumRowStyle}>
                            <th>Sum</th>
                            <td></td>
                            <td></td>
                            <td>${totalDisplay}</td>
                            <td style={{color: GLcolor}}>${gainLoss}</td>
                            <td>Shares to sell/Proceeds</td>
                            <td> </td>
                        </tr>
                    </tbody>
                </Holdings>
            </div>
        )
    }
}
/** API calls stock prices. */

import axios from 'axios';

const BASE_API_URL = "https://api.iextrading.com/1.0/tops/last?symbols="


/** Fetch list of tech company prices*/

export async function fetchIndexes() {
    let prices = [];
    let tickers = ['GOOG', 'FB', 'AMZN'];
    for (let ticker of tickers) {
        let p = await axios.get(`${BASE_API_URL}${ticker}`);
        prices.push(p.data[0]);
    }
    return prices;
}

/** Get a stock's latest price by symbol */

export async function getPrice(symbol) {
    let res = await axios.get(`${BASE_API_URL}${symbol}`);
    return res.data;
}

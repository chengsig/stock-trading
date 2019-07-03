/** API calls stock prices. */

import axios from 'axios';

const BASE_API_URL = "https://api.iextrading.com/1.0/tops/last?symbols="


/** Fetch list of tech company prices*/

export async function fetchPortfolio(portfolio) {
    for (let holding of portfolio) {
        let p = await axios.get(`${BASE_API_URL}${holding.symbol}`);
        holding['curPrice'] = p.data[0].price;
    }
    return portfolio;
}

/** Get a stock's latest price by symbol */

export async function getPrice(symbol) {
    let res = await axios.get(`${BASE_API_URL}${symbol}`);
    return res.data[0];
}


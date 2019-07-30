"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require('request');
function requestPromise(url, method = "GET", headers = -1, data = -1) {
    var trans = {
        method: method,
        url: url,
    };
    if (headers != -1)
        trans.headers = headers;
    if (data != -1) {
        trans.data = data;
        trans.json = true;
    }
    return new Promise((resolve, reject) => {
        request(trans, (err, response, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}
async function getResponse(query, params) {
    // const { queryId, query, endpoint, subscriber, endpointParams, onchainSub } = event;
    console.log("query: ", query);
    console.log("parameter: ", params);
    let stock_prices = [];
    try {
        for (let param of params) {
            var financeURL = "https://financialmodelingprep.com/api/v3/stock/real-time-price/" + param.toUpperCase();
            // Generate the URL to fetch the JSON from financialmodelingprep website. Finds the information using the first parameter
            const body = await requestPromise(financeURL);
            // Make a get request to the generated URL to fetch the JSON
            const json = JSON.parse(body);
            // Formate the JSON to be more accesible
            var price;
            // Initialize the return value as either a string or an integer
            price = json["price"];
            //returns the price as a string
            let result = "stock price of " + param + " = " + price;
            stock_prices.push("" + price);
            console.log(result);
        }
        //sum = sum / params.length;
        console.log(stock_prices);
        return stock_prices;
    }
    catch (error) {
        // If an error is encountered, returns an error message
        return ["0", "Unable to Access data. Try again later"];
    }
}
exports.getResponse = getResponse;

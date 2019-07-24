const request = require('request');

function requestPromise(url:string, method:string = "GET", headers:number = -1, data:number = -1) {
    var trans:any = {
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
        request(trans, (err:any, response:any, data:any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}

export async function getResponse(query:string, params:string[]){
	// const { queryId, query, endpoint, subscriber, endpointParams, onchainSub } = event;
    console.log("query: ", query);
    console.log("parameter: ", params);
    let stock_prices:string[] = [];
    try{
        for (let param of params) {
            var financeURL:string="https://financialmodelingprep.com/api/v3/stock/real-time-price/"+ param.toUpperCase();
            // Generate the URL to fetch the JSON from financialmodelingprep website. Finds the information using the first parameter
            const body:any = await requestPromise(financeURL);
            // Make a get request to the generated URL to fetch the JSON
            const json:any = JSON.parse(body);
            // Formate the JSON to be more accesible
            var price:any;
            // Initialize the return value as either a string or an integer
            price=json["price"];

            //returns the price as a string
            let result = "stock price of " + param + " = " + price;
            stock_prices.push(""+price);

            console.log(result);
        }
        //sum = sum / params.length;
        console.log(stock_prices)
        return stock_prices;
    }
    catch(error){
        // If an error is encountered, returns an error message
        return ["0","Unable to Access data. Try again later"]
    }

}

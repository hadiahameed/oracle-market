# Zap-oracle-template-stockprice


## Purpose :
This oracle allows users to know the current stock price for different stocks such as:
+ Apple (AAPL)
+ Facebook (FB)
+ General Electric (GE)
+ Twitter Inc. (TWTR)

and so on.

API used: https://financialmodelingprep.com/api/v3/stock/real-time-price


## Running an oracle:
1. Run `yarn` in the project directory.
2. In the Oracle/Config.json, add your MetaMask mnemonic on line 6.
2. Run `npm run build`.
3. Run `npm run start`

## Querying an oracle:

+ Follow instructions for running zap-term 
[zap-term]: https://github.com/hadiahameed/zap-term

## ORACLE TEMPLATE SETUP EXPLAINED

### Config Setting :
  - Oracle's information :
    + Title, Public key, Mnemonic, Node URL
    + Endpoint : Name, Curve, broker, md (description about endpoint), query list ( query string accepted and response type)
### What will be created  once setup and run:
1. Oracle registered if none exists
2. Endpoint created if Endpoint name in config has not been created
  + Endpoint.json file will be created containing information about query list and endpoint, saved in ipfs and set as Endpoint's params on-chain
  + Endpoint.md file will be created, saved in ipfs and set as Provider's params on-chain
3. If Endpoint is already initiated, the step 2 will be ignored


### Code Layout :

1. Config.ts : data about your wallet ,ethereum node and your provider's pubkey and title
3. Oracle.ts : Template for Create/Manage  flow
4. Responder.ts :  Stub callback function when receive query event and return result

### Usage :

1. Configure Config.ts. Add your MetaMask `mnemonic` in the json file.
2. Implement function `getResponse` in Responder.ts
4. Run `yarn` in the terminal.
5. Run `npm run build`
3. Run `npm start` to start create/get Oracle and start listening to queries   

## Note :
- A query consists of the querystring 'stockprice' and an array of parameters.
- Choose the stock name for params from the following list e.g. AAPL to find the stock price for Apple's stocks:
https://financialmodelingprep.com/api/v3/stock/real-time-price
- Ensure you have enough ETH in your address for responding to queries

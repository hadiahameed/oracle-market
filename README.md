# oracle-market

#Pre-requisites:
- Have a MetaMask extension in your browser. It's better if you sign into your MetaMask account before running this App.

# How to use this oracle:
 - `git clone https://github.com/hadiahameed/oracle-market.git`
 - `cd stocks-oracle`
 - `yarn`
 - `npm start` and let it run
 - In a different terminal, `cd oracle-frontend`
 - `cd oracle-frontend`
 - `yarn`
 - `npm start`
 - The webpage will open in your browser.
 - It will prompt you to connect to your MetaMask account.
 - Amount of dots to bond: 1 (if you want to query the oracle once)
 - Wait for the status to say, "You have been entered!"
 - Stock1: "AAPL" (to get Apple's stock price)
 - Stock2: "FB" (to get Facebook's stock price)
 - Stock3: "TWTR" (to get Twitter's stock price)
 - Stock4: "MSFT" (to get Microsoft's stock price)
 - Click on "Query"
 - Wait for the status to say, "Received the response!"
 - You can see the stock prices in the results section.


# How to make your own smart dApp
There are two parts to this tutorial:
1) Creating an off-chain oracle
2) Creating a smart contract that queries the oracle

- Make an empty folder `stock-price-dApp`
## Creating an Oracle
- Inside 

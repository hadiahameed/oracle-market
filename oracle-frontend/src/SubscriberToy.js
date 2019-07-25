import web3 from './web3';

const address = '0x80B3b70f5d90E4CE29e81D70290fC5A9bacb9736'; // deployed contract, did some console.log, copypastaed from terminal
const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "string"
			}
		],
		"name": "query",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			}
		],
		"name": "ReceiveResponse",
		"type": "event"
	}
]
// local abstraction of contract
export default new web3.eth.Contract(abi, address);


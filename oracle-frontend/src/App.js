import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  state = {
    
  }; // ES6 syntatic sugar. Initialize state without explicitly writing constructor

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({manager, players, balance});
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    console.log('hello');
    console.log(this.state.value);

    this.setState({message: 'Waiting on transaction success...'});

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({message: 'You have been entered!'});
  };

  onClick = async() => {
    const accounts = await web3.eth.getAccounts();

    this.setState({message: 'Waiting on transaction success...'});

    await lottery.methods.pickWinner().send({
      from:accounts[0]
    });

    this.setState({message: 'A winner has been chosen'});
  };

  render() {
    /*const result = await new web3.eth.Contract(JSON.parse(interface))
     .deploy({data: '0x' + bytecode }) // add 0x bytecode
     .send({from: accounts[0]}); // remove 'gas'
    */

    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
        <p>There are currently {this.state.players.length} people entered, competing to win {this.state.balance} ether.</p>
      
        <hr/>

        <form onSubmit={this.onSubmit}>
          <h4>Wnat to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input 
              vlaue = {this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>

        <hr/>

        <h4>Pick a winner</h4>
        <button onClick={this.onClick}>Pick</button>

        <hr />
        <h1>{this.state.message}</h1>
      </div>
    );
    
  }
}

export default App;

import React, {Component} from 'react';
import './App.css';
import web3 from './web3';
import subscriber from './subscriber';

class App extends Component {
  state = {
    owner: '',
    coordinator: '',
    dots: '',
    name1: '',
    name2: '',
    name3: '',
    name4: '',
    response1: '',
    response2: '',
    response3: '',
    response4: '',
    message: ''
  }; // ES6 syntatic sugar. Initialize state without explicitly writing constructor

  async componentDidMount() {
    const owner = await subscriber.methods.owner().call();
    const coordinator = await subscriber.methods.coordinator().call();

    this.setState({owner, coordinator});
    subscriber.events.ReceiveResponse()
    .on('data', (event) => {
      this.setState({response1: event.returnValues.result});
      this.setState({message: 'Received the response!'});
      }).on('error', console.error);
  };

  bond = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    console.log('BONDING');

    this.setState({message: 'Waiting on transaction success...'});

    await subscriber.methods.bond(this.state.dots).send({
      from: accounts[0],
    });
    this.setState({message: 'You have been entered!'});
  };

  query = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    console.log("querying");

    this.setState({message: 'Waiting on transaction success...'});
    
    const bytes32Arr = [];

    bytes32Arr.push(web3.utils.fromAscii(this.state.name1));
  
    await subscriber.methods.query("stocks", bytes32Arr).send({
      from: accounts[0],
    });

    /*var myEvent = subscriber.events.ReceiveResponse({},{fromBlock: 0, toBlock: 'latest'});
    myEvent.watch(function(error, result){
        console.log("on watch"); 
        console.log(arguments);
    });*/


  };


  render() {
    return (
      <div>
        <h2>Subscriber Contract</h2>
        <p>This contract is owned by {this.state.owner}</p>
        <p>The ZapCoordinator is {this.state.coordinator}</p>
      
        <hr/>

        <form onSubmit={this.bond}>
          <h4>Bond Dots</h4>
          <div>
            <label>Amount of dots to bond</label>
            <input 
              type = "number"
              value = {this.state.dots}
              onChange={event => this.setState({ dots: event.target.value })}
            />
          </div>
          <button>Bond</button>
        </form>

        <hr/>

        <form onSubmit={this.query}>
          <h4>Query Stock Prices</h4>
          <div>
            <label>Stock1</label>
            <input 
              value = {this.state.name1}

              onChange={event => this.setState({ name1: event.target.value })}
            />
          </div>
          <div>
            <label>Stock2</label>
            <input 
              value = {this.state.name2}
              onChange={event => this.setState({ name2: event.target.value })}
            />
          </div>
          <div>
            <label>Stock3</label>
            <input 
              value = {this.state.nome3}
              onChange={event => this.setState({ name3: event.target.value })}
            />
          </div>
          <div>
            <label>Stock4</label>
            <input 
              value = {this.state.name4}
              onChange={event => this.setState({ name4: event.target.value })}
            />
          </div>
          <button>Query</button>
        </form>
        
        <hr />

        <span><strong>Stock1: </strong> {this.state.name1} <em>{this.state.response1}</em></span>
        <br/>
        <span><strong>Stock2: </strong> {this.state.name2} <em>{this.state.response2}</em></span>
        <br/>
        <span><strong>Stock3: </strong> {this.state.name3} <em>{this.state.response3}</em></span>
        <br/>
        <span><strong>Stock4: </strong> {this.state.name4} <em>{this.state.response4}</em></span>

        <hr />
        <h1>{this.state.message}</h1>
      </div>
    );
    
  }
}

export default App;

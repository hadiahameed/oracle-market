import React, {Component} from 'react';
import './App.css';
import web3 from './web3';
import subscriber from './subscriber';

class App extends Component {
  state = {
    owner: '',
    coordinator: '',
    dots: '',
    names: [''],
    response: [''],
    message: ''
  }; // ES6 syntatic sugar. Initialize state without explicitly writing constructor

  async componentDidMount() {
    const owner = await subscriber.methods.owner().call();
    const coordinator = await subscriber.methods.coordinator().call();

    this.setState({owner, coordinator});
    subscriber.events.ReceiveResponse()
    .on('data', (event) => {
      let value = event.returnValues.result;
      let resArray = value.split(',');
      resArray.forEach((res,index) =>  {
        if (res !== '') {
          resArray[index] = ' :$' + res;
        }
      });
      
      this.setState({response: resArray});
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
    this.state.names.forEach(name =>  {
      if (name !== '') {
        bytes32Arr.push(web3.utils.fromAscii(name));
      }
    });
    console.log(bytes32Arr)
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
    const items = []

    for (const [index, value] of this.state.names.entries()) {
      items.push( <div key={index}><span ><strong>Stock {index + 1}: </strong> {value} <em> {this.state.response[index]} </em></span><br /></div>)
    }
    return (
      <div className="myClass">
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
              value = {this.state.names[0]}

              onChange ={ event  => {
                const newIds = this.state.names.slice(); //copy the array
                newIds[0] = event.target.value; //execute the manipulations
                this.setState({names: newIds}) //set the new state
              }}
            />
          </div>
          <div>
            <label>Stock2</label>
            <input
              value = {this.state.name2}
              onChange ={ event  => {
                const newIds = this.state.names.slice(); //copy the array
                newIds[1] = event.target.value; //execute the manipulations
                this.setState({names: newIds}) //set the new state
              }}
            />
          </div>
          <div>
            <label>Stock3</label>
            <input
              value = {this.state.nome3}
              onChange ={ event  => {
                const newIds = this.state.names.slice(); //copy the array
                newIds[2] = event.target.value; //execute the manipulations
                this.setState({names: newIds}) //set the new state
              }}
            />
          </div>
          <div>
            <label>Stock4</label>
            <input
              value = {this.state.name4}
              onChange ={ event  => {
                const newIds = this.state.names.slice(); //copy the array
                newIds[3] = event.target.value; //execute the manipulations
                this.setState({names: newIds}) //set the new state
              }}
            />
          </div>
          <button>Query</button>
        </form>

        <hr />
        <div>
            {items}
        </div>

        {/* <span><strong>Stock1: </strong> {this.state.names[0]} <em>{this.state.response[0]}</em></span>
        <br/>
        <span><strong>Stock2: </strong> {this.state.names[1]} <em>{this.state.response[1]}</em></span>
        <br/>
        <span><strong>Stock3: </strong> {this.state.names[2]} <em>{this.state.response[2]}</em></span>
        <br/>
        <span><strong>Stock4: </strong> {this.state.names[3]} <em>{this.state.response[3]}</em></span>
            */}
        <hr />
        <h1>{this.state.message}</h1>
      </div>
    );

  }
}

export default App;

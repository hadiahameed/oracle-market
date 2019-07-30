import React, {Component} from 'react';
import './App.css';
import web3 from './web3';
import subscriber from './subscriber';

class App extends Component {
  state = {
    name: '',
    response1: '',
    message: ''
  }; // ES6 syntatic sugar. Initialize state without explicitly writing constructor

  async componentDidMount() {
    subscriber.events.ReceiveResponse()
      .on('data', (event) => {
        this.setState({response1: event.returnValues.name});
        console.log(event.returnValues.name);
      })
      .on('error', console.error);
  };

  query = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({message: 'Waiting on transaction success...'});

    await subscriber.methods.query(this.state.name).send({
      from: accounts[0],
    });
    this.setState({message: 'You have been entered!'});
  };

  render() {
    return (
      <div>
        <form onSubmit={this.query}>
          <h4>Query</h4>
          <div>
            <input 
              value = {this.state.name}
              onChange={event => this.setState({ name: event.target.value })}
            />
          </div>
          <button>Query</button>
        </form>
        <hr />
        <h1>{this.state.message}</h1>
        <h1>{this.state.response1}</h1>
      </div>
    );
    
  }
}

export default App;

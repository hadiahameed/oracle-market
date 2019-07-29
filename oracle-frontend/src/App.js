import React, {Component} from 'react';
import web3 from './web3';
import subscriber from './subscriber';

class App extends Component {
  state = {
    owner: '',
    coordinator: '',
    dots: '',
    names: [''],
    response: [''],
    message: 'Ready to bond.'
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
  };


  render() {
    const items = []

    for (const [index, value] of this.state.names.entries()) {
      items.push( <div key={index}><span ><strong>Stock {index + 1}: </strong> {value} <em> {this.state.response[index]} </em></span><br /></div>)
    }
    return (
    <div className="container">
      <div className="row">
          <div class="col-xs-12 col-md-8">
              <h2>Subscriber Contract</h2>
              <p>This contract is owned by {this.state.owner}</p>
              <p>The ZapCoordinator is {this.state.coordinator}</p>
          </div>
      </div>
      <hr/>
      <div className="row">
        <div class="col-xs-12 col-md-8">
          <h4>Status</h4>
          <p>{this.state.message}</p>
          
        </div>
      </div>

      <hr/>
      <div className="row">
          <div class="col-xs-12 col-md-8">
              <form  onSubmit={this.bond}>

                  <h4>Bond to the Oracle</h4>
                  <div class="form-group">
                      <label class="col-sm-10">Amount of dots to bond: </label>
                      <div class="col-sm-10">
                          <input
                          class="form-control"
                          type = "number"
                      value = {this.state.dots}
                      onChange={event => this.setState({ dots: event.target.value })}
                          />
                      </div>
                  </div>

                  <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                      <button id="bonddots" type="submit" class="btn btn-primary">Bond</button>
                    </div>
                  </div>

              </form>
          </div>
      </div>
      <hr/>
      <div className="row">
          <div className="col-xs-12 col-md-8">
              <form onSubmit={this.query}>

                  <h4>Query Stock Prices</h4>
                  <div class="form-group">
                      <label class="col-sm-2 control-label">Stock1</label>
                      <div class="col-sm-10">
                          <input
                          class="form-control"
                          value = {this.state.names[0]}
                          onChange ={ event  => {
                              const newIds = this.state.names.slice(); //copy the array
                              newIds[0] = event.target.value; //execute the manipulations
                              this.setState({names: newIds}) //set the new state
                          }}
                          />
                      </div>
                  </div>
                  <div class="form-group">
                      <label class="col-sm-2 control-label">Stock2</label>
                      <div class="col-sm-10">
                          <input
                          class="form-control"
                          value = {this.state.names[1]}
                          onChange ={ event  => {
                              const newIds = this.state.names.slice(); //copy the array
                              newIds[1] = event.target.value; //execute the manipulations
                              this.setState({names: newIds}) //set the new state
                          }}
                          />
                      </div>
                  </div>
                  <div class="form-group">
                      <label class="col-sm-2 control-label">Stock3</label>
                      <div class="col-sm-10">
                          <input
                          class="form-control"
                          value = {this.state.names[2]}
                          onChange ={ event  => {
                              const newIds = this.state.names.slice(); //copy the array
                              newIds[2] = event.target.value; //execute the manipulations
                              this.setState({names: newIds}) //set the new state
                          }}
                          />
                      </div>
                  </div>
                  <div class="form-group">
                      <label class="col-sm-2 control-label">Stock4</label>
                      <div class="col-sm-10">
                          <input
                          class="form-control"
                          value = {this.state.names[3]}
                          onChange ={ event  => {
                              const newIds = this.state.names.slice(); //copy the array
                              newIds[3] = event.target.value; //execute the manipulations
                              this.setState({names: newIds}) //set the new state
                          }}
                          />
                      </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                      <button type="submit" class="btn btn-primary">Query</button>
                    </div>
                  </div>
              </form>
          </div>
          <div className="col-xs-4">
            {items}
          </div>
      </div>
      <hr />
      
  </div>
    );

  }
}

export default App;

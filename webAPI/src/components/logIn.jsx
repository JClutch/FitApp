console.log('Hello World!');
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../actions/example.jsx'
import Bypass from '../actions/bypass.jsx'
import axios from 'axios'
import auth from '../actions/authorize.jsx'
import {
  HashRouter as Router,
  Route,
  Link
 } from 'react-router-dom';


//login
class LogIn extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        ClientUsername : '',
        ClientPassword : '',
        TrainerUsername: '',
        TrainerPassword: ''
      }
      this.onClientPasswordChange = this.onClientPasswordChange.bind(this);
      this.onClientUsernameChange = this.onClientUsernameChange.bind(this);
      this.handleClientButtonClick = this.handleClientButtonClick.bind(this);
      this.onTrainerPasswordChange = this.onTrainerPasswordChange.bind(this);
      this.onTrainerUsernameChange = this.onTrainerUsernameChange.bind(this);
      this.handleTrainerButtonClick = this.handleTrainerButtonClick.bind(this);
  }

  componentDidMount() {
    //runs only once we can set a general init dispatch/action here
    // this.props.dispatch(ChangeUser('Jason'))
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps)
    //need to basically set props here which is anmnoying
  }

  onClientPasswordChange(e) {
    this.setState({
      ClientPassword: e.target.value
    })
  }

  onClientUsernameChange(e) {
    this.setState({
      ClientUsername : e.target.value
    })
  }

  onTrainerPasswordChange(e) {
    this.setState({
      TrainerPassword: e.target.value
    })
  }

  onTrainerUsernameChange(e) {
    this.setState({
      TrainerUsername : e.target.value
    })
  }

  handleTrainerButtonClick(){
    var payload = {
      ClientUsername: this.state.TrainerUsername,
      ClientPassword: this.state.TrainerPassword,
      type: 'Trainer'
    }

    console.log('THIS IS THE PAYLOAD', payload)
    this.props.dispatch(Bypass(payload))
    // this.props.dispatch(ChangeUser(payload))

    // axios.post('/server/userLogIn', payload).then((response) =>{
    //   console.log('got back :', response)
    //   if(response.data){
    //     this.props.dispatch(auth(response.data))
    //   } else{
    //     this.props.history.push('/signUp')  
    //   }

    // }).catch((err) => {
    //   throw err
    // })

  }


  handleClientButtonClick(){
    var payload = {
      ClientUsername: this.state.ClientUsername,
      ClientPassword: this.state.ClientPassword,
      type: 'Client'
    }

    console.log('THIS IS THE PAYLOAD', payload)
    this.props.dispatch(Bypass(payload))
    // this.props.dispatch(ChangeUser(payload))

    // axios.post('/server/userLogIn', payload).then((response) =>{
    //   console.log('got back :', response)
    //   if(response.data){
    //     this.props.dispatch(auth(response.data))
    //   } else{
    //     this.props.history.push('/signUp')  
    //   }

    // }).catch((err) => {
    //   throw err
    // })

  }

  render() {
    console.log('heres the state', this.state, this.props)
    return (
      <div className="container" style={{backgroundColor:'rgba(0,0,0,0.2)', textAlign:'center'}}>
        <h1 style={{fontFamily: 'Sans-Serif', color:'white'}}> Welcome </h1>
        <div style={{flexDirection:'row'}}>
          <div style={{position:'absolute', right:'50px', padding:'10px', backgroundColor:'rgba(0,0,0,0.2)'}}>
            <h2> Trainer? </h2>
            <input onChange={this.onTrainerUsernameChange} placeholder="Username" value={this.state.TrainerUsername} style={{backgroundColor:'rgba(255,255,255,0.6)', fontFamily: 'Sans-Serif'}} />
            <input onChange={this.onTrainerPasswordChange} placeholder='Password' type='password' value={this.state.TrainerPassword} style={{backgroundColor:'rgba(255,255,255,0.6)', fontFamily: 'Sans-Serif'}} />
            <button onClick={this.handleTrainerButtonClick} className="btn btn-lg btn-block" type='button' style={{backgroundColor:'rgba(255,255,255,0.4)', fontFamily: 'Sans-Serif'}}>
              <span className="glyphicon glyphicon-search">Enter</span>
            </button>
          </div>
          <div style={{position:'absolute', left:'50px', padding:'10px', backgroundColor:'rgba(0,0,0,0.2)'}}>
            <h2> Client? </h2>
            <input onChange={this.onClientUsernameChange} placeholder="Username" value={this.state.ClientUsername} style={{backgroundColor:'rgba(255,255,255,0.6)', fontFamily: 'Sans-Serif'}} />
            <input onChange={this.onClientPasswordChange} placeholder='Password' type='password' value={this.state.ClientPassword} style={{backgroundColor:'rgba(255,255,255,0.6)', fontFamily: 'Sans-Serif'}} />
            <button onClick={this.handleClientButtonClick} className="btn btn-lg btn-block" type='button' style={{backgroundColor:'rgba(255,255,255,0.4)', fontFamily: 'Sans-Serif'}}>
              <span className="glyphicon glyphicon-search">Enter</span>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStoreToProps = (store) => {
  console.log('store', store);
  return {
    foo: store.example.foo,
    user: store.example.user,
    password: store.example.password
  };
};

export default withRouter(connect(
  mapStoreToProps
)(LogIn));
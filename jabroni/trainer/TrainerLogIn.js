import React from 'react';
import { Alert, StyleSheet, Text, View, Button, ScrollView, TouchableHighlight, AsyncStorage } from 'react-native';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import { graphql, ApolloProvider, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { FormLabel, FormInput, FormValidationMessage, ButtonGroup } from 'react-native-elements'
var t = require('tcomb-form-native');
var Form = t.form.Form;

var styles = StyleSheet.create({
  scrollView:{
    // flex:1,
    padding: 10,
    justifyContent: 'center'
    // backgroundColor:'blue'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingLeft: 5,
    paddingRight: 5
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'TrainerHome'})    
  ]
});

var Person = t.struct({
  username: t.String,
  password: t.String
});

const q = gql`
  query loginUser($username: String!, $password: String!){
    loginUser(username: $username, password: $password) {
      id
      fullName
      username
      type
      email
      profile_data
    }
  }
`

var options = {
  fields: {
    username: {
      type: 'username'
    },
    password: {
      type: 'password',
      password: true,
      secureTextEntry: true,
    }
  }
}

class TrainerlogInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    }
    this.logIn = this.logIn.bind(this);
    // console.log('login props: ', this.props);
  }

  componentDidMount(){

    AsyncStorage.getItem('@FitApp:UserInfo', (err, val) => {
      if (err) console.log(err);
      else{
        console.log(val)
        if(JSON.parse(val)){
          // if(JSON.parse(val).type === 'trainer'){
            this.props.navigation.dispatch(resetAction)
          // }
        }
      }
  })
  }



  logIn(e){
    e.preventDefault();
    // make axios request to server to get userID
    // axios.get('/users', {u: e.target..., p: e.target....}).then...
    let values = this.refs.form.getValue();
    var payload = JSON.stringify({username: values.username, type: 'trainer'})
    AsyncStorage.setItem('@FitApp:UserInfo', payload)

    this.props.client.query({
      query: q,
      variables: {
        username: values.username.toLowerCase(),
        password: values.password
      }
    }).then(({data}) => {
      if (!data.loginUser) {
        Alert.alert('Invalid username or password!', 'Please try again.');
      } else {
        AsyncStorage.setItem('@FitApp:UserInfo', JSON.stringify(data.loginUser))
        .then(() => this.props.navigation.dispatch(resetAction))
        .catch((err) => console.error('Error writing user info to storage', err))
      }
    }).catch((err) => {
      console.log('log in error: ', err);
      alert('error!');
      this.setState({
        error: true
      });
    })
  }

  render(){
    return (
    <View style={styles.container}>
          <Form
            ref="form"
            type={Person}
            options={options}
          />
          <TouchableHighlight style={styles.button} onPress={this.logIn} underlayColor='red'>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableHighlight>
          <Button title="Don't have an account? sign up" onPress={() => {
              this.props.navigation.navigate('signUp');
            }}/> 
    </View>);
  }
}

export default withApollo(TrainerlogInScreen);
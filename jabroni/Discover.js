import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

class Discover extends React.Component {
  componentDidMount() {
    const { nav } = this.props;

    // nav.onNavigateShouldAllow(() => {
    //    return true;
    // });

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{marginTop: 50}}>
          <Text> Maybe this could be our chat? </Text>
        </View>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
})

export default Discover
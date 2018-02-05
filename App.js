import React from 'react';
import { StyleSheet, Text, View, Navigator } from 'react-native';
import InitalSetup from './Screens/InitialSetup.js'


export default class App extends React.Component {
  render() {
    return (

      <InitalSetup/>
    );
  }
}
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import datefns from 'date-fns';
import { connect } from 'react-redux';

//@connect(state => ({
//  subscriptions: state.subscriptions,
//  unreadCounts: state.unreadCounts
//}))
export default class Settings extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.name
  });

  componentDidMount() {}

  render() {
    return (
      <View>
        <Text>This is the Settings page</Text>
      </View>
    );
  }
}

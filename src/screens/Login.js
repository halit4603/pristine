import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

export default class Login extends Component {
  static navigationOptions = {
    title: 'Misreader'
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: '#FFF',
          minHeight: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Button
          icon={{ name: 'google', type: 'material-community', size: 32 }}
          buttonStyle={{
            backgroundColor: '#CF4332',
            borderRadius: 10,
            margin: 16,
            paddingHorizontal: 32
          }}
          textStyle={{ textAlign: 'center' }}
          title={'Log in with Google'}
          onPress={() => console.log('Pushed button!')}
        />
        <Button
          icon={{ name: 'home', size: 32 }}
          buttonStyle={{
            backgroundColor: '#1FB446',
            borderRadius: 10,
            margin: 16,
            paddingHorizontal: 32
          }}
          textStyle={{ textAlign: 'center' }}
          title={'Log in with Feedly'}
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          icon={{ name: 'info', size: 32 }}
          buttonStyle={{
            backgroundColor: '#3333aa',
            borderRadius: 10,
            margin: 16,
            paddingHorizontal: 32
          }}
          textStyle={{ textAlign: 'center' }}
          title={'Alternate Home Page'}
          onPress={() => this.props.navigation.navigate('AltHome')}
        />
      </View>
    );
  }
}

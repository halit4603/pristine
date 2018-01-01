import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  ViewPagerAndroid,
  Dimensions,
  StyleSheet,
  Linking
} from 'react-native';
import axios from 'axios';
import datefns from 'date-fns';
import { connect } from 'react-redux';
import HTML from 'react-native-render-html';

class Article extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  });

  render() {
    let content;
    if (this.props.article.content && this.props.article.content.content) {
      content = this.props.article.content.content;
    } else if (!this.props.article.content && this.props.article.summary.content) {
      content = this.props.article.summary.content;
    } else {
      content = this.props.article.summary.summary;
    }
    return (
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.article}>
          <View style={styles.article}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold'
              }}
            >
              {this.props.article.title}
            </Text>
          </View>
          <HTML
            html={content}
            baseFontStyle={{ fontSize: 18, lineHeight: 28 }}
            imagesMaxWidth={Dimensions.get('window').width - 16}
            onLinkPress={(evt, href) => {
              Linking.openURL(href);
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFF',
    paddingBottom: 16
  },
  article: {
    padding: 8
  }
});

const mapStateToProps = state => {
  return {
    subscriptions: state.subscriptions,
    stream: state.stream,
    article: state.article,
    loading: state.loading
  };
};

export default connect(mapStateToProps)(Article);

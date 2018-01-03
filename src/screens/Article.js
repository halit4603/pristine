import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  StyleSheet,
  Linking,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import HTML from 'react-native-render-html';

class Article extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  });

  render() {
    if (this.props.loading) {
      return <ActivityIndicator style={{ paddingTop: 16 }} color={'hotpink'} size={64} />;
    }
    return (
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.article}>
          <FlatList horizontal pagingEnabled>
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
              html={
                this.props.article.misreadContent ||
                (this.props.article.content && this.props.article.content.content) ||
                (this.props.article.summary && this.props.article.summary.content)
              }
              baseFontStyle={{ fontSize: 18, lineHeight: 28 }}
              imagesMaxWidth={Dimensions.get('window').width - 16}
              onLinkPress={(evt, href) => {
                Linking.openURL(href);
              }}
            />
          </FlatList>
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
    stream: state.subscriptions[state.activeStream].stream,
    loading: state.loading,
    article: state.subscriptions[state.activeStream].stream[state.article]
  };
};

export default connect(mapStateToProps)(Article);

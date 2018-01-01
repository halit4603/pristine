import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  StyleSheet,
  Share,
  TouchableNativeFeedback
} from 'react-native';
import { Text, Card, Divider, Icon } from 'react-native-elements';
import dfns from 'date-fns';
import { connect } from 'react-redux';
import { fetchMastermix } from '../actions/startUpActions';
import { selectArticle } from '../actions/articleActions';

class Home extends Component {
  static navigationOptions = {
    title: 'Misreader'
  };

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    if (this.props.loading) {
      return <ActivityIndicator style={{ paddingTop: 16 }} color={'hotpink'} size={64} />;
    }
    return (
      <View style={styles.wrapper}>
        <View style={{ backgroundColor: 'whitesmoke' }}>
          <Text
            style={{
              fontWeight: 'bold',
              marginHorizontal: 8,
              fontSize: 18,
              marginTop: 8,
              marginBottom: 16,
              color: '#3c3c3c'
            }}
          >
            Today's Top Articles
          </Text>
        </View>
        <FlatList
          data={this.props.mastermix.items}
          style={{
            backgroundColor: '#FFF',
            minHeight: '100%'
          }}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableNativeFeedback
              onPress={() => {
                this.props.goToArticle(item);
                return this.props.navigation.navigate('Article', {
                  title: item.origin.title
                });
              }}
            >
              <View>
                <Card
                  image={
                    item.visual && item.visual.url !== undefined ? { uri: item.visual.url } : null
                  }
                  //imageWrapperStyle={{ marginTop: 0 }}
                  titleNumberOfLines={2}
                  containerStyle={{
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    marginHorizontal: 8,
                    marginBottom: 8,
                    marginTop: 0,
                    elevation: 2
                  }}
                  id={item.id}
                >
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 18,
                      textAlign: 'left'
                    }}
                  >
                    {item.title}
                  </Text>
                  <Divider style={{ marginTop: 16 }} />
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text
                      style={{
                        flex: 0.6,
                        fontSize: 14,
                        fontStyle: 'italic',
                        textAlign: 'left',
                        marginTop: 4,
                        marginBottom: 16
                      }}
                    >
                      {item.origin.title}
                    </Text>
                    <Text
                      style={{
                        flex: 0.4,
                        fontSize: 14,
                        fontStyle: 'italic',
                        textAlign: 'right',
                        marginTop: 4,
                        marginBottom: 16
                      }}
                    >
                      {dfns.distanceInWordsToNow(item.published, { addSuffix: true })}
                    </Text>
                  </View>

                  <View
                    style={{
                      alignItems: 'flex-end',
                      flexDirection: 'row',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <Icon
                      size={28}
                      containerStyle={{ alignSelf: 'flex-end', marginHorizontal: 8 }}
                      name="share-variant"
                      type="material-community"
                      color="hotpink"
                      onPress={() => {
                        Share.share(
                          {
                            message: 'Share',
                            url: item.alternate[0].href,
                            title: 'Zah?'
                          },
                          {
                            dialogTitle: 'Sharing stuff is fun'
                          }
                        );
                      }}
                    />
                    <Icon
                      size={28}
                      containerStyle={{ alignSelf: 'flex-end', marginHorizontal: 8 }}
                      name="bookmark"
                      type="material-community"
                      color="hotpink"
                      onPress={() => console.log('hello')}
                    />
                  </View>
                </Card>
              </View>
            </TouchableNativeFeedback>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFF',
    paddingBottom: 52
  }
});

const mapStateToProps = state => {
  return {
    loading: state.loading,
    subsHasErrored: state.subsHasErrored,
    subscriptions: state.subscriptions,
    streamHasErrored: state.streamHasErrored,
    stream: state.stream,
    mastermix: state.mastermix
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchMastermix()),
    goToArticle: item => dispatch(selectArticle(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

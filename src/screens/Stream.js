import React, { Component } from 'react';
import {
  ActivityIndicator,
  SectionList,
  View,
  StyleSheet,
  Share,
  TouchableNativeFeedback,
  Dimensions
} from 'react-native';
import dfns from 'date-fns';
import { Text, Card, Icon, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import { misreadArticle, readArticle } from '../actions/articleActions';

class Stream extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  });

  render() {
    if (this.props.loading) {
      return <ActivityIndicator style={{ paddingTop: 16 }} color={'hotpink'} size={64} />;
    }
    const sortedMap = _.orderBy(
      this.props.subscriptions[this.props.activeStream].stream,
      item => {
        return item.published;
      },
      'desc'
    );
    const streamMap = sortedMap.reduce(
      (acc, item) => {
        const foundIndex = acc.findIndex(
          element => element.title === dfns.format(item.published, 'MMM YYYY')
        );
        if (dfns.isToday(item.published)) {
          acc[0].data = [...acc[0].data, item];
          return acc;
        } else if (dfns.isYesterday(item.published)) {
          acc[1].data = [...acc[1].data, item];
          return acc;
        } else if (dfns.isThisWeek(item.published)) {
          acc[2].data = [...acc[2].data, item];
          return acc;
        } else if (dfns.isThisMonth(item.published)) {
          acc[3].data = [...acc[3].data, item];
          return acc;
        } else if (foundIndex === -1) {
          return [
            ...acc,
            {
              title: dfns.format(item.published, 'MMM YYYY'),
              data: [item]
            }
          ];
        }
        acc[foundIndex].data = [...acc[foundIndex].data, item];
        return acc;
      },
      [
        { title: 'Today', data: [] },
        { title: 'Yesterday', data: [] },
        { title: 'This Week', data: [] },
        { title: 'This Month', data: [] }
      ]
    );
    return (
      <View style={styles.wrapper}>
        <SectionList
          initialNumToRender={10}
          stickySectionHeadersEnabled
          style={{
            minHeight: '100%',
            backgroundColor: 'whitesmoke'
          }}
          renderItem={({ item }) => (
            <TouchableNativeFeedback
              onPress={() => {
                console.log(
                  this.props.subscriptions[this.props.activeStream].stream.findIndex(
                    item => item.id === this.props
                  )
                );
                // this.props.subscriptions[this.props.activeStream].partial &&
                // this.props.subscriptions[this.props.activeStream].partial === true
                //   ? this.props.goToMisreadArticle(item)
                //   : this.props.goToArticle(item);
                // return this.props.navigation.navigate('Article', {
                //   title: this.props.subscriptions[this.props.activeStream].title
                // });
              }}
            >
              <View>
                <Card
                  image={
                    item.visual && item.visual.url !== undefined ? { uri: item.visual.url } : null
                  }
                  imageStyle={Dimensions.get('window').width > 375 ? { height: 315 } : 100}
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
                      {item.author}
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
                            message: item.alternate[0].href,
                            url: item.alternate[0].href,
                            title: 'Share...'
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
          renderSectionHeader={({ section }) => (
            <View style={{ backgroundColor: 'whitesmoke' }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 24,
                  marginHorizontal: 8,
                  marginTop: 8,
                  paddingTop: 8,
                  marginBottom: 16,
                  color: '#3c3c3c'
                }}
              >
                {section.title}
              </Text>
            </View>
          )}
          sections={streamMap.filter(item => item.data.length > 0)}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFF',
    paddingBottom: 16
  }
});

const mapStateToProps = state => {
  return {
    subscriptions: state.subscriptions,
    activeStream: state.activeStream,
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    goToMisreadArticle: item => dispatch(misreadArticle(item)),
    goToArticle: item => dispatch(readArticle(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Stream);

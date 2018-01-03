import React, { Component } from 'react';
import { ActivityIndicator, SectionList, View, StyleSheet, Dimensions } from 'react-native';
import { Text, ListItem, Avatar } from 'react-native-elements';
import _ from 'lodash';
import dfns from 'date-fns';
import { connect } from 'react-redux';
import { fetchSubs } from '../actions/subscriptionsActions';
import { fetchStream, activeStream } from '../actions/streamActions';

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
    const sortedMap = _.orderBy(
      this.props.subscriptions,
      item => {
        return item.updated;
      },
      'desc'
    );
    const map = sortedMap.reduce(
      (acc, item) => {
        const foundIndex = acc.findIndex(
          element => element.title === dfns.format(item.updated, 'MMM YYYY')
        );
        if (dfns.isToday(item.updated)) {
          acc[0].data = [...acc[0].data, item];
          return acc;
        } else if (dfns.isYesterday(item.updated)) {
          acc[1].data = [...acc[1].data, item];
          return acc;
        } else if (dfns.isThisWeek(item.updated)) {
          acc[2].data = [...acc[2].data, item];
          return acc;
        } else if (dfns.isThisMonth(item.updated)) {
          acc[3].data = [...acc[3].data, item];
          return acc;
        } else if (foundIndex === -1) {
          return [
            ...acc,
            {
              title: dfns.format(item.updated, 'MMM YYYY'),
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
          stickySectionHeadersEnabled
          style={{
            backgroundColor: '#FFF',
            minHeight: '100%'
          }}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              avatar={item.visualUrl ? item.visualUrl : null}
              // avatarStyle={{ marginHorizontal: 40 }}
              titleContainerStyle={{ width: '70%' }}
              titleNumberOfLines={2}
              containerStyle={{
                backgroundColor: 'white',
                height: 70,
                justifyContent: 'center'
              }}
              hideChevron
              title={item.title}
              id={item.id}
              titleStyle={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 16 }}
              onPress={() => {
                this.props.fetchStreamData(item);
                this.props.setStream(item);
                this.props.navigation.navigate('Stream', { title: item.title });
              }}
            />
          )}
          renderSectionHeader={({ section }) => (
            <View style={{ backgroundColor: 'whitesmoke' }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  marginHorizontal: 8,
                  fontSize: 24,
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
          sections={map.filter(item => item.data.length > 0)}
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
    loading: state.loading,
    subsHasErrored: state.subsHasErrored,
    subscriptions: state.subscriptions,
    streamHasErrored: state.streamHasErrored,
    activeStream: state.activeStream
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchSubs()),
    fetchStreamData: item => dispatch(fetchStream(item)),
    setStream: item => dispatch(activeStream(item.id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

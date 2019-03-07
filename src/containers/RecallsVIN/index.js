import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Text, View, CheckBox } from 'native-base';
import AppHeader from '../../components/AppHeader';
import { variables } from '../../theme';
import LatestRecall from './LatestRecall';
import RecallSearch from './RecallSearch';
import VINDecode from './VINDecode';
import { getVehicleFeed, getTireFeed, getChildFeed } from '../../actions';

class RecallsVIN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: 'latest_recall',
    };
  }

  componentDidMount() {
    this.props.getVehicleFeed();
    this.props.getTireFeed();
    this.props.getChildFeed();
  }

  handleCheck = name => {
    this.setState({ searchType: name });
  };

  render() {
    const { searchType } = this.state;
    const { navigation } = this.props;
    return (
      <Container>
        <AppHeader
          backBtn
          onBackPress={() => navigation.goBack()}
          onHomePress={() => navigation.navigate('Home')}
        />
        <Content normalPadding>
          <View style={styles.option_view}>
            <View style={styles.check_view}>
              <CheckBox
                checked={searchType === 'latest_recall' ? true : false}
                color={variables.primary}
                style={styles.check_text}
                onPress={() => this.handleCheck('latest_recall')}
              />
              <Text>Latest</Text>
            </View>
            <View style={styles.check_view}>
              <CheckBox
                checked={searchType === 'recall_search' ? true : false}
                color={variables.primary}
                style={styles.check_text}
                onPress={() => this.handleCheck('recall_search')}
              />
              <Text>Search</Text>
            </View>
            <View style={styles.check_view}>
              <CheckBox
                checked={searchType === 'vin_decode' ? true : false}
                color={variables.primary}
                style={styles.check_text}
                onPress={() => this.handleCheck('vin_decode')}
              />
              <Text>VIN Decode</Text>
            </View>
          </View>
          {searchType === 'latest_recall' ? (
            <LatestRecall />
          ) : searchType === 'recall_search' ? (
            <RecallSearch />
          ) : (
            <VINDecode />
          )}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  option_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  check_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  check_text: {
    marginRight: 20,
  },
});

export default connect(
  null,
  { getVehicleFeed, getTireFeed, getChildFeed },
)(RecallsVIN);

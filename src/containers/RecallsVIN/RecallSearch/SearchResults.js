import React, { Component } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Text, View, Icon, Tabs, Tab } from 'native-base';
import Expand from 'react-native-simple-expand';
import { variables } from '../../../theme';
import ModalSpinner from '../../../components/ModalSpinner';
import { getSafetyDetails, clearState } from '../../../actions';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: undefined,
      complaintResult: undefined,
    };
  }

  componentWillReceiveProps(nextProps) {
    let { recall_results, complaint_results } = nextProps;
    if (recall_results && recall_results.Results) {
      let update_results = [];
      recall_results.Results.map(item => {
        update_results.push({
          ...item,
          open: false,
        });
      });
      recall_results = {
        ...recall_results,
        Results: update_results,
      };
      this.setState({ searchResult: recall_results });
    }
    if (complaint_results && complaint_results.Results) {
      let update_results = [];
      complaint_results.Results.map(item => {
        update_results.push({
          ...item,
          open: false,
        });
      });
      complaint_results = {
        ...complaint_results,
        Results: update_results,
      };
      this.setState({ complaintResult: complaint_results });
    }
  }

  handleShow = (index, open, name) => {
    let { searchResult, complaintResult } = this.state;
    if (name === 'Recalls') {
      searchResult.Results[index].open = !open;
      this.setState({ searchResult });
    } else {
      complaintResult.Results[index].open = !open;
      this.setState({ complaintResult });
    }
  };

  renderResults = (searchResult, name) => {
    return (
      <View style={{ marginBottom: 22 }}>
        <View style={styles.count_view}>
          <Text>{`${searchResult.Count} ${name} Found`}</Text>
        </View>
        {searchResult.Results.map((item, index) => (
          <View key={index} style={styles.item_view}>
            <Text>{item.Manufacturer}</Text>
            <Expand value={item.open} style={styles.expand_view}>
              <Text bodySmall darkGray style={styles.expand_text}>
                <Text bodySmall>
                  {name === 'Recalls'
                    ? `Summary: `
                    : `Component Manufacturer: `}
                </Text>
                {name === 'Recalls' ? item.Summary : item.Component}
              </Text>
              <Text bodySmall darkGray style={styles.expand_text}>
                <Text bodySmall>
                  {name === 'Recalls' ? `Conequence: ` : `Crash/Fire: `}
                </Text>
                {name === 'Recalls'
                  ? item.Conequence
                  : `${item.Crash} / ${item.Fire}`}
              </Text>
              <Text bodySmall darkGray style={styles.expand_text}>
                <Text bodySmall>
                  {name === 'Recalls' ? `Remedy: ` : `Injuries/Deaths: `}
                </Text>
                {name === 'Recalls'
                  ? item.Remedy
                  : `${item.NumberOfInjured} / ${item.NumberOfDeaths}`}
              </Text>
              <Text bodySmall darkGray>
                <Text bodySmall>
                  {name === 'Recalls' ? `Notes: ` : `Summary: `}
                </Text>
                {name === 'Recalls' ? item.Notes : item.Summary}
              </Text>
            </Expand>
            <TouchableOpacity
              onPress={() => this.handleShow(index, item.open, name)}
              style={{ marginTop: 15 }}
            >
              <Text bodySmall facebookPrimary>
                <Icon name="arrow-forward" smallSize />
                {item.open ? ' Hide' : ' Show'}
                {' Details'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  renderSafetyResults = searchResult => {
    const { safety_details } = this.props;
    return (
      <View style={{ marginBottom: 22 }}>
        <View style={styles.count_view}>
          <Text>{`${searchResult.Count} Safety Ratings Found`}</Text>
        </View>
        {searchResult.Results.map((item, index) => (
          <View key={index} style={styles.item_view}>
            <Text>{item.VehicleDescription}</Text>
            <Expand
              value={
                safety_details &&
                safety_details.Results[0].VehicleId === item.VehicleId
                  ? true
                  : false
              }
              style={styles.expand_view}
            >
              <View style={[styles.expand_text, { height: 140 }]}>
                <Text bodySmall>Photo: </Text>
                {safety_details && safety_details.Results[0].VehiclePicture && (
                  <Image
                    source={{ uri: safety_details.Results[0].VehiclePicture }}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                )}
              </View>
              <View style={[styles.expand_text, { height: 140 }]}>
                <Text bodySmall>Front Impact Photo: </Text>
                {safety_details && safety_details.Results[0].FrontCrashPicture && (
                  <Image
                    source={{
                      uri: safety_details.Results[0].FrontCrashPicture,
                    }}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                )}
              </View>
              <View style={[styles.expand_text, { height: 140 }]}>
                <Text bodySmall>Side Impact Photo: </Text>
                {safety_details && safety_details.Results[0].SideCrashPicture && (
                  <Image
                    source={{
                      uri: safety_details.Results[0].SideCrashPicture,
                    }}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                )}
              </View>
              <Text bodySmall darkGray style={styles.expand_text}>
                <Text bodySmall>Overall Rating: </Text>
                {safety_details
                  ? safety_details.Results[0].OverallSideCrashRating
                  : ''}
              </Text>
              <Text bodySmall darkGray style={styles.expand_text}>
                <Text bodySmall>Overall Front Crash Rating: </Text>
                {safety_details
                  ? safety_details.Results[0].OverallFrontCrashRating
                  : ''}
              </Text>
              <Text bodySmall darkGray style={styles.expand_text}>
                <Text bodySmall>Front Crash Driver-Side Rating: </Text>
                {safety_details
                  ? safety_details.Results[0].FrontCrashDriversideRating
                  : ''}
              </Text>
              <Text bodySmall darkGray style={styles.expand_text}>
                <Text bodySmall>Front Crash Passenger-Side Rating: </Text>
                {safety_details
                  ? safety_details.Results[0].FrontCrashPassengersideRating
                  : ''}
              </Text>
              <Text bodySmall darkGray style={styles.expand_text}>
                <Text bodySmall>Overall Side Crash Rating: </Text>
                {safety_details
                  ? safety_details.Results[0].OverallSideCrashRating
                  : ''}
              </Text>
              <Text bodySmall darkGray style={styles.expand_text}>
                <Text bodySmall>Side Crash Driver-Side Rating: </Text>
                {safety_details
                  ? safety_details.Results[0].SideCrashDriversideRating
                  : ''}
              </Text>
              <Text bodySmall darkGray>
                <Text bodySmall>Side Crash Passenger-Side Rating: </Text>
                {safety_details
                  ? safety_details.Results[0].SideCrashPassengersideRating
                  : ''}
              </Text>
            </Expand>
            <TouchableOpacity
              onPress={() =>
                safety_details
                  ? this.props.clearState()
                  : this.props.getSafetyDetails(item.VehicleId)
              }
              style={{ marginTop: 15 }}
            >
              <Text bodySmall facebookPrimary>
                <Icon name="arrow-forward" smallSize />
                {safety_details &&
                safety_details.Results[0].VehicleId === item.VehicleId
                  ? ' Hide'
                  : ' Show'}
                {' Details'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  noResults = name => {
    return <Text style={{ padding: 20 }}>{`No ${name} Found.`}</Text>;
  };

  render() {
    const { searchResult, complaintResult } = this.state;
    const { loader, safety_results } = this.props;

    return (
      <View>
        <Tabs>
          <Tab heading="Recalls">
            {searchResult && searchResult.Count > 0
              ? this.renderResults(searchResult, 'Recalls')
              : this.noResults('Recalls')}
          </Tab>
          <Tab heading="Safety Ratings">
            {safety_results && safety_results.Count > 0
              ? this.renderSafetyResults(safety_results)
              : this.noResults('Safety Ratings')}
          </Tab>
          <Tab heading="Complaints">
            {complaintResult && complaintResult.Count > 0
              ? this.renderResults(complaintResult, 'Complaints')
              : this.noResults('Complaints')}
          </Tab>
        </Tabs>
        <ModalSpinner modal_open={loader} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  count_view: {
    padding: 10,
    backgroundColor: variables.lightGray,
  },
  item_view: {
    borderBottomWidth: 0.5,
    borderColor: variables.darkGray,
    padding: 15,
  },
  expand_view: {
    paddingTop: 15,
    paddingBottom: 10,
  },
  expand_text: {
    marginBottom: 10,
  },
  logo: {
    width: variables.metrics.screenWidth - 40,
    height: 120,
  },
});

const mapStateToProps = ({ recallfeeds }) => {
  const {
    loader,
    recall_results,
    safety_results,
    safety_details,
    complaint_results,
  } = recallfeeds;
  return {
    loader,
    recall_results,
    safety_results,
    safety_details,
    complaint_results,
  };
};

export default connect(
  mapStateToProps,
  { getSafetyDetails, clearState },
)(SearchResults);

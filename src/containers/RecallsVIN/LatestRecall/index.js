import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Text, View, Tabs, Tab } from 'native-base';
import { variables } from '../../../theme';
import ModalSpinner from '../../../components/ModalSpinner';

var parseString = require('react-native-xml2js').parseString;

class LatestRecall extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderView = result => {
    return (
      <ScrollView style={styles.tab_view}>
        {result.map((item, index) => (
          <View key={index} style={styles.item_view}>
            <Text style={styles.title_text}>{item.title[0]}</Text>
            <Text bodySmall darkGray style={styles.body_text}>
              {item.description[0]}
            </Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  render() {
    const { loader, vehicle_feed, tire_feed, child_feed } = this.props;

    let vehicles = undefined;
    vehicle_feed &&
      parseString(vehicle_feed, (err, result) => {
        vehicles = result;
      });

    let tires = undefined;
    tire_feed &&
      parseString(tire_feed, (err, result) => {
        tires = result;
      });

    let child = undefined;
    child_feed &&
      parseString(child_feed, (err, result) => {
        child = result;
      });

    return (
      <View>
        <Tabs>
          <Tab heading="Vehicles" style={styles.tab}>
            {vehicles &&
              vehicles.rss.channel[0].item.length > 0 &&
              this.renderView(vehicles.rss.channel[0].item)}
          </Tab>
          <Tab heading="Tires" style={styles.tab}>
            {tires &&
              tires.rss.channel[0].item.length > 0 &&
              this.renderView(tires.rss.channel[0].item)}
          </Tab>
          <Tab heading="Child Restraints" style={styles.tab}>
            {child &&
              child.rss.channel[0].item.length > 0 &&
              this.renderView(child.rss.channel[0].item)}
          </Tab>
        </Tabs>
        <ModalSpinner modal_open={loader} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    padding: 5,
  },
  tab_view: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: variables.primary,
    marginTop: 5,
    padding: 10,
    height: variables.metrics.screenHeight - 220,
  },
  item_view: {
    borderBottomWidth: 0.5,
    marginBottom: 10,
    borderColor: variables.darkGray,
  },
  title_text: {
    marginBottom: 15,
  },
  body_text: {
    marginBottom: 30,
  },
});

const mapStateToProps = ({ recallfeeds }) => {
  const { loader, vehicle_feed, error, tire_feed, child_feed } = recallfeeds;
  return {
    loader,
    vehicle_feed,
    error,
    tire_feed,
    child_feed,
  };
};

export default connect(mapStateToProps)(LatestRecall);

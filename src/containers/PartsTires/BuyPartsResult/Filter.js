import React, { Component } from 'react';
import { Modal, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Text, Button, View } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import { variables } from '../../../theme';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      modal_open,
      manufacturer,
      manufacturerList,
      location,
      locationList,
      part_type,
      part_type_list,
      application,
      applicationList,
      price_order,
      price_order_list,
    } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal_open}
        onRequestClose={() => this.props.handleModalClose(false)}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <Dropdown
              label="Manufacturer"
              data={manufacturerList}
              value={manufacturer}
              selectedItemColor={variables.primary}
              textColor={variables.primary}
              onChangeText={this.props.handleDropdownChange('manufacturer')}
            />
            <Dropdown
              label="Location"
              data={locationList}
              value={location}
              selectedItemColor={variables.primary}
              textColor={variables.primary}
              onChangeText={this.props.handleDropdownChange('location')}
            />
            <Dropdown
              label="Part Type"
              data={part_type_list}
              value={part_type}
              selectedItemColor={variables.primary}
              textColor={variables.primary}
              onChangeText={this.props.handleDropdownChange('part_type')}
            />
            <Dropdown
              label="Application"
              data={applicationList}
              value={application}
              selectedItemColor={variables.primary}
              textColor={variables.primary}
              onChangeText={this.props.handleDropdownChange('application')}
            />
            <Dropdown
              label="Price Order"
              data={price_order_list}
              value={price_order}
              selectedItemColor={variables.primary}
              textColor={variables.primary}
              onChangeText={this.props.handleDropdownChange('price_order')}
            />
            <View style={styles.btn_view}>
              <Button
                light
                rounded
                onPress={() => this.props.handleModalClose(false)}
              >
                <Text>Cancel</Text>
              </Button>
              <Button
                primary
                rounded
                style={{ marginLeft: 30 }}
                onPress={this.props.handleChange}
              >
                <Text>OK</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: variables.metrics.screenWidth - 50,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  btn_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default connect(null)(Filter);

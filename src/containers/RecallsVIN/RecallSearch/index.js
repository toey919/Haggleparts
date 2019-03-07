import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Text, Button, View, Toast } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import { variables } from '../../../theme';
import SearchResults from './SearchResults';
import ModalSpinner from '../../../components/ModalSpinner';
import {
  getVehicleYears,
  getVehicleMakes,
  getVehicleModels,
  getRecallSearch,
  getSafetySearch,
  getComplaintSearch,
} from '../../../actions';

class RecallSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select_year: undefined,
      select_make: undefined,
      select_model: undefined,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error !== undefined) {
      Toast.show({
        text: '500 Internal Server Error',
        buttonText: 'OK',
        type: 'danger',
        duration: 6000,
      });
    }
  }

  componentDidMount() {
    this.props.getVehicleYears();
  }

  onChangeText = name => value => {
    this.setState({ [name]: value });
    if (name === 'select_year') {
      this.props.getVehicleMakes(value);
    } else if (name === 'select_make') {
      this.props.getVehicleModels({
        year: this.state.select_year,
        make: value,
      });
    }
  };

  handleChange() {
    const { select_year, select_make, select_model } = this.state;
    let params = {
      year: select_year,
      make: select_make,
      model: select_model,
    };
    this.props.getRecallSearch(params);
    this.props.getSafetySearch(params);
    this.props.getComplaintSearch(params);
  }

  render() {
    const { loader, years, makes, models } = this.props;
    const { select_year, select_make, select_model } = this.state;

    let years_list = [];
    years &&
      Object.values(years)
        .sort((a, b) => {
          return b - a;
        })
        .map(year => {
          years_list.push({ value: year });
        });

    let makes_list = [];
    makes &&
      Object.values(makes).map(make => {
        makes_list.push({ value: make });
      });

    let models_list = [];
    models &&
      Object.values(models).map(model => {
        models_list.push({ value: model });
      });

    return (
      <ScrollView>
        <Text accent>Select Vehicle</Text>
        <View style={styles.select_view}>
          <Dropdown
            label="Select Year"
            data={years_list}
            selectedItemColor={variables.primary}
            textColor={variables.primary}
            onChangeText={this.onChangeText('select_year')}
            value={select_year}
          />
          <Dropdown
            label="Select Make"
            data={makes_list}
            selectedItemColor={variables.primary}
            textColor={variables.primary}
            onChangeText={this.onChangeText('select_make')}
            value={select_make}
          />
          <Dropdown
            label="Select Model"
            data={models_list}
            selectedItemColor={variables.primary}
            textColor={variables.primary}
            onChangeText={this.onChangeText('select_model')}
            value={select_model}
          />
          <Button
            full
            primary
            style={{ marginTop: 20 }}
            onPress={() => this.handleChange()}
          >
            <Text>Find</Text>
          </Button>
        </View>
        <SearchResults />
        <ModalSpinner modal_open={loader} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  select_view: {
    width: '100%',
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 15,
  },
});

const mapStateToProps = ({ vehicle, recallfeeds }) => {
  const { loader, years, makes, models } = vehicle;
  const { error } = recallfeeds;
  return {
    loader,
    years,
    makes,
    models,
    error,
  };
};

export default connect(
  mapStateToProps,
  {
    getVehicleYears,
    getVehicleMakes,
    getVehicleModels,
    getRecallSearch,
    getSafetySearch,
    getComplaintSearch,
  },
)(RecallSearch);

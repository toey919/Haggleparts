import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Text, Button, View, Input, Icon, Item, Toast } from 'native-base';
import _ from 'lodash';
import { Dropdown } from 'react-native-material-dropdown';
import { variables } from '../../../theme';
import ModalSpinner from '../../../components/ModalSpinner';
import {
  getVehicleYears,
  getVehicleMakes,
  getVehicleModels,
  getVehicleCategories,
  getVehiclePartTypes,
  getVehicleEngines,
  getPartSearch,
  getPartTextSearch,
} from '../../../actions';

class BuyParts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select_year: undefined,
      select_make: undefined,
      select_model: undefined,
      select_category: undefined,
      select_part_type: undefined,
      select_engine: undefined,
      btn_type: undefined,
      query: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.search_results && this.state.btn_type === 'part_search') {
      this.setState({ btn_type: undefined });
      nextProps.navigation.navigate('BuyPartsResult');
    } else if (
      nextProps.part_listings &&
      this.state.btn_type === 'part_text_search'
    ) {
      this.setState({ btn_type: undefined });
      nextProps.navigation.navigate('BuyPart');
    } else if (nextProps.error !== undefined) {
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
    const { years, makes, models, categories } = this.props;
    const {
      select_year,
      select_make,
      select_model,
      select_category,
    } = this.state;

    this.setState({ [name]: value });

    if (name === 'select_year') {
      this.props.getVehicleMakes(value);
    } else if (name === 'select_make') {
      this.props.getVehicleModels({
        year: select_year,
        make: value,
      });
    } else if (name === 'select_model') {
      this.props.getVehicleCategories({
        year: select_year,
        make: select_make,
        model: value,
      });
    } else if (name === 'select_category') {
      let make = _.invert(makes)[select_make];
      let model = _.invert(models)[select_model];
      let category = _.invert(categories)[value];
      let params = {
        year: select_year,
        make,
        model,
        category,
      };
      this.props.getVehiclePartTypes(params);
      this.props.getVehicleEngines(params);
    }
  };

  handleTextChange = text => {
    this.setState({ query: text });
  };

  BuyPartsResult() {
    const { makes, models, categories, engines } = this.props;
    const {
      select_year,
      select_make,
      select_model,
      select_category,
      select_engine,
    } = this.state;

    let make = _.invert(makes)[select_make];
    let model = _.invert(models)[select_model];
    let category = _.invert(categories)[select_category];
    let engine = _.invert(engines)[select_engine];

    let params = {
      year: select_year,
      make,
      model,
      category,
      engine,
    };
    this.props.getPartSearch(params);
    this.setState({ btn_type: 'part_search' });
  }

  render() {
    const {
      loader,
      years,
      makes,
      models,
      categories,
      part_types,
      engines,
    } = this.props;
    const {
      select_year,
      select_make,
      select_model,
      select_category,
      select_part_type,
      select_engine,
      query,
    } = this.state;

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
      Object.values(makes)
        .sort((a, b) => {
          return a > b ? 1 : b > a ? -1 : 0;
        })
        .map(make => {
          makes_list.push({ value: make });
        });

    let models_list = [];
    models &&
      Object.values(models)
        .sort((a, b) => {
          return a > b ? 1 : b > a ? -1 : 0;
        })
        .map(model => {
          models_list.push({ value: model });
        });

    let categories_list = [];
    categories &&
      Object.values(categories)
        .sort((a, b) => {
          return a > b ? 1 : b > a ? -1 : 0;
        })
        .map(category => {
          categories_list.push({ value: category });
        });

    let part_types_list = [];
    part_types &&
      part_types.length > 0 &&
      part_types
        .sort((a, b) => {
          return a > b ? 1 : b > a ? -1 : 0;
        })
        .map(part_type => {
          part_types_list.push({ value: part_type.data });
        });

    let engines_list = [];
    engines &&
      Object.values(engines)
        .sort((a, b) => {
          return a > b ? 1 : b > a ? -1 : 0;
        })
        .map(engine => {
          engines_list.push({ value: engine });
        });

    return (
      <View>
        <Text accent>Search</Text>
        <View style={styles.search_view}>
          <Item regular backgroundDark style={styles.input}>
            <Input
              placeholder="Keywords: Part name, Make, Model, Part number etc."
              placeholderTextColor={variables.gray}
              onChangeText={this.handleTextChange.bind(this)}
              value={query}
            />
          </Item>
          <Button
            full
            primary
            onPress={() => {
              this.props.getPartTextSearch(query);
              this.setState({ btn_type: 'part_text_search' });
            }}
          >
            <Icon name="search" />
          </Button>
        </View>
        <Text accent center>
          or
        </Text>
        <Text accent style={{ marginTop: 15 }}>
          Select Vehicle And Part-Type
        </Text>
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
          <Dropdown
            label="Select Product"
            data={categories_list}
            selectedItemColor={variables.primary}
            textColor={variables.primary}
            onChangeText={this.onChangeText('select_category')}
            value={select_category}
          />
          <Dropdown
            label="Select Part Type"
            data={part_types_list}
            selectedItemColor={variables.primary}
            textColor={variables.primary}
            onChangeText={this.onChangeText('select_part_type')}
            value={select_part_type}
          />
          <Dropdown
            label="Select Engine"
            data={engines_list}
            selectedItemColor={variables.primary}
            textColor={variables.primary}
            onChangeText={this.onChangeText('select_engine')}
            value={select_engine}
          />
          <Button
            full
            primary
            style={{ marginTop: 20 }}
            onPress={() => this.BuyPartsResult()}
          >
            <Text>Find</Text>
          </Button>
        </View>
        <ModalSpinner modal_open={loader} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  search_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  input: {
    width: variables.metrics.scaleWidth * 290,
    height: variables.metrics.scaleWidth * 40,
  },
  select_view: {
    width: '100%',
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 40,
  },
});

const mapStateToProps = ({ vehicle }) => {
  const {
    loader,
    years,
    error,
    makes,
    models,
    categories,
    part_types,
    engines,
    search_results,
    part_listings,
  } = vehicle;
  return {
    loader,
    years,
    error,
    makes,
    models,
    categories,
    part_types,
    engines,
    search_results,
    part_listings,
  };
};

export default connect(
  mapStateToProps,
  {
    getVehicleYears,
    getVehicleMakes,
    getVehicleModels,
    getVehicleCategories,
    getVehiclePartTypes,
    getVehicleEngines,
    getPartSearch,
    getPartTextSearch,
  },
)(BuyParts);

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Text, Button, View, Toast } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import { variables } from '../../../theme';
import ModalSpinner from '../../../components/ModalSpinner';
import {
  getTireWidths,
  postTireAspect,
  postTireDiameters,
  postTireSearch,
} from '../../../actions';

class BuyTires extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select_width: undefined,
      select_aspect: undefined,
      select_diameter: undefined,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tire_search) {
      nextProps.navigation.navigate('BuyTyre');
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
    this.props.getTireWidths();
  }

  onChangeText = name => value => {
    this.setState({ [name]: value });
    if (name === 'select_width') {
      var data = new FormData();
      data.append('width', value);
      this.props.postTireAspect(data);
    } else if (name === 'select_aspect') {
      var data = new FormData();
      data.append('width', this.state.select_width);
      data.append('aspect', value);
      this.props.postTireDiameters(data);
    }
  };

  handleChange() {
    const { select_width, select_aspect, select_diameter } = this.state;
    var data = new FormData();
    data.append('width', select_width);
    data.append('aspect', select_aspect);
    data.append('diameter', select_diameter);
    this.props.postTireSearch(data);
  }

  render() {
    const { tire_widths, loader, tire_aspect, tire_diameters } = this.props;
    const { select_width, select_aspect, select_diameter } = this.state;

    let widths_list = [];
    tire_widths &&
      tire_widths.length > 0 &&
      tire_widths.map(width => {
        widths_list.push({ value: width });
      });

    let aspect_list = [];
    tire_aspect &&
      tire_aspect.length > 0 &&
      tire_aspect.map(aspect => {
        aspect_list.push({ value: aspect.aspect });
      });

    let diameter_list = [];
    tire_diameters &&
      tire_diameters.length > 0 &&
      tire_diameters.map(diameter => {
        diameter_list.push({ value: diameter.diameter });
      });

    return (
      <View>
        <Text accent>Select Tire Measurements</Text>
        <View style={styles.select_view}>
          <Dropdown
            label="Select Width"
            data={widths_list}
            selectedItemColor={variables.primary}
            textColor={variables.primary}
            onChangeText={this.onChangeText('select_width')}
            value={select_width}
          />
          <Dropdown
            label="Select Aspect"
            data={aspect_list}
            selectedItemColor={variables.primary}
            textColor={variables.primary}
            onChangeText={this.onChangeText('select_aspect')}
            value={select_aspect}
          />
          <Dropdown
            label="Select Diameter"
            data={diameter_list}
            selectedItemColor={variables.primary}
            textColor={variables.primary}
            onChangeText={this.onChangeText('select_diameter')}
            value={select_diameter}
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
        <ModalSpinner modal_open={loader} />
      </View>
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

const mapStateToProps = ({ tires }) => {
  const {
    loader,
    tire_widths,
    error,
    tire_aspect,
    tire_diameters,
    tire_search,
  } = tires;
  return {
    loader,
    tire_widths,
    error,
    tire_aspect,
    tire_diameters,
    tire_search,
  };
};

export default connect(
  mapStateToProps,
  { getTireWidths, postTireAspect, postTireDiameters, postTireSearch },
)(BuyTires);

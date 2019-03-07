import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {
  List,
  ListItem,
  Text,
  Button,
  View,
  Input,
  Icon,
  Item,
  Separator,
} from 'native-base';
import _ from 'lodash';
import { variables } from '../../../theme';
import ModalSpinner from '../../../components/ModalSpinner';
import { getVinDecode } from '../../../actions';

class VINDecode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vin: '',
    };
  }

  handleTextChange = text => {
    this.setState({ vin: text });
  };

  renderResults = () => {
    const { vin_decode } = this.props;
    let item = [];
    if (vin_decode && vin_decode.Results) {
      item = Object.values(vin_decode.Results[0]);
    }

    if (item.length > 0) {
      return (
        <List style={{ marginBottom: 24 }}>
          <Separator bordered>
            <Text>Results</Text>
          </Separator>
          {item.length > 0 &&
            item.map(
              (val, index) =>
                vin_decode &&
                vin_decode.Results &&
                val !== '' && (
                  <ListItem key={index}>
                    <Text>
                      {`${_.invert(vin_decode.Results[0])[val]}: `}
                      <Text darkGray>{val}</Text>
                    </Text>
                  </ListItem>
                ),
            )}
        </List>
      );
    }

    return null;
  };

  render() {
    const { vin } = this.state;
    const { loader } = this.props;

    return (
      <ScrollView>
        <Text accent>Decode a VIN</Text>
        <View style={styles.search_view}>
          <Item regular backgroundDark style={styles.input}>
            <Input
              placeholder="Enter a VIN"
              placeholderTextColor={variables.gray}
              onChangeText={this.handleTextChange.bind(this)}
              value={vin}
            />
          </Item>
          <Button full primary onPress={() => this.props.getVinDecode(vin)}>
            <Icon name="search" />
          </Button>
        </View>
        {this.renderResults()}
        <ModalSpinner modal_open={loader} />
      </ScrollView>
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
});

const mapStateToProps = ({ recallfeeds }) => {
  const { loader, error, vin_decode } = recallfeeds;
  return {
    loader,
    vin_decode,
    error,
  };
};

export default connect(
  mapStateToProps,
  { getVinDecode },
)(VINDecode);

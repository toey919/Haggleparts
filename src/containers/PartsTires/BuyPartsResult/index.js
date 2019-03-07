import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Container, Content, Text, View, Body } from 'native-base';
import AppHeader from '../../../components/AppHeader';
import { variables } from '../../../theme';
import Filter from './Filter';
import { getPartListings } from '../../../actions';
import ModalSpinner from '../../../components/ModalSpinner';

class BuyPartsResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_open: false,
      searchResults: [],
      manufacturerList: [],
      manufacturer: 'All',
      locationList: [],
      location: 'All',
      part_type_list: [],
      part_type: 'All',
      applicationList: [],
      application: 'All',
      price_order_list: [
        {
          value: 'None',
        },
        {
          value: 'Lowest Price',
        },
        {
          value: 'Highest Price',
        },
      ],
      price_order: 'None',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.part_listings) {
      nextProps.navigation.navigate('BuyPart');
    }
  }

  componentDidMount() {
    const { search_results } = this.props;

    let manufacturerList = [];
    let locationList = [];
    let part_type_list = [];
    let applicationList = [];

    if (search_results && Object.values(search_results).length > 0) {
      Object.values(search_results).map(item => {
        item.supplier && manufacturerList.push({ value: item.supplier });
        item.location && locationList.push({ value: item.location });
        item.part_type && part_type_list.push({ value: item.part_type });
        item.application && applicationList.push({ value: item.application });
      });

      manufacturerList.sort((a, b) => {
        return a.value > b.value ? 1 : b.value > a.value ? -1 : 0;
      });
      for (var i = 0; i < manufacturerList.length - 1; i++) {
        if (manufacturerList[i].value == manufacturerList[i + 1].value) {
          delete manufacturerList[i];
        }
      }
      manufacturerList.unshift({ value: 'All' });

      locationList.sort((a, b) => {
        return a.value > b.value ? 1 : b.value > a.value ? -1 : 0;
      });
      for (var i = 0; i < locationList.length - 1; i++) {
        if (locationList[i].value == locationList[i + 1].value) {
          delete locationList[i];
        }
      }
      locationList.unshift({ value: 'All' });

      part_type_list.sort((a, b) => {
        return a.value > b.value ? 1 : b.value > a.value ? -1 : 0;
      });
      for (var i = 0; i < part_type_list.length - 1; i++) {
        if (part_type_list[i].value == part_type_list[i + 1].value) {
          delete part_type_list[i];
        }
      }
      part_type_list.unshift({ value: 'All' });

      applicationList.sort((a, b) => {
        return a.value > b.value ? 1 : b.value > a.value ? -1 : 0;
      });
      for (var i = 0; i < applicationList.length - 1; i++) {
        if (applicationList[i].value == applicationList[i + 1].value) {
          delete applicationList[i];
        }
      }
      applicationList.unshift({ value: 'All' });

      this.setState({
        manufacturerList,
        locationList,
        part_type_list,
        applicationList,
        searchResults: Object.values(search_results),
      });
    }
  }

  handleModalClose = status => {
    this.setState({ modal_open: status });
  };

  handleDropdownChange = name => event => {
    this.setState({ [name]: event });
  };

  handlePress(manufacturer, part_no) {
    this.props.getPartListings({ manufacturer, part_no });
  }

  handleChange = () => {
    const { search_results } = this.props;
    const {
      manufacturer,
      location,
      part_type,
      application,
      price_order,
    } = this.state;

    let searchResults = [];

    if (search_results && Object.values(search_results).length > 0) {
      searchResults = Object.values(search_results);

      if (manufacturer !== 'All') {
        searchResults = searchResults.filter(
          item => item.supplier === manufacturer,
        );
      }

      if (location !== 'All') {
        searchResults = searchResults.filter(
          item => item.location === location,
        );
      }

      if (part_type !== 'All') {
        searchResults = searchResults.filter(
          item => item.part_type === part_type,
        );
      }

      if (application !== 'All') {
        searchResults = searchResults.filter(
          item => item.application === application,
        );
      }

      if (price_order !== 'None') {
        if (price_order === 'Lowest Price') {
          searchResults = searchResults.sort((a, b) => {
            let va = 0;
            let vb = 0;
            a.lowest_price ? (va = a.lowest_price) : (va = 0);
            b.lowest_price ? (vb = b.lowest_price) : (vb = 0);
            return Number(va) - Number(vb);
          });
        } else {
          searchResults = searchResults.sort((a, b) => {
            let va = 0;
            let vb = 0;
            a.lowest_price ? (va = a.lowest_price) : (va = 0);
            b.lowest_price ? (vb = b.lowest_price) : (vb = 0);
            return Number(vb) - Number(va);
          });
        }
      }
    }

    this.setState({ searchResults, modal_open: false });
  };

  render() {
    const {
      modal_open,
      searchResults,
      manufacturerList,
      manufacturer,
      locationList,
      location,
      part_type_list,
      part_type,
      application,
      applicationList,
      price_order,
      price_order_list,
    } = this.state;
    const { navigation, loader } = this.props;

    return (
      <Container>
        <AppHeader
          backBtn
          filterBtn
          onBackPress={() => navigation.goBack()}
          onFilterPress={() => this.handleModalClose(true)}
          onHomePress={() => navigation.navigate('Home')}
        />
        <Content>
          {searchResults.length > 0 ? (
            searchResults.map(
              (item, index) =>
                item.lowest_price &&
                item.lowest_price !== '' && (
                  <ListItem key={index}>
                    <Body>
                      <TouchableOpacity
                        onPress={() =>
                          this.handlePress(item.supplier, item.part_no)
                        }
                      >
                        <View style={styles.list_view}>
                          {item.supplier && item.supplier !== '' ? (
                            <View style={styles.list_text}>
                              <Text caption>Manufacturer</Text>
                              <Text accent primary>
                                {item.supplier}
                              </Text>
                            </View>
                          ) : (
                            <View style={styles.list_text} />
                          )}
                          {item.location && item.location !== '' && (
                            <View>
                              <Text caption>Location</Text>
                              <Text accent primary>
                                {item.location}
                              </Text>
                            </View>
                          )}
                        </View>
                        <View style={styles.list_view}>
                          {item.part_type && item.part_type !== '' && (
                            <View style={styles.list_text}>
                              <Text caption>Part Type</Text>
                              <Text accent primary>
                                {item.part_type}
                              </Text>
                            </View>
                          )}
                        </View>
                        <View style={styles.list_view}>
                          {item.application && item.application !== '' ? (
                            <View style={styles.list_text}>
                              <Text caption>Application</Text>
                              <Text accent primary>
                                {item.application}
                              </Text>
                            </View>
                          ) : (
                            <View style={styles.list_text} />
                          )}
                          <Text caption>
                            From{'  '}
                            <Text accent facebookPrimary>
                              ${item.lowest_price}
                            </Text>
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </Body>
                  </ListItem>
                ),
            )
          ) : (
            <Text accent center style={styles.no_text}>
              No results match your search.
            </Text>
          )}
        </Content>
        <Filter
          modal_open={modal_open}
          handleModalClose={status => this.handleModalClose(status)}
          manufacturer={manufacturer}
          manufacturerList={manufacturerList}
          location={location}
          locationList={locationList}
          part_type={part_type}
          part_type_list={part_type_list}
          application={application}
          applicationList={applicationList}
          price_order={price_order}
          price_order_list={price_order_list}
          handleDropdownChange={this.handleDropdownChange.bind(this)}
          handleChange={this.handleChange.bind(this)}
        />
        <ModalSpinner modal_open={loader} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  list_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
  },
  list_text: {
    maxWidth: (variables.metrics.screenWidth * 2) / 3,
  },
  no_text: {
    marginTop: 30,
  },
});

const mapStateToProps = ({ vehicle }) => {
  const { loader, error, search_results, part_listings } = vehicle;
  return {
    loader,
    error,
    search_results,
    part_listings,
  };
};

export default connect(
  mapStateToProps,
  { getPartListings },
)(BuyPartsResult);

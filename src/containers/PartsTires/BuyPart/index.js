import React, { Component } from 'react';
import { Image, Linking, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {
  ListItem,
  Container,
  Content,
  Text,
  Button,
  View,
  Body,
} from 'native-base';
import AppHeader from '../../../components/AppHeader';
import { variables } from '../../../theme';

class BuyPart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation, part_listings } = this.props;
    console.log(part_listings);

    return (
      <Container>
        <AppHeader
          backBtn
          onBackPress={() => navigation.goBack()}
          onHomePress={() => navigation.navigate('Home')}
        />
        <Content>
          {part_listings && part_listings.length > 0 ? (
            part_listings.map((item, index) => (
              <ListItem key={index}>
                <Body>
                  <View style={styles.list_view}>
                    <View style={styles.list_text}>
                      <Text caption>Part Type</Text>
                      {item.title !== null && item.title !== '' && (
                        <Text accent primary>
                          {item.title}
                        </Text>
                      )}
                    </View>
                    {item.product_img !== null && item.product_img !== '' && (
                      <Image
                        source={{ uri: item.product_img }}
                        style={styles.logo}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                  <View style={styles.list_view}>
                    <View style={styles.list_text}>
                      <Text caption>SKU</Text>
                      {item.sku !== null && item.sku !== '' && (
                        <Text accent primary>
                          {item.sku}
                        </Text>
                      )}
                    </View>
                    {item.seller_logo !== null && item.seller_logo !== '' && (
                      <Image
                        source={{ uri: item.seller_logo }}
                        style={styles.logo}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                  <View
                    style={[styles.list_view, { justifyContent: 'center' }]}
                  >
                    <Button
                      primary
                      onPress={() => {
                        // navigation.navigate('DefaultWebView', {
                        //   uri: item.product_url,
                        // });
                        Linking.openURL(item.product_url);
                      }}
                    >
                      <Text>
                        Buy{'  '}
                        {item.price}
                      </Text>
                    </Button>
                  </View>
                </Body>
              </ListItem>
            ))
          ) : (
            <Text accent center style={styles.no_text}>
              No results match your search.
            </Text>
          )}
        </Content>
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
  logo: {
    width: variables.metrics.screenWidth / 3 - 30,
    height: '100%',
  },
});

const mapStateToProps = ({ vehicle }) => {
  const { loader, error, part_listings } = vehicle;
  return {
    loader,
    error,
    part_listings,
  };
};

export default connect(mapStateToProps)(BuyPart);

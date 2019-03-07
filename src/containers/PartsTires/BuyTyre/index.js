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

class BuyTyre extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation, tire_search } = this.props;

    return (
      <Container>
        <AppHeader
          backBtn
          onBackPress={() => navigation.goBack()}
          onHomePress={() => navigation.navigate('Home')}
        />
        <Content>
          {tire_search && tire_search.length > 0 ? (
            tire_search.map((item, index) => (
              <ListItem key={index}>
                <Body>
                  <View style={styles.list_view}>
                    <View style={styles.list_text}>
                      {item.merchant && (
                        <View style={{ paddingBottom: 20 }}>
                          <Text caption>Merchant</Text>
                          <Text accent primary>
                            {item.merchant}
                          </Text>
                        </View>
                      )}
                      {item.name && (
                        <View>
                          <Text caption>Name</Text>
                          <Text accent primary>
                            {item.name}
                          </Text>
                        </View>
                      )}
                    </View>
                    {item.image_url && (
                      <Image
                        source={{ uri: item.image_url }}
                        style={styles.logo}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                  <View style={styles.list_view}>
                    {item.type ? (
                      <View style={styles.list_text}>
                        <Text caption>Type</Text>
                        <Text accent primary>
                          {item.type}
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.list_text} />
                    )}
                    <Button
                      primary
                      onPress={() => {
                        // navigation.navigate('DefaultWebView', {
                        //   uri: item.url,
                        // });
                        Linking.openURL(item.url);
                      }}
                    >
                      <Text>
                        Buy{'  $'}
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

const mapStateToProps = ({ tires }) => {
  const { loader, error, tire_search } = tires;
  return {
    loader,
    error,
    tire_search,
  };
};

export default connect(mapStateToProps)(BuyTyre);

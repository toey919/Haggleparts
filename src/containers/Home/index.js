import React, { Component } from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Text, View } from 'native-base';
import AppHeader from '../../components/AppHeader';
import { variables } from '../../theme';
import { Images } from '../../config';

class Home extends Component {
  render() {
    const { navigation } = this.props;
    let button_list = [
      { name: 'Auto Part Search', value: 'buy_part' },
      {
        name: 'Mechanic Finder',
        value: 'mechanic_finder',
        uri: 'https://embed.mycarbay.haggleparts.com/mechanic_finder/',
      },
      {
        name: 'Roadside Assistance',
        value: 'roadside',
        uri: 'https://www.haggleparts.com/roadside-assistance-embedded/',
      },
      { name: 'Vehicle Recalls', value: 'recall' },
      {
        name: 'MyCarBay',
        value: 'mycarbay',
        uri: 'https://embed.mycarbay.haggleparts.com/',
      },
      {
        name: 'For Mechanics',
        value: 'for_mechanics',
        uri: 'https://embed.mycarbay.haggleparts.com/for_mechanics/',
      },
    ];

    return (
      <Container>
        <AppHeader onHomePress={() => navigation.navigate('Home')} />
        <Content>
          <View style={styles.btn_container}>
            {button_list.map((btn, index) => (
              <View key={index} style={styles.btn_view}>
                <TouchableOpacity
                  onPress={() =>
                    btn.uri
                      ? navigation.navigate('DefaultWebView', {
                          uri: btn.uri,
                        })
                      : navigation.navigate(btn.value)
                  }
                >
                  <Image
                    source={Images[btn.value]}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text accent center>
                  {btn.name}
                </Text>
              </View>
            ))}
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  btn_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  btn_view: {
    width: variables.metrics.screenWidth / 2,
    height: variables.metrics.scaleHeight * 230,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  image: {
    width: variables.metrics.screenWidth / 4,
    height: variables.metrics.scaleHeight * 120,
  },
});

export default connect(null)(Home);

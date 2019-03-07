import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Text, View, CheckBox } from 'native-base';
import AppHeader from '../../../components/AppHeader';
import { variables } from '../../../theme';
import BuyParts from './BuyParts';
import BuyTires from './BuyTires';

class PartSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: 'buy_parts',
    };
  }

  handleCheck = name => {
    this.setState({ searchType: name });
  };

  render() {
    const { searchType } = this.state;
    const { navigation } = this.props;
    return (
      <Container>
        <AppHeader
          backBtn
          onBackPress={() => navigation.goBack()}
          onHomePress={() => navigation.navigate('Home')}
        />
        <Content normalPadding>
          <View style={styles.option_view}>
            <View style={styles.check_view}>
              <CheckBox
                checked={searchType === 'buy_parts' ? true : false}
                color={variables.primary}
                style={styles.check_text}
                onPress={() => this.handleCheck('buy_parts')}
              />
              <Text>Buy Parts</Text>
            </View>
            <View style={styles.check_view}>
              <CheckBox
                checked={searchType === 'buy_tires' ? true : false}
                color={variables.primary}
                style={styles.check_text}
                onPress={() => this.handleCheck('buy_tires')}
              />
              <Text>Buy Tires</Text>
            </View>
          </View>
          {searchType === 'buy_parts' ? (
            <BuyParts navigation={navigation} />
          ) : (
            <BuyTires navigation={navigation} />
          )}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  option_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 40,
    paddingLeft: 40,
    marginBottom: 20,
  },
  check_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  check_text: {
    marginRight: 20,
  },
});

export default connect(null)(PartSearch);

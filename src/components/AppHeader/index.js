import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Right, Header, Left, Button, Icon, Body } from 'native-base';
import { Images } from '../../config';
import { variables } from '../../theme';

class AppHeader extends React.Component {
  render() {
    const { backBtn, filterBtn } = this.props;
    return (
      <Header>
        <Left>
          {backBtn && (
            <Button transparent onPress={this.props.onBackPress}>
              <Icon white name="arrow-back" />
            </Button>
          )}
        </Left>
        <Body>
          <TouchableOpacity onPress={this.props.onHomePress}>
            <Image
              source={Images.logo}
              style={styles.header}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Body>
        <Right>
          {filterBtn && (
            <Button transparent onPress={this.props.onFilterPress}>
              <Icon white name="funnel" />
            </Button>
          )}
        </Right>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: variables.metrics.scaleWidth * 170,
    height: '100%',
  },
});

export default AppHeader;

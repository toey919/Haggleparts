import React, { Component } from 'react';
import { PermissionsAndroid, Platform, View, WebView } from 'react-native';
import { Container, Content } from 'native-base';
import AppHeader from '../AppHeader';
import { variables } from '../../theme';

class DefaultWebView extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <Container>
        <AppHeader
          backBtn
          onBackPress={() => navigation.goBack()}
          onHomePress={() => navigation.navigate('Home')}
        />
        <View
          style={{
            flex: 1,
            height: variables.metrics.screenHeight,
            width: variables.metrics.screenWidth,
          }}
        >
          <WebView
            source={{ uri: navigation.state.params.uri }}
            startInLoadingState={true}
            userAgent="Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
            geolocationEnabled={true}
          />
        </View>
      </Container>
    );
  }
}

export default DefaultWebView;

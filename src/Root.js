// @flow

import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { StyleProvider } from 'native-base';
import getHomepassTheme from './theme';
import configureStore from './store';
import App from './App';

export const store = configureStore();

class Root extends Component {
  constructor() {
    super();
    this.theme = getHomepassTheme();
  }

  componentDidMount() {}

  render() {
    return (
      <StyleProvider style={this.theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </StyleProvider>
    );
  }
}

export default Root;

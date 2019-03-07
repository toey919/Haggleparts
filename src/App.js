import React from 'react';
import { Root } from 'native-base';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { variables } from './theme';
import Home from './containers/Home';
//Buy Parts
import PartSearch from './containers/PartsTires/PartSearch';
import BuyPartsResult from './containers/PartsTires/BuyPartsResult';
import BuyPart from './containers/PartsTires/BuyPart';
import BuyTyre from './containers/PartsTires/BuyTyre';
import DefaultWebView from './components/DefaultWebView';
//Recalls & VIN
import RecallsVIN from './containers/RecallsVIN';

const AppNavigator = createStackNavigator(
  {
    Home,
    buy_part: { screen: PartSearch },
    BuyPartsResult,
    BuyPart,
    BuyTyre,
    DefaultWebView,
    recall: { screen: RecallsVIN },
  },
  {
    defaultNavigationOptions: {
      header: null,
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTintColor: variables.brandPrimary,
      headerTitleStyle: {
        color: 'black',
      },
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Root>
        <AppContainer />
      </Root>
    );
  }
}

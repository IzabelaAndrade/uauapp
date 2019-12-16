import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';
import Order from './pages/Order';
import CreateOrder from './pages/CreateOrder';
import Signin from './pages/Signin';

const AppStack = createStackNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: {
        title: 'Pedidos',
      },
    },
    // CreateOrder,
    CreateOrder: {
      screen: CreateOrder,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    Order: {
      screen: Order,
      navigationOptions: {
        title: 'Pedido Detalhado',
      },
    },
    User,
  },
  {
    headerLayoutPreset: 'center',
    headerBackTitleVisible: false,
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f48024',
        // backgroundColor: '#222426'
        // backgroundColor: '#bcbbbb'
      },
      headerTintColor: '#fff',
    },
  }
);
const AuthStack = createStackNavigator({
  Signin: {
    screen: Signin,
    navigationOptions: () => ({
      headerShown: false,
    }),
  },
});

const Routes = (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: AuthStack,
        App: AppStack,
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );

export default Routes;

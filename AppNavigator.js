// AppNavigator.js

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ProfileScreen from './ProfileScreen';
import ProfileDetailScreen from './ProfileDetailScreen';

const AppNavigator = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Profile', // You can customize the screen title here
      },
    },
    ProfileDetail: {
      screen: ProfileDetailScreen,
      navigationOptions: {
        title: 'Profile Detail', // You can customize the screen title here
      },
    },
  },
  {
    initialRouteName: 'Profile', // Specify the initial screen to display
  }
);

export default createAppContainer(AppNavigator);

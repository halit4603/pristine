import { StackNavigator } from 'react-navigation';

import Home from './screens/Home';
import Login from './screens/Login';
import Stream from './screens/Stream';
import Article from './screens/Article';
import AltHome from './screens/AltHome';
import Settings from './screens/Settings';
import Categories from './screens/Categories';

const LoginNavigator = StackNavigator(
  {
    Login: { screen: Login }
  },
  {
    headerMode: 'none'
  }
);

const AppNavigator = new StackNavigator(
  {
    Login: { screen: LoginNavigator },
    Home: { screen: Home },
    AltHome: { screen: AltHome },
    Categories: { screen: Categories },
    Stream: { screen: Stream },
    Article: { screen: Article },
    Settings: { screen: Settings }
  },
  {}
);

export default AppNavigator;

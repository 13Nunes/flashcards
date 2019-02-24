// Basic
import { createStackNavigator, createAppContainer } from "react-navigation";

// Screens
import HomeScreen from '../screens/home';
import AddDeckScreen from '../screens/addDeck';
import ShowCard from '../screens/showCard';
import AddCard from '../screens/addCard';

// Default config
const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: '#000000',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerLayoutPreset: 'center'
}

// Stack config
const MainNavigatorStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    AddDeck: {
      screen: AddDeckScreen,
    },
    ShowCard: {
      screen: ShowCard,
    },
    AddCard: {
      screen: AddCard,
    }
  },
  {
    defaultNavigationOptions,
  }
);

const App = createAppContainer(MainNavigatorStack);
export default App;

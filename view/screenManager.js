import { createStackNavigator } from 'react-navigation'
import HomeScreen from "../utils/main";
import ProfileScreen from "../utils/profile";

// import screens

const MainNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                headerVisible: false ,
                title: 'Welcome!'
            }},
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                title: 'Profile'
            }
        },
    }
)

export default MainNavigator;

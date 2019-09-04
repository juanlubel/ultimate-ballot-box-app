import { createStackNavigator } from 'react-navigation'
import HomeScreen from "../utils/main";
import ProfileScreen from "../utils/profile";
import LobbyScreen from "../utils/lobby";
import ResultScreen from "../utils/results";
import AdminScreen from "../utils/admin";

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
        Lobby: {
            screen: LobbyScreen,
            navigationOptions: {
                title: 'Lobby'
            }
        },
        Results: {
            screen: ResultScreen,
            navigationOptions: {
                title: 'Results'
            }
        },
        Admin: {
            screen: AdminScreen,
            navigationOptions: {
                title: 'Admin'
            }
        },
    }
)

export default MainNavigator;

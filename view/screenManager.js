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
            headerMode: 'none',
            navigationOptions: {
                header: null ,
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
                header: null ,
                title: 'Lobby'
            }
        },
        Results: {
            screen: ResultScreen,
            navigationOptions: {
                header: null ,
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

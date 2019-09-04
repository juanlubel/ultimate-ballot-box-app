import React from 'react';
import {Text, View, TextInput, Button} from "react-native";

export default class AdminScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            password: ''
        }
        console.log(this.state)
    }

    login = () => {
        console.log('fine')
        console.log(this.state)
        if (this.state.name === this.state.password) {
            console.log('fine')
        }
    }

    render() {
        return (
            <View>
                <Text>Welcome to admin page</Text>
                <Text>Please, identify</Text>
                <TextInput
                    style={{height: 40}}
                    placeholder="Insert your name"
                    onChangeText={(name) => this.setState({name: name})}
                    value={this.state.name}
                />
                <TextInput
                    style={{height: 40}}
                    placeholder="Insert your password"
                    onChangeText={(password) => this.setState({password: password})}
                    value={this.state.password}
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                />
                <Button title={'Login'} onPress={this.login}/>
            </View>
        )
    }
}

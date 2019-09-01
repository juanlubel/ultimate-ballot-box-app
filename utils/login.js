import React from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import axios from 'axios';

export class CustomInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: ''};

    }

    _toSend = async () => {
        console.log(this.state.name)
        await axios.post(
            'http://192.168.0.162:3000/api/student',
            {name: this.state.name})
            .then((data) => {
                this.props.navigation.navigate('Profile', {id: data.data.student['_id']})
            })
    }

    render() {
        return (
            <View style={{padding: 10}}>
                <TextInput
                    style={{height: 40, padding: 10}}
                    placeholder="Escribe tu nombre!"
                    onChangeText={(text) => this.setState({name: text})}
                    value={this.state.name}
                />
                <Text style={{padding: 10, fontSize: 42}}>
                    {this.state.name}
                </Text>
                <Button
                    onPress={this._toSend}
                    title="Enviar"
                />
            </View>
        );
    }
}

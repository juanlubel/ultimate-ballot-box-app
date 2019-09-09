import React from 'react';
import {Alert, Text, View, TextInput, Button, Picker, StyleSheet} from 'react-native';
import SocketIoClient from 'socket.io-client';
import axios from 'axios';

export class CustomInput extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            showButton: false,
            participants: 0,
            isFull: false
        }
        this.socket = SocketIoClient('http://juanlubel.hopto.org:3000')
        this.socket.on('roomData', (data) => {
            console.log(data)
            this.setState({'showButton': data.isRoomOpen})
            this.setState({'participants': data.participants})
            this.setState({'isFull': data.isFull})

        })
        this._roomIsOpen()
    }
    _roomIsOpen = async () => {
        await axios.get(
            'http://juanlubel.hopto.org:3000/api/room_is_open'
        ).then((res) => {
            this.setState({showButton: res.data.isRoomOpen})
            this.setState({participants: res.data.participants})
        })
    }

    _toSend = async () => {
        console.log(this.state.name)
        if (this.state.name === '') {
            Alert.alert('nombre vacio')
            // console.log('nombre vacio');
            // } else if (){
        } else {
            await axios.post(
                'http://juanlubel.hopto.org:3000/api/student',
                {name: this.state.name})
                .then((data) => {
                    this.props.navigation.navigate('Profile', {
                        id: data.data.student['_id'],
                        participants: this.state.participants
                    })
                })
        }
    }

    render() {
        return (
            <View style={{padding: 10}}>
                <View style={styles.container}>
                    <TextInput
                        style={styles.item}
                        placeholder="Escribe tu nombre!"
                        onChangeText={(text) => this.setState({name: text})}
                        value={this.state.name}
                    />
                </View>

                <Text style={styles.text}>
                    {this.state.name}
                </Text>
                {
                    (this.state.showButton && !this.state.isFull )? (
                        <Button
                            onPress={this._toSend}
                            title="Entrar en la sala"
                        />
                    ) : null
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    item: {
        width: '60%',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40, padding: 10
    },
    pickerStyle: {
        height: 150,
        width: "40%",
        justifyContent: 'center',
    },
    text: {
        padding: 10,
        fontSize: 35,
        justifyContent: 'center'
    }
});

import React from 'react';
import {Text, View, TextInput, Button} from "react-native";
import axios from 'axios'

export default class AdminScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            password: '',
            options: false,
            list_name: '',
            stateRoom: null,
            participants: 0
        }
        this._loadRoom().then(() => console.log(this.state))
    }

    _login = () => {
        if (this.state.name === this.state.password) {
            this.setState({options: true})
        }
    }

    _loadRoom = async () => {
        await axios.get(
            'http://juanlubel.hopto.org:3000/api/room_is_open'
        ).then((res) => {
            this.setState({stateRoom: res.data.isRoomOpen})
            this.setState({participants: res.data.participants})
        })
    }

    _createList = async () => {
        await axios.post(
            'http://juanlubel.hopto.org:3000/api/open_room',
            {
                participants: this.state.participants
            })
            .then((res) => {
                    console.log(res.data, 'create Await')
                    this.setState({stateRoom: res.data.isRoomOpen})
                    console.log('state Room --->', this.state.stateRoom)
                }
            )
    }

    render() {
        return (
            <View>
                {
                    this.state.options ? (
                            <View>
                                <Text>
                                    {this.state.stateRoom.toString()}
                                </Text>
                                <TextInput
                                    style={{height: 40}}
                                    keyboardType={'numeric'}
                                    placeholder="Amount of integrates of class"
                                    onChangeText={(number) => this.setState({participants: number})}
                                    value={this.state.participants}
                                />
                                <Button title={'Create List'} onPress={this._createList}/>
                            </View>
                        ) :
                        (<View>
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
                            <Button title={'Login'} onPress={this._login}/>
                        </View>)
                }
            </View>
        )
    }
}

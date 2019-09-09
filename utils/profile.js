'use strict'

import React from 'react';
import {Alert, Button, StyleSheet, Text, View} from "react-native";
import axios from "axios";
import CustomMultiPicker from "./multipleSelect";
import SocketIoClient from 'socket.io-client';
import {NavigationEvents} from "react-navigation";

export default class ProfileScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            id: props.navigation.state.params.id,
            totalParticipants: props.navigation.state.params.participants,
            actualParticipants: 0,
            tableHead: ['Nombre', 'Votar'],
            tableData: [],
            voted: [],
            show: false,
            complete: false
        };
/*        let show = false
        this.setState({show: show})*/
        this.socket = SocketIoClient('http://juanlubel.hopto.org:3000')
        this.onLoad()
        this.socket.on('updatedList', () => {
            this.loadList()
        })
    }

    loadList = async () => {
        await axios.get(
            'http://juanlubel.hopto.org:3000/api/students/'
        ).then((response) => {
            let row = []
            let students = response.data.students
            this.setState({actualParticipants: students.length})
            this.setState({'complete':(this.state.actualParticipants == this.state.totalParticipants)})
            // console.log(this.state)
            // console.log(this.state.complete, this.state.actualParticipants, this.state.totalParticipants)
            students.forEach((item) => {
                if (item.name !== '') {
                    row[item['_id']] = item.name
                }
            })
            this.setState({tableData: row})
        })
    }

    deleteUser = () => {
        axios.delete(
            'http://juanlubel.hopto.org:3000/api/student/' + this.state.id)
            .then(data => {
                // console.log(data.data)
            })
    }

    onLoad = async () => {
        await axios.get(
            'http://juanlubel.hopto.org:3000/api/student/' + this.state.id)
            .then((data) => {
                this.setState({name: data.data.student.name})
            })
        this.loadList()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Welcome {this.state.name}</Text>
                <Text style={styles.text}>{this.state.actualParticipants} / {this.state.totalParticipants}</Text>
                {
                    (this.state.show && (this.state.totalParticipants == this.state.actualParticipants)) ? (
                        <Button
                            title="Confirm"
                            onPress={() => this.props.navigation.navigate(
                                'Lobby',
                                {
                                    voted: this.state.voted,
                                    user: this.state.id,
                                    participants: this.state.participants
                                }
                            )}
                        />) : null
                }

                <CustomMultiPicker
                    options={this.state.tableData}
                    search={true}
                    placeholder={"Search"}
                    placeholderTextColor={'#757575'}
                    returnValue={"value"}
                    callback={(res) => {
                        this.state.voted = res
                        let show = false
                        console.log(res);
                        if (res.length === 1 ) {
                            console.log(res[0])
                            if (res[0] !== undefined) {
                                show = true
                            } else {
                                show = false
                            }
                        }
                        this.setState({show:show})
                        console.log('show en picker ', show)

                    }}
                    rowBackgroundColor={"#eee"}
                    iconColor={"#00a2dd"}
                    iconSize={30}
                    selectedIconName={"ios-remove-circle-outline"}
                    unselectedIconName={"ios-add-circle-outline"}
                    scrollViewHeight={3}
                />
                <NavigationEvents onWillBlur={event => {
                    if (event.action.type === 'Navigation/BACK') {
                        this.deleteUser()
                    }
                }
                }/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10%'
    },
    head: {height: 40, backgroundColor: '#808B97'},
    text: {margin: 6, width: '50%'},
    row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
    btn: {width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2},
    btnText: {textAlign: 'center', color: '#fff'}
});

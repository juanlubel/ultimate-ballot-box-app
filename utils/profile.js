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
            tableHead: ['Nombre', 'Votar'],
            tableData: [],
            voted: []
        };
        this.socket = SocketIoClient('http://192.168.0.162:3000')
        this.onLoad()
        this.socket.on('updatedList', () => {
            this.loadList()
            // students = studentsUpdated
        })

    }

    loadList = async () => {
        await axios.get(
            'http://192.168.0.162:3000/api/students/'
        ).then((response) => {
            let row = []
            let students = response.data.students
            console.log(students.length)

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
            'http://192.168.0.162:3000/api/student/' + this.state.id)
            .then(data => {
                console.log(data.data)
            })
    }

    onLoad = async () => {
        await axios.get(
            'http://192.168.0.162:3000/api/student/' + this.state.id)
            .then((data) => {
                this.setState({name: data.data.student.name})
            })
        this.loadList()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Welcome {this.state.name}</Text>
                <Button
                    title="Confirm"
                    onPress={() => this.props.navigation.navigate(
                        'Lobby',
                        {
                        voted: this.state.voted,
                        user: this.state.id
                        }
                    )}
                />
                <CustomMultiPicker
                    options={this.state.tableData}
                    search={true}
                    placeholder={"Search"}
                    placeholderTextColor={'#757575'}
                    returnValue={"value"}
                    callback={(res) => {
                        this.state.voted = res
                        console.log(res)
                    }} // callback, array of selected items
                    rowBackgroundColor={"#eee"}
                    iconColor={"#00a2dd"}
                    iconSize={30}
                    selectedIconName={"ios-remove-circle-outline"}
                    unselectedIconName={"ios-add-circle-outline"}
                    scrollViewHeight={3}
                />
                <NavigationEvents onWillBlur={event => {
                    if (event.action.type === 'Navigation/BACK'){
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
    },
    head: {height: 40, backgroundColor: '#808B97'},
    text: {margin: 6},
    row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
    btn: {width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2},
    btnText: {textAlign: 'center', color: '#fff'}
});

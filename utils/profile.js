'use strict'

import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Alert, ScrollView} from "react-native";
import axios from "axios";
import { Table, TableWrapper, Row, Cell, Rows } from 'react-native-table-component';

export default class ProfileScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            id: props.navigation.state.params.id,
            tableHead: ['Nombre', 'Votar'],
            tableData: []
        };
        this.onLoad()

    }
    onLoad = async () => {
                await axios.get(
                    'http://192.168.0.162:3000/api/student/' + this.state.id)
                    .then((data) => {
                        this.setState({name: data.data.student.name})
                        console.log(this.state.name)
                    })
                await axios.get(
                    'http://192.168.0.162:3000/api/students/'
                ).then((data) => {
                    let row = []
                    data.data.students.forEach((item)=>{
                        if (item.name !== ''){
                            row.push(item.name,[item['_id']])
                        }
                    })
                    console.log(row)
                    this.setState({tableData: row})
                })
    }

    _alertIndex(index) {
        Alert.alert(`You vote to ROW ${index + 1}`);
    }


    render() {
        const state = this.state;
        const element = (data, index) => (
            <TouchableOpacity onPress={() => this._alertIndex(index)}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>Vote</Text>
                </View>
            </TouchableOpacity>
        );
        return (
            <View style={styles.container}>
               <Text>Welcome {this.state.name}</Text>
                    <View>
                        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                            <Row data={state.tableData} style={styles.head} textStyle={styles.text}/>
                            <ScrollView>
                                {
                                    state.tableData.map((rowData, index) => (
                                        <TableWrapper key={index} style={styles.row}>
                                            {
                                                rowData.forEach((cellData, cellIndex) => (
                                                    <Cell key={cellIndex} data={element(cellData, index)} textStyle={styles.text}/>
                                                ))
                                            }
                                        </TableWrapper>
                                    ))
                                }
                            </ScrollView>
                        </Table>
                    </View>
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
    head: { height: 40, backgroundColor: '#808B97' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
});

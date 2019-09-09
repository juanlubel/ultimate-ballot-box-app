import React from 'react'
import {StyleSheet, View, Text, ScrollView} from 'react-native'
import SocketIoClient from "socket.io-client";

export default class ResultScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: props.navigation.state.params.votedStudentsList
        }
    }

    _renderPage() {
        return (
            <View style={styles.container}>
                <View style={styles.row_head}>
                    <Text style={styles.item_head}>Nombre</Text>
                    <Text style={styles.item_head}>Votos</Text>
                </View>
                <ScrollView>
                    {
                        this.state.students.map((student, index) => {
                            return (
                                <View key={index} style={styles.row}>
                                    <Text style={styles.item}>{student.name}</Text>
                                    <Text style={styles.item}>{student.votes}</Text>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        )
    }

    render() {
        return (
            this._renderPage()
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    item: {
        width: '50%',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        backgroundColor: '#78B7BB',
        padding: 7,
        marginTop: 0,
        marginLeft: 2,
        marginRight: 2,
        marginBottom: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        flexWrap: 'wrap',
        textAlign: 'center'
    },
    row_head: {
        backgroundColor: '#1a93bb',
        padding: 7,
        marginTop: 0,
        marginLeft: 2,
        marginRight: 2,
        marginBottom: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        flexWrap: 'wrap',
        textAlign: 'center'
    },
    item_head: {
        fontWeight: 'bold',
        fontSize: 30,
        width: '50%',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

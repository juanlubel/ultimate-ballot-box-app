import React from 'react'
import {StyleSheet, View, Text, ScrollView} from 'react-native'

export default class ResultScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: props.navigation.state.params.votedStudentsList
        }
    }

    _renderPage() {
        return (
            <ScrollView>
            <View style={styles.container}>
                <Text style={styles.item}>Nombre</Text>
                <Text style={styles.item}>Votos</Text>
                {
                    this.state.students.map((student, index)=> {
                       return (
                       <View key={index} style={styles.row}>
                           <Text style={styles.item}>{student.name}</Text>
                           <Text style={styles.item}>{student.votes}</Text>
                       </View>
                       )
                    })
                }
            </View>
            </ScrollView>
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
        width: '40%',
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
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
